"use client";

import { useState, useRef } from "react";
// import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";

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
  const { t } = useLanguage();

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
        text: t.submissionRateLimit,
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);
    setLastSubmissionTime(now);

    try {
      const formData = new FormData(e.currentTarget);
      const houseSizeRaw = (formData.get("houseSize") as string) || "";
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const bookingData = {
        date: new Date().toISOString(),
        name: `${firstName} ${lastName}`.trim(),
        email: formData.get("email") as string,
        address: formData.get("address") as string,
        phone_number: formData.get("phone") as string,
        lived_in: formData.get("lived-in") as string,
        service: formData.get("service") as string,
        house_size: houseSizeRaw ? parseInt(houseSizeRaw, 10).toString() : "0",
        rooms: formData.get("rooms") as string,
        message: (formData.get("message") as string) || "",
        status: "pending",
      };

      // Call the Cloudflare Pages function directly
      const url = "/booking-email";
      const response = await fetch(url, {
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
          text: t.submissionSuccess,
        });

        // Store booking data for confirmation page
        localStorage.setItem("bookingData", JSON.stringify(bookingData));

        // Reset the form
        if (formRef.current) {
          formRef.current.reset();
        }

        setTimeout(() => {
          router.push("/confirmation");
        }, 500);
      } else {
        let errorMessage = t.submissionError;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        setSubmitMessage({
          type: "error",
          text: errorMessage,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage({
        type: "error",
        text: t.submissionError,
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
              {t.scheduleFreeEstimate}
            </h2>
            <p className="text-lg text-gray-600 inter-tight-medium">
              {t.scheduleFreeEstimateSubtitle}
            </p>
          </div>

          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                >
                  {t.firstName} *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.yourFirstName}
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                >
                  {t.lastName} *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.yourLastName}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                >
                  {t.emailAddress} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  placeholder={t.yourEmail}
                />
                <p className="text-xs text-gray-500 mt-1 inter-tight-regular">
                  {t.emailRequired}
                </p>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                >
                  {t.phoneNumber} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.yourPhone}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
              >
                {t.propertyAddress} *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t.yourAddress}
              />
              <p className="text-xs text-gray-500 mt-1 inter-tight-regular">
                {t.addressInfo}
              </p>
            </div>

            <div>
              <label
                htmlFor="lived_in"
                className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
              >
                {t.isLiving} *
              </label>
              <select
                id="lived-in-boolean"
                name="lived-in"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t.selectOption}</option>
                <option value="yes">{t.yes}</option>
                <option value="no">{t.no}</option>
                <option value="no-but-furniture">{t.noButFurniture}</option>
              </select>
              <p className="text-xs text-gray-500 mt-1 inter-tight-regular">
                {t.livingInfo}
              </p>
            </div>

            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
              >
                {t.serviceNeeded} *
              </label>
              <select
                id="service"
                name="service"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t.selectService}</option>
                <option value="estimate">{t.freeQuote}</option>
                <option value="general-installation">
                  {t.generalInstallation}
                </option>
                <option value="vinyl-laminate">{t.vinylLaminate}</option>
                <option value="flooring-repairs">{t.repairsMaintenance}</option>
                <option value="stair-installation">
                  {t.stairInstallation}
                </option>
                <option value="other">{t.other}</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="houseSize"
                  className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                >
                  {t.houseSize} *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="houseSize"
                  name="houseSize"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.houseSizePlaceholder}
                />
                <p className="text-xs text-gray-500 mt-1 inter-tight-regular">
                  {t.houseSizeInfo}
                </p>
              </div>

              <div>
                <label
                  htmlFor="rooms"
                  className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
                >
                  {t.roomCount} *
                </label>
                <select
                  id="rooms"
                  name="rooms"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t.selectRoomCount}</option>
                  <option value="1-2 bedrooms, 1 bathroom">
                    {t.rooms1_2_1}
                  </option>
                  <option value="2-3 bedrooms, 1-2 bathrooms">
                    {t.rooms2_3_1_2}
                  </option>
                  <option value="3-4 bedrooms, 2-3 bathrooms">
                    {t.rooms3_4_2_3}
                  </option>
                  <option value="4-5 bedrooms, 3+ bathrooms">
                    {t.rooms4_5_3}
                  </option>
                  <option value="5+ bedrooms, 3+ bathrooms">
                    {t.rooms5_3}
                  </option>
                  <option value="Studio/1 bedroom">{t.studio_1}</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2 inter-tight-medium"
              >
                {t.projectDetails}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t.projectDetailsPlaceholder}
              ></textarea>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                required
                className="mt-1 h-6 w-6 sm:h-5 sm:w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
              />
              <label
                htmlFor="agreement"
                className="text-sm text-gray-600 inter-tight-regular leading-relaxed"
              >
                {t.agreement?.split("terms of service")[0]}
                <a
                  href="/terms"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  {t.termsOfService}
                </a>
                {
                  t.agreement
                    ?.split("terms of service")[1]
                    ?.split("privacy policy")[0]
                }
                <a
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  {t.privacyPolicy}
                </a>
                .
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
                  {t.submitting}
                </div>
              ) : (
                t.requestEstimate
              )}
            </button>

            {isSubmitting && (
              <p className="text-sm text-gray-500 text-center inter-tight-regular">
                {t.waitMessage}
              </p>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 inter-tight-regular">
              {t.callDirectly}{" "}
              <span className="font-semibold text-blue-600 inter-tight-semibold">
                (626) 540-7720
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-2 inter-tight-regular">
              {t.responseWithin48}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
