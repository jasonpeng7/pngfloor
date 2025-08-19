"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  phone?: string;
  type?: "admin" | "customer";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async (retryCount = 0) => {
    try {
      const apiBase =
        process.env.NEXT_PUBLIC_API_BASE ||
        "https://hono-backend.jasonpeng.workers.dev";
      console.log("🔍 API Base:", apiBase);
      console.log("🔍 Full URL:", `${apiBase}/api/auth/me`);
      console.log("🔍 Retry attempt:", retryCount);

      const response = await fetch(`${apiBase}/api/auth/me`, {
        credentials: "include", // Include cookies
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      console.log("📡 Response status:", response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log("✅ User data:", userData);
        setUser(userData);
      } else {
        console.log("❌ Auth failed:", response.status);
        setUser(null);

        // Retry logic for Safari ITP issues
        if (retryCount < 3 && response.status === 401) {
          console.log(
            `🔄 Auth failed, retrying in ${(retryCount + 1) * 2}s... (${
              retryCount + 1
            }/3)`
          );
          setTimeout(() => checkAuth(retryCount + 1), (retryCount + 1) * 2000);
          return;
        }
      }
    } catch (error) {
      console.error("🚨 Auth check failed:", error);
      setUser(null);

      // Retry on network errors
      if (retryCount < 3) {
        console.log(
          `🔄 Network error, retrying in ${(retryCount + 1) * 2}s... (${
            retryCount + 1
          }/3)`
        );
        setTimeout(() => checkAuth(retryCount + 1), (retryCount + 1) * 2000);
        return;
      }
    } finally {
      if (retryCount === 0) {
        setIsLoading(false);
      }
    }
  };

  const logout = async () => {
    try {
      const apiBase =
        process.env.NEXT_PUBLIC_API_BASE ||
        "https://hono-backend.jasonpeng.workers.dev";
      const response = await fetch(`${apiBase}/api/auth/logout`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
        // force a rerender by updating loading state briefly
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 100);
      } else {
        console.error("❌ Logout failed with status:", response.status);
      }
    } catch (error) {
      console.error("❌ Logout failed:", error);
      // clear the local state even on failure
      setUser(null);
    }
  };

  // check auth status when the page loads or URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hasAuthParams = urlParams.has("code") || urlParams.has("error");

    console.log("🚀 AuthProvider mounted, hasAuthParams:", hasAuthParams);

    if (hasAuthParams) {
      // Longer delay for OAuth callback to ensure cookies are set (especially for Safari)
      console.log("⏳ OAuth callback detected, waiting 3s before auth check");
      setTimeout(() => {
        checkAuth();
      }, 3000);
    } else {
      console.log("🔍 No OAuth params, checking auth immediately");
      checkAuth();
    }
  }, []);

  // periodic auth check to keep state in sync
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("🔄 Periodic auth check");
      checkAuth();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    checkAuth,
    logout,
  };

  console.log(
    "🎯 AuthContext state - user:",
    user ? "logged in" : "not logged in",
    "loading:",
    isLoading
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
