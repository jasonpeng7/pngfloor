"use client";

import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Booking {
  id: string;
  customer_id: string;
  date: string;
  status: string;
  email: string;
  name: string;
  address: string;
  phone_number: string;
  house_size: number;
  rooms: string;
  service: string;
  message: string;
}

interface EditFormData {
  house_size: number;
  rooms: string;
  message: string;
}

export default function DashboardPage() {
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<EditFormData>({
    house_size: 0,
    rooms: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:8080/api/bookings/user/${user.id}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserBookings(data);
      } catch (err) {
        console.error("Error fetching user bookings:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [user?.id]);

  const startEditing = (booking: Booking) => {
    setEditingBookingId(booking.id);
    setEditFormData({
      house_size: booking.house_size,
      rooms: booking.rooms,
      message: booking.message || "",
    });
  };

  const cancelEditing = () => {
    setEditingBookingId(null);
    setEditFormData({
      house_size: 0,
      rooms: "",
      message: "",
    });
  };

  const handleEditSubmit = async (bookingId: string) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/${bookingId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setUserBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? result : booking
        )
      );
      setEditingBookingId(null);
      setEditFormData({
        house_size: 0,
        rooms: "",
        message: "",
      });
    } catch (error) {
      console.error("Error editing booking:", error);
      setError("Failed to update booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/${bookingId}/cancel/${user.id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Update the local state to reflect the cancellation
      setUserBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );

      return result;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw error;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: {
        color: "bg-green-100 text-green-800 border-green-200",
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      completed: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
      },
      cancelled: {
        color: "bg-red-100 text-red-800 border-red-200",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[2000px] min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const firstName = user?.name?.split(" ")[0] || "there";
  const hasConfirmedBookings = userBookings.some(
    (booking) => booking.status === "confirmed"
  );

  return (
    <div className="max-w-[2000px] min-h-screen bg-gray-50 py-8 inter-tight-regular">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Confirmation Banner */}
        {hasConfirmedBookings && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  ✅ Your free estimate is booked!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header with Welcome and Quick Actions */}
        <div className="bg-white  p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Hi {firstName}, here are your upcoming flooring consultations.
              </h1>
              <p className="text-gray-600">
                Manage your appointments and stay updated on your flooring
                projects.
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/bookings"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
              >
                Book Another Estimate
              </Link>
            </div>
          </div>
        </div>

        {userBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Image
              src="/dissapointed.svg"
              alt="No bookings yet"
              width={100}
              height={100}
              className="bg-[#222222] rounded-full p-3 mb-6 mx-auto"
            />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No bookings yet
            </h2>
            <p className="text-gray-600 mb-6">
              Ready to transform your space? Book your free flooring
              consultation today.
            </p>
            <Link
              href="/bookings"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Request Your First Estimate
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Bookings List */}
            <div className="bg-white  p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Your Bookings
              </h2>
              <div className="space-y-4">
                {userBookings.map((booking) => {
                  const { date, time } = formatDateTime(booking.date);
                  const isEditing = editingBookingId === booking.id;

                  return (
                    <div key={booking.id} className="shadow-lg p-6 ">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {booking.service}
                              </h3>
                              <div className="text-2xl font-bold text-blue-600 mb-2">
                                {date}
                              </div>
                              <div className="text-lg text-gray-700 mb-3">
                                {time}
                              </div>
                            </div>
                            <div className="sm:ml-4 mb-4 sm:mb-0">
                              {getStatusBadge(booking.status)}
                            </div>
                          </div>

                          {/* Line divider */}
                          <hr className="border-gray-200 mb-4" />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">
                                Location
                              </p>
                              <p className="text-gray-900">{booking.address}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">
                                House Size
                              </p>
                              {isEditing ? (
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  value={
                                    editFormData.house_size === 0
                                      ? ""
                                      : editFormData.house_size.toString()
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Remove leading zeros but allow single zero
                                    const cleanValue = value.replace(
                                      /^0+(?=\d)/,
                                      ""
                                    );
                                    const numValue =
                                      cleanValue === ""
                                        ? 0
                                        : parseInt(cleanValue) || 0;
                                    setEditFormData((prev) => ({
                                      ...prev,
                                      house_size: numValue,
                                    }));
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  required
                                />
                              ) : (
                                <p className="text-gray-900">
                                  {booking.house_size} sq ft
                                </p>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">
                                Rooms
                              </p>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editFormData.rooms}
                                  onChange={(e) =>
                                    setEditFormData((prev) => ({
                                      ...prev,
                                      rooms: e.target.value,
                                    }))
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="e.g., Living room, Kitchen, 2 bedrooms"
                                  required
                                />
                              ) : (
                                <p className="text-gray-900">{booking.rooms}</p>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">
                                Contact
                              </p>
                              <p className="text-gray-900">
                                {booking.phone_number}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500 mb-1">
                              Additional Notes
                            </p>
                            {isEditing ? (
                              <textarea
                                value={editFormData.message}
                                onChange={(e) =>
                                  setEditFormData((prev) => ({
                                    ...prev,
                                    message: e.target.value,
                                  }))
                                }
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Any additional details or special requirements..."
                              />
                            ) : (
                              booking.message && (
                                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                                  {booking.message}
                                </p>
                              )
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 lg:ml-6 inter-tight-regular">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleEditSubmit(booking.id)}
                                disabled={isSubmitting}
                                className="text-green-600 hover:bg-green-200 border border-green-400 font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isSubmitting ? "Saving..." : "Save Changes"}
                              </button>
                              <button
                                onClick={cancelEditing}
                                disabled={isSubmitting}
                                className="bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Cancel Edit
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => cancelBooking(booking.id)}
                                disabled={
                                  booking.status === "cancelled" ||
                                  booking.status === "completed"
                                }
                                className="bg-red-50 hover:bg-red-100 text-red-700 font-medium border border-red-200 py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => startEditing(booking)}
                                className="bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-medium py-2 px-4 rounded-md transition-colors duration-200"
                              >
                                Edit
                              </button>
                              <a
                                href="mailto:pengfooring@gmail.com"
                                className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium border border-blue-200 py-2 px-4 rounded-md transition-colors duration-200 text-center"
                              >
                                Contact Us
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Steps Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                What happens next:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">01</span>
                  <p className="text-blue-800">
                    We&apos;ll confirm your appointment details via email or
                    phone.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">02</span>
                  <p className="text-blue-800">
                    We&apos;ll review your booking details and provide a free
                    estimate.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">03</span>
                  <p className="text-blue-800">
                    You&apos;ll receive your free, no-obligation estimate on the
                    spot.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className=" bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/about"
                  className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors duration-200 text-center"
                >
                  <div className="text-2xl mb-2">🏠</div>
                  <p className="font-medium text-gray-900">View Services</p>
                  <p className="text-sm text-gray-600">
                    Learn about our flooring options
                  </p>
                </Link>
                <a
                  href="mailto:pengflooring@gmail.com"
                  className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors duration-200 text-center"
                >
                  <div className="text-2xl mb-2">✉️</div>
                  <p className="font-medium text-gray-900">Email Support</p>
                  <p className="text-sm text-gray-600">Get help via email</p>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
