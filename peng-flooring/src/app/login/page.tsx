"use client";

import GoogleSignIn from "../../components/GoogleSignIn";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
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
