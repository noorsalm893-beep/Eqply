import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  userToken: string | null;
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreToken = async () => {
      setTimeout(() => {
        setUserToken(null);
        setIsLoading(false);
      }, 1000);
    };

    restoreToken();
  }, []);

  const signIn = () => {
    setUserToken("demo-token");
  };

  const signOut = () => {
    setUserToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        isLoading,
        isSignedIn: userToken !== null,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}