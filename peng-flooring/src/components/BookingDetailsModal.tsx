"use client";

import { useState } from "react";

interface Booking {
  id: string;
  customer_id: string;
  date: string;
  status: string;
  name: string;
  email: string;
  address: string;
  phone_number: string;
  house_size: number;
  lived_in: string;
  rooms: string;
  service: string;
  message: string;
}

interface BookingDetailsModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (bookingId: string, newStatus: string) => Promise<void>;
}

export default function BookingDetailsModal({
  booking,
  isOpen,
  onClose,
  onStatusUpdate,
}: BookingDetailsModalProps) {
  const [internalNotes, setInternalNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen || !booking) return null;

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      await onStatusUpdate(booking.id, newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getGoogleMapsUrl = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0  bg-white flex items-center justify-center z-50 p-4 inter-tight-regular">
      <div className="bg-white  border border-[#222222] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Booking Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Customer Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{booking.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    <a
                      href={`tel:${booking.phone_number}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {booking.phone_number}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    <a
                      href={`mailto:${booking.email}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {booking.email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Service Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {booking.service}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date & Time
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(booking.date)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    House Size
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {booking.house_size} sq ft
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rooms
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{booking.rooms}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Lived In
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {booking.lived_in}
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Address
              </h3>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-900">{booking.address}</p>
                <a
                  href={getGoogleMapsUrl(booking.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  📍 View on Maps
                </a>
              </div>
            </div>

            {/* Customer Message */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Customer Message
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-900">{booking.message}</p>
              </div>
            </div>

            {/* Internal Notes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Internal Notes
              </h3>
              <textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Add private notes for this job..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <button
                onClick={() => handleStatusUpdate("confirmed")}
                disabled={isUpdating || booking.status === "confirmed"}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
              <button
                onClick={() => handleStatusUpdate("completed")}
                disabled={isUpdating || booking.status === "completed"}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mark Completed
              </button>
              <button
                onClick={() => handleStatusUpdate("canceled")}
                disabled={isUpdating || booking.status === "canceled"}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
