import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "";
const AUTH_ENDPOINTS = {
  login: "/auth/login",
  register: "/auth/register",
  forgotPassword: "/auth/forgot-password",
  verifyCode: "/auth/verify-code",
  resetPassword: "/auth/reset-password",
  logout: "/auth/logout",
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
  data?.token || data?.accessToken || data?.data?.token || data?.data?.accessToken;

const resolveUser = (data) => data?.user || data?.data?.user || null;

const ensureBaseUrl = () => {
  if (!API_BASE_URL) {
    throw new Error("Set API_BASE_URL in AuthContext before calling auth APIs.");
  }
};

const apiRequest = async (endpoint, options = {}) => {
  ensureBaseUrl();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const message = data?.message || data?.error || "Request failed";
    throw new Error(message);
  }

  return data;
};

const saveSession = async (token, user) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
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

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message || "Login failed." };
    }
  };

  const signUp = async ({ name, email, password, phone, avatarIndex }) => {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.register, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          avatarIndex,
        }),
      });

      const token = resolveToken(data);
      if (!token) {
        throw new Error("Token missing in registration response.");
      }

      const userProfile = resolveUser(data);
      await saveSession(token, userProfile);
      setUserToken(token);
      setUser(userProfile);

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message || "Registration failed." };
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      await apiRequest(AUTH_ENDPOINTS.forgotPassword, {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to send reset code." };
    }
  };

  const verifyResetCode = async ({ email, code }) => {
    try {
      await apiRequest(AUTH_ENDPOINTS.verifyCode, {
        method: "POST",
        body: JSON.stringify({ email, code }),
      });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message || "Invalid verification code." };
    }
  };

  const setNewPassword = async ({ email, code, password }) => {
    try {
      await apiRequest(AUTH_ENDPOINTS.resetPassword, {
        method: "POST",
        body: JSON.stringify({ email, code, password }),
      });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message || "Failed to reset password." };
    }
  };

  const signOut = async () => {
    try {
      if (userToken) {
        try {
          await apiRequest(AUTH_ENDPOINTS.logout, {
            method: "POST",
            headers: { Authorization: `Bearer ${userToken}` },
          });
        } catch (error) {
          // Ignore logout network errors and clear local session anyway.
        }
      }
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
