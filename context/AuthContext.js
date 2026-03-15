import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "https://eqply-backend.onrender.com/api";
const AUTH_ENDPOINTS = {
  login: "/auth/login",
  signup: "/auth/signup",
  register: "/auth/signup",
  verifyAccount: "/auth/verify-account",
  forgotPassword: "/auth/forgot-password",
  verifyCode: "/auth/verify-account",
  resetPassword: "/auth/reset-password",
  profile: "/auth/profile",
  updateProfile: "/users/profile",
  uploadPhoto: "/users/profile/photo",
  logout: null,
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
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

      const userProfile = resolveUser(data);
      await saveSession(token, userProfile);
      setUserToken(token);
      setUser(userProfile);

      return { ok: true, token, user: userProfile };
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
          data?.message || "If that email exists, a reset link has been sent.",
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

  const uploadProfilePhoto = async (photoFile) => {
    try {
      if (!userToken) {
        throw new Error("No user token found.");
      }

      if (!photoFile?.uri) {
        throw new Error("Photo file is required.");
      }

      const formData = new FormData();
      formData.append("photo", {
        uri: photoFile.uri,
        type: photoFile.type || "image/jpeg",
        name: photoFile.name || "profile-photo.jpg",
      });

      const data = await apiRequest(AUTH_ENDPOINTS.uploadPhoto, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
        isMultipart: true,
      });

      const updatedUser = {
        ...(user || {}),
        profilePhoto: data?.profilePhoto || user?.profilePhoto || null,
      };

      setUser(updatedUser);
      await saveUserProfile(updatedUser);

      return { ok: true, data, user: updatedUser };
    } catch (error) {
      return {
        ok: false,
        error: error.message || "Failed to upload profile photo.",
      };
    }
  };

  const signOut = async () => {
    try {
      // Backend doc does not require a logout endpoint.
    } finally {
      await clearSession();
      setUserToken(null);
      setUser(null);
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
    uploadProfilePhoto,
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