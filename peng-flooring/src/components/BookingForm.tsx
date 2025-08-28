"use client";

import { useState, useRef } from "react";
// import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  className?: string;
}

export default function BookingForm({ className = "" }: BookingFormProps) {
  const router = useRouter();
  // const { user } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    // Rate limiting: prevent submissions within 5 seconds
    const now = Date.now();
    if (now - lastSubmissionTime < 5000) {
      setSubmitMessage({
        type: "error",
        text: "Please wait a few seconds before submitting another request.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);
    setLastSubmissionTime(now);

    try {
      // Temporary solution: Use mailto link for now
      const formData = new FormData(e.currentTarget);
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const address = formData.get("address") as string;
      const service = formData.get("service") as string;
      const houseSize = formData.get("houseSize") as string;
      const rooms = formData.get("rooms") as string;
      const livedIn = formData.get("lived-in") as string;
      const message = formData.get("message") as string;

      const emailBody = `New Booking Request

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Address: ${address}
Service: ${service}
House Size: ${houseSize}
Rooms: ${rooms}
Currently Lived In: ${livedIn}
Message: ${message}

Submitted: ${new Date().toISOString()}`;

      const mailtoLink = `mailto:bookings@pengfloor.com?subject=New Booking Request - ${firstName} ${lastName}&body=${encodeURIComponent(
        emailBody
      )}`;

      // Open email client
      window.open(mailtoLink);

      setSubmitMessage({
        type: "success",
        text: "Your estimate request has been prepared! Please send the email that opened in your email client.",
      });

      // Reset the form
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage({
        type: "error",
        text: "Failed to prepare estimate request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 inter-tight-bold">
              Schedule Your Free Estimate
            </h2>
            <p className="text-lg text-gray-600 inter-tight-medium">
              Welcome! Fill out the form below and we&apos;ll contact you within
              24 hours to schedule your free flooring estimate.
            </p>
          </div>

          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
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
                Property Address/City *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123 Main St, Anaheim, CA 92801"
              />
              <p className="text-xs text-gray-500 mt-1 inter-tight-regular">
                Don&apos;t worry about providing your exact address right now.
                We&apos;ll ask for the specific address later if you decide to
                proceed with the estimate.
              </p>
            </div>

            <div>
              <label
                htmlFor="lived_in"
                className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
              >
                Is Anyone Currently Living in the Property? *
              </label>
              <select
                id="lived-in-boolean"
                name="lived-in"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="no-but-furniture">
                  No, but there is furniture
                </option>
              </select>
              <p className="text-xs text-gray-500 mt-1 inter-tight-regular">
                Please let us know if the property is occupied. Projects in
                furnished or occupied homes may require additional preparation
                and labor, which can affect the overall cost
              </p>
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

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="houseSize"
                  className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                >
                  House Size (Rough Estimate) *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="houseSize"
                  name="houseSize"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 1500"
                />
                <p className="text-xs text-gray-500 mt-1 inter-tight-regular">
                  Enter approximate square footage
                </p>
              </div>

              <div>
                <label
                  htmlFor="rooms"
                  className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                >
                  Number of Rooms/Bathrooms *
                </label>
                <select
                  id="rooms"
                  name="rooms"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select room count</option>
                  <option value="1-2 bedrooms, 1 bathroom">
                    1-2 bedrooms, 1 bathroom
                  </option>
                  <option value="2-3 bedrooms, 1-2 bathrooms">
                    2-3 bedrooms, 1-2 bathrooms
                  </option>
                  <option value="3-4 bedrooms, 2-3 bathrooms">
                    3-4 bedrooms, 2-3 bathrooms
                  </option>
                  <option value="4-5 bedrooms, 3+ bathrooms">
                    4-5 bedrooms, 3+ bathrooms
                  </option>
                  <option value="5+ bedrooms, 3+ bathrooms">
                    5+ bedrooms, 3+ bathrooms
                  </option>
                  <option value="Studio/1 bedroom">Studio/1 bedroom</option>
                </select>
              </div>
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
                placeholder="Is there anything else you would like to add?"
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

            {isSubmitting && (
              <p className="text-sm text-gray-500 text-center inter-tight-regular">
                Please wait while we process your request...
              </p>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 inter-tight-regular">
              Or call us directly:{" "}
              <span className="font-semibold text-blue-600 inter-tight-semibold">
                (626) 540-7720
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-2 inter-tight-regular">
              We&apos;ll respond within 48 hours to schedule your free flooring
              estimate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
