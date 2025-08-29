"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BookingData {
  name: string;
  email: string;
  address: string;
  phone_number: string;
  lived_in: string;
  service: string;
  house_size: string;
  rooms: string;
  message: string;
  date: string;
  status: string;
}

export default function ConfirmationPage() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get booking data from lcocal storage
    const storedData = localStorage.getItem("bookingData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setBookingData(parsedData);
        // clear the data  after retrieving it
        localStorage.removeItem("bookingData");
      } catch (error) {
        console.error("Error parsing booking data:", error);
      }
    }
    setLoading(false);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getServiceDisplayName = (service: string) => {
    const serviceMap: { [key: string]: string } = {
      estimate: "Free Estimate",
      "general-installation": "General Flooring Installation",
      "vinyl-laminate": "Vinyl & Laminate Flooring Installation",
      "flooring-repairs": "Flooring Repairs & Maintenance",
      "stair-installation": "Stair Remodel/Installation",
      other: "Other",
    };
    return serviceMap[service] || service;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 inter-tight-bold">
            Thank You for Your Request!
          </h1>
          <p className="text-lg text-gray-600 inter-tight-medium">
            Your free flooring estimate request has been submitted successfully.
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 inter-tight-semibold">
            Booking Confirmation
          </h2>

          {bookingData ? (
            <div className="space-y-6">
              {/* Service and Date */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 inter-tight-semibold">
                      {getServiceDisplayName(bookingData.service)}
                    </h3>
                    <p className="text-blue-700 inter-tight-medium">
                      Submitted on {formatDate(bookingData.date)}
                    </p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inter-tight-medium">
                    Pending
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 inter-tight-semibold">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500 inter-tight-medium">
                        Name
                      </p>
                      <p className="text-gray-900 inter-tight-regular">
                        {bookingData.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 inter-tight-medium">
                        Email
                      </p>
                      <p className="text-gray-900 inter-tight-regular">
                        {bookingData.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 inter-tight-medium">
                        Phone
                      </p>
                      <p className="text-gray-900 inter-tight-regular">
                        {bookingData.phone_number}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 inter-tight-semibold">
                    Property Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500 inter-tight-medium">
                        Address
                      </p>
                      <p className="text-gray-900 inter-tight-regular">
                        {bookingData.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 inter-tight-medium">
                        House Size
                      </p>
                      <p className="text-gray-900 inter-tight-regular">
                        {bookingData.house_size} sq ft
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 inter-tight-medium">
                        Rooms
                      </p>
                      <p className="text-gray-900 inter-tight-regular">
                        {bookingData.rooms}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 inter-tight-medium">
                        Currently Occupied
                      </p>
                      <p className="text-gray-900 inter-tight-regular capitalize">
                        {bookingData.lived_in.replace("-", " ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              {bookingData.message && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 inter-tight-semibold">
                    Additional Notes
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 inter-tight-regular">
                      {bookingData.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 inter-tight-regular">
                No booking details found. Please submit a new estimate request.
              </p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 inter-tight-semibold">
            What happens next:
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 inter-tight-semibold">
                1
              </div>
              <div>
                <p className="text-blue-800 font-medium inter-tight-medium">
                  We&apos;ll review your request
                </p>
                <p className="text-blue-700 text-sm inter-tight-regular">
                  Our team will review your project details and contact you
                  within 48 hours.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 inter-tight-semibold">
                2
              </div>
              <div>
                <p className="text-blue-800 font-medium inter-tight-medium">
                  Schedule your consultation
                </p>
                <p className="text-blue-700 text-sm inter-tight-regular">
                  We&apos;ll schedule a convenient time to visit your property
                  and provide a detailed estimate.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 inter-tight-semibold">
                3
              </div>
              <div>
                <p className="text-blue-800 font-medium inter-tight-medium">
                  Receive your free estimate
                </p>
                <p className="text-blue-700 text-sm inter-tight-regular">
                  Get your comprehensive, no-obligation estimate on the spot
                  during the consultation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 inter-tight-semibold">
            Need immediate assistance?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-2">📞</div>
              <p className="font-semibold text-gray-900 inter-tight-semibold">
                Call Us
              </p>
              <p className="text-blue-600 font-semibold inter-tight-semibold">
                (626) 540-7720
              </p>
              <p className="text-sm text-gray-600 inter-tight-regular">
                Available during business hours
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">✉️</div>
              <p className="font-semibold text-gray-900 inter-tight-semibold">
                Email Us
              </p>
              <a
                href="mailto:pengflooring@gmail.com"
                className="text-blue-600 font-semibold hover:text-blue-700 inter-tight-semibold"
              >
                pengflooring@gmail.com
              </a>
              <p className="text-sm text-gray-600 inter-tight-regular">
                We&apos;ll respond within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/bookings"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center inter-tight-semibold"
          >
            Book Another Estimate
          </Link>
          <Link
            href="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center inter-tight-semibold"
          >
            Return to Home
          </Link>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 inter-tight-regular">
            Thank you for choosing Peng Flooring for your flooring needs!
          </p>
        </div>
      </div>
    </div>
  );
}
