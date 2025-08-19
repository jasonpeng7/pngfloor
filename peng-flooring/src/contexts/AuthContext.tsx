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

  const checkAuthSafari = async () => {
    try {
      const apiBase = (process.env.NEXT_PUBLIC_API_BASE || "").replace(
        /\/$/,
        ""
      );
      console.log("🦁 Safari-specific auth check");
      console.log(
        "🦁 Full URL:",
        `${apiBase}/api/auth/me-safari` || "/api/auth/me-safari"
      );

      // For Safari, use localStorage token if available
      const token = localStorage.getItem("auth_token");
      if (!token) {
        console.log("🦁 No Safari token found in localStorage");
        setUser(null);
        return;
      }

      const response = await fetch(
        `${apiBase}/api/auth/me-safari` || "/api/auth/me-safari",
        {
          credentials: "include",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("🦁 Safari response status:", response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log("🦁 Safari user data:", userData);
        setUser(userData);
      } else {
        console.log("🦁 Safari auth failed:", response.status);
        // Clear invalid token
        localStorage.removeItem("auth_token");
        setUser(null);
      }
    } catch (error) {
      console.error("🦁 Safari auth check failed:", error);
      setUser(null);
    }
  };

  const checkAuth = async (retryCount = 0) => {
    try {
      const apiBase = (process.env.NEXT_PUBLIC_API_BASE || "").replace(
        /\/$/,
        ""
      );
      console.log("🔍 API Base:", apiBase || "<same-origin>");
      console.log("🔍 Full URL:", `${apiBase}/api/auth/me` || "/api/auth/me");
      console.log("🔍 Retry attempt:", retryCount);
      console.log("🔍 User Agent:", navigator.userAgent);
      console.log(
        "🔍 Is Safari:",
        /Safari/.test(navigator.userAgent) &&
          !/Chrome/.test(navigator.userAgent)
      );

      const response = await fetch(`${apiBase}/api/auth/me` || "/api/auth/me", {
        credentials: "include", // Include cookies
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          "X-Requested-With": "XMLHttpRequest", // Help with CORS preflight
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

        const isSafari =
          /Safari/.test(navigator.userAgent) &&
          !/Chrome/.test(navigator.userAgent);
        const shouldRetry = retryCount < 3 && response.status === 401;

        if (shouldRetry) {
          const token = localStorage.getItem("auth_token");
          // Try token endpoint if we have a token stored, regardless of browser
          if (token) {
            console.log(
              "🔄 Token present, trying token-based endpoint (/me-safari)"
            );
            setTimeout(() => checkAuthSafari(), 500);
            return;
          }

          const delay = isSafari
            ? (retryCount + 1) * 3000
            : (retryCount + 1) * 2000; // Longer delays for Safari
          console.log(
            `🔄 Auth failed, retrying in ${delay / 1000}s... (${
              retryCount + 1
            }/3) ${isSafari ? "[Safari]" : ""}`
          );
          setTimeout(() => checkAuth(retryCount + 1), delay);
          return;
        }
      }
    } catch (error) {
      console.error("🚨 Auth check failed:", error);
      setUser(null);

      // Retry on network errors
      if (retryCount < 3) {
        console.log(
          `🔄 Network error, retrying in ${(retryCount + 1) * 2}s... (${`
            ${retryCount + 1}
          `}/3)`
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
      const apiBase = (process.env.NEXT_PUBLIC_API_BASE || "").replace(
        /\/$/,
        ""
      );
      const response = await fetch(
        `${apiBase}/api/auth/logout` || "/api/auth/logout",
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setUser(null);
        // Clear Safari token if it exists
        localStorage.removeItem("auth_token");
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
      localStorage.removeItem("auth_token");
    }
  };

  // check auth status when the page loads or URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hasAuthParams = urlParams.has("code") || urlParams.has("error");
    const token = urlParams.get("token");
    const isSafari =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

    console.log("🚀 AuthProvider mounted, hasAuthParams:", hasAuthParams);
    console.log("🚀 Token in URL:", token ? "present" : "not present");

    // If there's a token in the URL (OAuth callback), store it
    if (token) {
      console.log("🔑 Storing token from URL in localStorage");
      localStorage.setItem("auth_token", token);
      // Clean up the URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("token");
      window.history.replaceState({}, "", newUrl.toString());
    }

    if (hasAuthParams) {
      // Longer delay for OAuth callback to ensure cookies are set (especially for Safari)
      const delay = isSafari ? 5000 : 3000; // Longer delay for Safari
      console.log(
        `⏳ OAuth callback detected, waiting ${
          delay / 1000
        }s before auth check ${isSafari ? "[Safari]" : ""}`
      );
      setTimeout(() => {
        // For OAuth callback, always try regular auth first (cookies might work)
        checkAuth();
      }, delay);
    } else {
      console.log("🔍 No OAuth params, checking auth immediately");
      const storedToken = localStorage.getItem("auth_token");
      if (storedToken) {
        console.log("🔑 Token found in storage, attempting token-based auth");
        checkAuthSafari();
      } else {
        console.log("🔍 Using regular auth");
        checkAuth();
      }
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
