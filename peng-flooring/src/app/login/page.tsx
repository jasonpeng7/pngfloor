"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GoogleSignIn from "../../components/GoogleSignIn";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const { isAuthenticated, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // check if returning from OAuth
    const urlParams = new URLSearchParams(window.location.search);
    const hasAuthParams = urlParams.has("code") || urlParams.has("error");

    if (hasAuthParams) {
      setTimeout(async () => {
        await checkAuth();
        // Redirect to bookings if authenticated
        if (isAuthenticated) {
          router.push("/bookings");
        }
      }, 1500);
    }
  }, [checkAuth, isAuthenticated, router]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/bookings");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in or create an account to get started!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome to Peng Flooring
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <GoogleSignIn />

          <div className="text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our terms of service and privacy
              policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
