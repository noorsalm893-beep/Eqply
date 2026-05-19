import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "https://eqply-backend.onrender.com/api";
const AUTH_ENDPOINTS = {
  login: "/auth/login",
  signup: "/auth/signup",
  verifyAccount: "/auth/verify-account",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  resendVerification: "/auth/resend-verification",
  profile: "/auth/profile",
  updateProfile: "/users/profile",
  logout: null,
  preferences: "/users/preferences",

  products: "/products",
  bestDeals: "/products/best-deals",
  productCategories: "/products/categories",
  productSearch: "/products/search",
  myProducts: "/products/my-products",

  recentReviews: "/reviews/recent",
  createReview: "/reviews",
  userReviews: "/reviews/user-reviews",

  toggleFavorite: "/favorites/toggle",
  favorites: "/favorites",

  cart: "/cart",
  cartAdd: "/cart/add",
  cartRemove: "/cart/remove",
  cartClear: "/cart/clear",

  orders: "/orders",
  orderStatus: "/orders/status",
  orderStatusCounts: "/orders/status-counts",
};

const TOKEN_KEY = "eqply_user_token";
const USER_KEY = "eqply_user_profile";

const AuthContext = createContext(undefined);

const parseResponse = async (response) => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
};

const resolveToken = (data) =>
  data?.token ||
  data?.accessToken ||
  data?.data?.token ||
  data?.data?.accessToken ||
  null;

const resolveUser = (data) =>
  data?.user ||
  data?.data?.user ||
  (data?._id ? data : null) ||
  null;

const normalizeRole = (role) => {
  if (!role) return "student";
  if (role === "user") return "student";
  return role;
};

const ensureBaseUrl = () => {
  if (!API_BASE_URL) {
    throw new Error("Set API_BASE_URL in AuthContext before calling auth APIs.");
  }
};

const apiRequest = async (endpoint, options = {}) => {
  ensureBaseUrl();

  const isMultipart = options.isMultipart === true;

  const headers = {
    ...(isMultipart ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      data?.details ||
      "Request failed";
    throw new Error(message);
  }

  return data;
};

const saveSession = async (token, user) => {
  if (token) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }

  if (user) {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } else {
    await SecureStore.deleteItemAsync(USER_KEY);
  }
};

const saveUserProfile = async (user) => {
  if (user) {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } else {
    await SecureStore.deleteItemAsync(USER_KEY);
  }
};

const clearSession = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
};

export function AuthProvider({ children }) {
  const getProducts = async () => {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.products, {
        method: "GET",
      });
  
      const products = Array.isArray(data)
  ? data
  : data?.products || data?.data || [];

return { ok: true, products };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to get products." };
    }
  };
  
  const searchProducts = async (query) => {
    try {
      const data = await apiRequest(
        `${AUTH_ENDPOINTS.productSearch}?query=${encodeURIComponent(query)}`,
        {
          method: "GET",
        }
      );
  
      return { ok: true, products: data?.data || data || [] };
    } catch (error) {
      return { ok: false, error: error.message || "Search failed." };
    }
  };
  
  const getBestDeals = async () => {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.bestDeals, {
        method: "GET",
      });
  
      const products = Array.isArray(data)
  ? data
  : data?.products || data?.data || [];

return { ok: true, products };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to get best deals." };
    }
  };
  
  const getMyProducts = async () => {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.myProducts, {
        method: "GET",
        headers: getAuthHeaders(),
      });
  
      return { ok: true, products: data?.data || data || [] };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to get your products." };
    }
  };
  const getFavorites = async () => {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.favorites, {
        method: "GET",
        headers: getAuthHeaders(),
      });
  
      return { ok: true, favorites: data?.data || data || [] };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to get favorites." };
    }
  };
  const uploadProduct = async (productData) => {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.products, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
      });
  
      return {
        ok: true,
        product: data?.data || data,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message || "Failed to upload product.",
      };
    }
  };
  
  const toggleFavorite = async (productId) => {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.toggleFavorite, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId }),
      });
  
      return { ok: true, message: data?.message || "Favorite updated." };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to update favorite." };
    }
  };
  const getCart = async () => {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.cart, {
        method: "GET",
        headers: getAuthHeaders(),
      });
  
      return { ok: true, cart: data?.data || data };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to get cart." };
    }
  };
  
  const addToCart = async ({ productId, quantity = 1 }) => {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.cartAdd, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, quantity }),
      });
      await refreshCartCount();
  
      return { ok: true, cart: data?.data || data };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to add to cart." };
    }
  };
  
  const removeFromCart = async (productId) => {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.cartRemove, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId }),
      });
      await refreshCartCount();
  
      return { ok: true, cart: data?.data || data };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to remove item." };
    }
  };
  const createOrder = async ({
    paymentMethod,
    address,
  }) => {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.orders, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          paymentMethod,
          address,
        }),
      });
  
      return {
        ok: true,
        order: data?.data || data,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message || "Failed to create order.",
      };
    }
  };
  const updatePreferences = async ({ notifications, language, darkMode }) => {
    try {
      const payload = {};
  
      if (typeof notifications !== "undefined") {
        payload.notifications = notifications;
      }
  
      if (typeof language !== "undefined") {
        payload.language = language;
      }
  
      if (typeof darkMode !== "undefined") {
        payload.darkMode = darkMode;
      }
  
      const data = await apiRequest(AUTH_ENDPOINTS.preferences, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
  
      const updatedUser = data?.data || data;
      setUser(updatedUser);
      await saveUserProfile(updatedUser);
  
      return { ok: true, user: updatedUser };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to update preferences." };
    }
  };

  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState({
    plan: "free",
    isSubscribed: false,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [appMode, setAppMode] = useState(
    user?.role === "vendor" ? "sell" : "buy"
  );
  
  const toggleAppMode = () => {
    if (user?.role === "vendor") return;
  
    setAppMode((prev) =>
      prev === "buy" ? "sell" : "buy"
    );
  };
  useEffect(() => {
    if (user?.role === "vendor") {
      setAppMode("sell");
    }
  }, [user]);

  const getAuthHeaders = () => {
    if (!userToken) {
      throw new Error("No user token found.");
    }
  
    return {
      Authorization: `Bearer ${userToken}`,
    };
  };
  

  useEffect(() => {
    const restoreToken = async () => {
      try {
        const [token, storedUser] = await Promise.all([
          SecureStore.getItemAsync(TOKEN_KEY),
          SecureStore.getItemAsync(USER_KEY),
        ]);

        setUserToken(token || null);
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (error) {
        setUserToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreToken();
  }, []);

  const fetchProfile = async (tokenOverride) => {
    try {
      const token = tokenOverride || userToken;

      if (!token) {
        return { ok: false, error: "No user token found." };
      }

      const data = await apiRequest(AUTH_ENDPOINTS.profile, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userProfile = resolveUser(data) || data;
      setUser(userProfile);
      await saveUserProfile(userProfile);

      return { ok: true, user: userProfile };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to fetch profile." };
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.login, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
  
      const token = resolveToken(data);
      if (!token) {
        throw new Error("Token missing in login response.");
      }
  
      const basicUser = resolveUser(data);
  
      await saveSession(token, basicUser);
      setUserToken(token);
      setUser(basicUser);
  
      await fetchProfile(token);
  
      return { ok: true, token, user: basicUser };
    } catch (error) {
      return { ok: false, error: error.message || "Login failed." };
    }
  };

  const signUp = async ({
    name,
    email,
    password,
    phone,
    avatarIndex,
    role,
    location,
  }) => {
    try {
      const normalizedRole = normalizeRole(role);

      const payload = {
        name,
        email,
        password,
        role: normalizedRole,
      };

      if (phone) {
        payload.phone = phone;
      }

      if (typeof avatarIndex !== "undefined" && avatarIndex !== null) {
        payload.avatarIndex = avatarIndex;
      }

      if (normalizedRole === "vendor" && location) {
        payload.location = location;
      }

      const data = await apiRequest(AUTH_ENDPOINTS.signup, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return {
        ok: true,
        message:
          data?.message ||
          "Account created! Please check your email to verify your account.",
      };
    } catch (error) {
      return { ok: false, error: error.message || "Registration failed." };
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.forgotPassword, {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      return {
        ok: true,
        message:
          data?.message || "If that email exists, a reset code has been sent.",
      };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to send reset code." };
    }
  };

  const verifyResetCode = async ({ email, code, token }) => {
    try {
      const verificationToken = token || code;

      if (!verificationToken) {
        throw new Error("Verification token is required.");
      }

      const data = await apiRequest(
        `${AUTH_ENDPOINTS.verifyAccount}?token=${encodeURIComponent(
          verificationToken
        )}`,
        {
          method: "GET",
        }
      );

      return {
        ok: true,
        message:
          data?.message || "Email verified successfully! You can now log in.",
      };
    } catch (error) {
      return { ok: false, error: error.message || "Invalid verification code." };
    }
  };

  const setNewPassword = async ({
    email,
    code,
    password,
    token,
    newPassword,
  }) => {
    try {
      const resetToken = token || code;
      const finalPassword = newPassword || password;

      if (!resetToken) {
        throw new Error("Reset token is required.");
      }

      if (!finalPassword) {
        throw new Error("New password is required.");
      }

      const data = await apiRequest(AUTH_ENDPOINTS.resetPassword, {
        method: "POST",
        body: JSON.stringify({
          token: resetToken,
          newPassword: finalPassword,
        }),
      });

      return {
        ok: true,
        message:
          data?.message || "Password reset successfully! You can now log in.",
      };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to reset password." };
    }
  };

  const updateUserProfile = async ({ name, phone, location }) => {
    try {
      if (!userToken) {
        throw new Error("No user token found.");
      }

      const payload = {};

      if (typeof name !== "undefined") payload.name = name;
      if (typeof phone !== "undefined") payload.phone = phone;
      if (typeof location !== "undefined") payload.location = location;

      const data = await apiRequest(AUTH_ENDPOINTS.updateProfile, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(payload),
      });

      const updatedUser = resolveUser(data) || data;
      setUser(updatedUser);
      await saveUserProfile(updatedUser);

      return { ok: true, user: updatedUser };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to update profile." };
    }
  };

  

  const signOut = async () => {
    try {
    } finally {
      await clearSession();
      setUserToken(null);
      setUser(null);
    }
  };
  const refreshCartCount = async () => {
    try {
      const response = await getCart();
  
      if (response.ok) {
        const items = response.cart?.items || [];
        const totalItems = items.reduce(
          (total, item) => total + (item.quantity || 1),
          0
        );
  
        setCartCount(totalItems);
      }
    } catch (error) {
      setCartCount(0);
    }
  };

  const value = {
    userToken,
    user,
    isLoading,
    isSignedIn: userToken !== null,
    signIn,
    signUp,
    signOut,
    requestPasswordReset,
    verifyResetCode,
    setNewPassword,
    fetchProfile,
    updateUserProfile,
    getProducts,
    searchProducts,
    getBestDeals,
    getMyProducts,

    getFavorites,
    toggleFavorite,

    getCart,
    addToCart,
    removeFromCart,

    updatePreferences,
    appMode,
    toggleAppMode,
    createOrder,
    uploadProduct,
    subscription,
    setSubscription,
    cartCount,
    refreshCartCount,
    darkMode,
    setDarkMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}