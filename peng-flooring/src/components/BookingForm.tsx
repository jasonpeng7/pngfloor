"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface BookingFormProps {
  className?: string;
}

export default function BookingForm({ className = "" }: BookingFormProps) {
  const { user } = useAuth();
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

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
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
                  defaultValue={user?.name?.split(" ").slice(1).join(" ") || ""}
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
                <option value="estimate">Free Estimate</option>
                <option value="general-installation">
                  General Flooring Installation
                </option>
                <option value="vinyl-laminate">
                  Vinyl & Laminate Flooring Installation
                </option>
                <option value="flooring-repairs">
                  Flooring Repairs & Maintenance
                </option>
                <option value="stair-installation">
                  Stair Remodel/Installation
                </option>
                <option value="other">Other</option>
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
                (626) 540-7720
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-2 inter-tight-regular">
              We&apos;ll respond within 24 hours to schedule your free flooring
              estimate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
