"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckIcon, ClockIcon, StarIcon } from "../../components/icons";
import GoogleSignIn from "../../components/GoogleSignIn";
import { useAuth } from "../../contexts/AuthContext";

export default function BookingsPage() {
  const { isAuthenticated, user, checkAuth, isLoading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const formData = new FormData(e.currentTarget);
    const bookingData = {
      customer_id: user?.id,
      date: new Date().toISOString(),
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      phone_number: formData.get("phone") as string,
      status: "pending",
    };

    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          text: "Your estimate request has been submitted successfully! We'll contact you within 24 hours.",
        });
        e.currentTarget.reset();
      } else {
        const errorData = await response.json();
        setSubmitMessage({
          type: "error",
          text:
            errorData.error ||
            "Failed to submit estimate request. Please try again.",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Check if we're returning from OAuth
    const urlParams = new URLSearchParams(window.location.search);
    const hasAuthParams = urlParams.has("code") || urlParams.has("error");

    if (hasAuthParams) {
      // Wait a bit for backend to process OAuth callback
      setTimeout(async () => {
        await checkAuth();
      }, 1500);
    }
  }, [checkAuth]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login required message
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 inter-tight-bold">
              Sign In Required
            </h1>
            <p className="text-xl text-blue-100 mb-8 inter-tight-medium">
              Please sign in to schedule your free flooring estimate
            </p>
          </div>
        </section>

        {/* Login Section */}
        <section className="py-16 bg-white">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 inter-tight-bold">
                  Sign In to Continue
                </h2>
                <p className="text-gray-600 inter-tight-regular">
                  You need to be signed in to schedule your free flooring
                  estimate. This helps us provide you with the best service and
                  track your requests.
                </p>
              </div>

              <div className="space-y-6">
                <GoogleSignIn>
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google to Continue
                  </div>
                </GoogleSignIn>

                <div className="text-center">
                  <p className="text-sm text-gray-500 inter-tight-regular">
                    By signing in, you agree to our terms of service and privacy
                    policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Sign In Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 inter-tight-bold">
                Why Sign In to Book an Estimate?
              </h2>
              <p className="text-lg text-gray-600 inter-tight-medium">
                We require authentication to provide you with the best service
                experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
                  Track Your Requests
                </h3>
                <p className="text-gray-600 inter-tight-regular">
                  Keep track of your estimate requests and project status
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
                  Secure & Private
                </h3>
                <p className="text-gray-600 inter-tight-regular">
                  Your information is kept secure and private
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
                  Faster Service
                </h3>
                <p className="text-gray-600 inter-tight-regular">
                  Get faster responses and better communication
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // If authenticated, show the booking form
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 inter-tight-bold">
            Get Your Free Flooring Estimate
          </h1>
          <p className="text-xl text-blue-100 mb-8 inter-tight-medium">
            Welcome back, {user?.name}! Ready to schedule your free flooring
            estimate.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5" fill="currentColor" />
                ))}
              </div>
              <span className="text-white font-medium inter-tight-medium">
                4.9/5 (500+ reviews)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-5 h-5 text-blue-200" />
              <span className="text-white font-medium inter-tight-medium">
                15+ Years Experience
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white inter-tight-regular">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 inter-tight-bold">
              Serving SGV, OC, and LA County Areas
            </h2>
            <p className="text-lg text-gray-600 inter-tight-medium">
              Our family-owned flooring company provides free estimates in these
              areas:
            </p>
          </div>

          {/* Service Areas - 3 colored blocks in a row, responsive */}
          <div className="flex flex-col justify-center items-center gap-x-[10px] md:flex-row md:justify-between md:gap-8 mb-8 md:mb-12">
            {/* Orange County Block */}
            <div className="bg-[#03356c] p-6 mb-6 md:mb-0 w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[200px] md:h-[280px] lg:w-[300px] lg:h-[300px] md:aspect-auto lg:aspect-square">
              <h3 className="text-lg md:text-base lg:text-xl font-bold text-white mb-4 inter-tight-bold">
                Orange County
              </h3>
              <ul className="space-y-1 md:space-y-0.5 lg:space-y-2 text-blue-100 inter-tight-regular text-sm md:text-xs lg:text-sm">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Anaheim
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Fullerton
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Costa Mesa
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Huntington Beach
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Irvine
                </li>
                <li className="flex items-center text-yellow-200 font-semibold">
                  <span className="w-1.5 h-1.5 bg-yellow-200 rounded-full mr-2 flex-shrink-0"></span>
                  And many more!
                </li>
              </ul>
            </div>

            {/* San Gabriel Valley Block */}
            <div className="bg-[#d15911] p-6 mb-6 md:mb-0 w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[200px] md:h-[280px] lg:w-[300px] lg:h-[300px] md:aspect-auto lg:aspect-square">
              <h3 className="text-lg md:text-base lg:text-xl font-bold text-white mb-4 inter-tight-bold">
                San Gabriel Valley
              </h3>
              <ul className="space-y-1 md:space-y-0.5 lg:space-y-2 text-white inter-tight-regular text-sm md:text-xs lg:text-sm">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Alhambra
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Arcadia
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  El Monte
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Chino/Chino Hills
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Monterey Park
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Diamond Bar
                </li>
                <li className="flex items-center text-yellow-300 font-semibold">
                  <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full mr-2 flex-shrink-0"></span>
                  And many more!
                </li>
              </ul>
            </div>

            {/* LA County Block */}
            <div className="bg-[#dbdbdb] p-6 mb-6 md:mb-0 w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[200px] md:h-[280px] lg:w-[300px] lg:h-[300px] md:aspect-auto lg:aspect-square">
              <h3 className="text-lg md:text-base lg:text-xl font-bold text-white mb-4 inter-tight-bold">
                LA County
              </h3>
              <ul className="space-y-1 md:space-y-0.5 lg:space-y-2 text-white inter-tight-regular text-sm md:text-xs lg:text-sm">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Los Angeles
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Long Beach
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Glendale
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Pasadena
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0"></span>
                  Burbank
                </li>
                <li className="flex items-center text-yellow-200 font-semibold">
                  <span className="w-1.5 h-1.5 bg-yellow-200 rounded-full mr-2 flex-shrink-0"></span>
                  And many more!
                </li>
              </ul>
            </div>
          </div>

          {/* Our Services Block with invisible offset */}
          <div className="flex flex-col md:flex-row">
            {/* Invisible section on left - only visible on medium screens and up */}
            <div className="hidden md:block md:w-1/4"></div>

            {/* Our Services Block */}
            <div className="bg-[#ffeeea] p-8 w-full md:w-3/4 h-[300px] md:h-[250px]">
              <h3 className="text-2xl font-bold text-black mb-6 inter-tight-bold">
                Our Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black inter-tight-medium">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Luxury vinyl flooring installation
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Stair renovation & installation
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Baseboard repairs & installation
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Custom flooring solutions
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Flooring repairs & maintenance
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 inter-tight-bold">
                Schedule Your Free Estimate
              </h2>
              <p className="text-lg text-gray-600 inter-tight-medium">
                Welcome {user?.name}! Fill out the form below and we&apos;ll
                contact you within 24 hours to schedule your free flooring
                estimate.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    defaultValue={user?.name?.split(" ")[0] || ""}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your first name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    defaultValue={
                      user?.name?.split(" ").slice(1).join(" ") || ""
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    defaultValue={user?.email || ""}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    placeholder="your.email@example.com"
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1 inter-tight-regular">
                    Email from your Google account
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    defaultValue={user?.phone || ""}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                >
                  Property Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main St, Anaheim, CA 92801"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                >
                  Service Needed *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="hardwood-installation">
                    Hardwood Floor Installation
                  </option>
                  <option value="hardwood-refinishing">
                    Hardwood Floor Refinishing
                  </option>
                  <option value="vinyl-laminate">
                    Vinyl & Laminate Flooring
                  </option>
                  <option value="custom-flooring">
                    Custom Flooring Solutions
                  </option>
                  <option value="flooring-repairs">
                    Flooring Repairs & Maintenance
                  </option>
                  <option value="consultation">General Consultation</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                >
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your project, room sizes, timeline, or any specific requirements..."
                ></textarea>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreement"
                  name="agreement"
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="agreement"
                  className="text-sm text-gray-600 inter-tight-regular"
                >
                  I agree to receive communications from Peng Flooring regarding
                  my free estimate request. I understand this is a family-owned
                  flooring company serving Orange County and LA County.
                </label>
              </div>

              {submitMessage && (
                <div
                  className={`p-4 rounded-lg ${
                    submitMessage.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  "Request Free Estimate"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 inter-tight-regular">
                Or call us directly:{" "}
                <span className="font-semibold text-blue-600 inter-tight-semibold">
                  (555) 123-4567
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-2 inter-tight-regular">
                We&apos;ll respond within 24 hours to schedule your free
                flooring estimate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 inter-tight-bold">
              Why Choose Our Family-Owned Flooring Company?
            </h2>
            <p className="text-lg text-gray-600 inter-tight-medium">
              Professional flooring services in Orange County and LA County with
              honest pricing and quality workmanship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
                Free Estimates
              </h3>
              <p className="text-gray-600 inter-tight-regular">
                No obligation, honest pricing for all flooring services
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <StarIcon
                  className="w-8 h-8 text-blue-600"
                  fill="currentColor"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
                4.9/5 Rating
              </h3>
              <p className="text-gray-600 inter-tight-regular">
                500+ satisfied customers in Orange County and LA County
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
                15+ Years Experience
              </h3>
              <p className="text-gray-600 inter-tight-regular">
                Family-owned business since 2009 serving the community
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
                Licensed & Insured
              </h3>
              <p className="text-gray-600 inter-tight-regular">
                Professional flooring contractor you can trust
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 inter-tight-bold">
            Ready to Transform Your Floors?
          </h2>
          <p className="text-xl text-blue-100 mb-8 inter-tight-medium">
            Get your free estimate today from our family-owned flooring company.
            Professional hardwood installation, refinishing, and flooring
            services in Orange County and LA County.
          </p>
          <Link
            href="/"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
