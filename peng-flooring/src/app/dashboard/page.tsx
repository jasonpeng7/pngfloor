"use client";

import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import Image from "next/image";

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

export default function DashboardPage() {
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 inter-tight-regular">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Your Dashboard
          </h1>

          {userBookings.length === 0 ? (
            <div className="flex flex-col items-center text-center py-8">
              <Image
                src="/dissapointed.svg"
                alt="dissapointed"
                width={100}
                height={100}
                className="bg-[#222222] rounded-full p-3 mb-8"
              />
              <p className="text-gray-600 mb-4">
                You haven&apos;t made any booking requests yet.
              </p>
              <a
                href="/bookings"
                className="bg-blue-600 hover:bg-blue-700 text-white inter-tight-medium py-2 px-4 rounded"
              >
                Request Your First Estimate
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Booking Requests
              </h2>
              {userBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {booking.service}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Date:</strong>{" "}
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Address:</strong> {booking.address}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>House Size:</strong> {booking.house_size} sq ft
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Rooms:</strong> {booking.rooms}
                  </p>
                  {booking.message && (
                    <p className="text-gray-600 text-sm">
                      <strong>Message:</strong> {booking.message}
                    </p>
                  )}
                  <button onClick={() => cancelBooking(booking.id)}>
                    Cancel Booking
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
