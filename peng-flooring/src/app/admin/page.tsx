"use client";

import { useState, useEffect } from "react";
import AdminStats from "../../components/AdminStats";
import BookingTable from "../../components/BookingTable";
import BookingDetailsModal from "../../components/BookingDetailsModal";

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

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "bookings" | "customers" | "reports"
  >("bookings");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBase = (process.env.NEXT_PUBLIC_API_BASE || "").replace(
          /\/$/,
          ""
        );

        // Fetch bookings
        const bookingsUrl = apiBase
          ? `${apiBase}/api/bookings`
          : `/api/bookings`;
        const bookingsResponse = await fetch(bookingsUrl, {
          credentials: "include",
        });

        if (!bookingsResponse.ok) {
          if (bookingsResponse.status === 401) {
            window.location.href = "/login";
            return;
          }
          throw new Error("Failed to fetch bookings");
        }

        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData);

        // Fetch customers
        const customersUrl = apiBase
          ? `${apiBase}/api/customers`
          : `/api/customers`;
        const customersResponse = await fetch(customersUrl, {
          credentials: "include",
        });

        if (customersResponse.ok) {
          const customersData = await customersResponse.json();
          setCustomers(customersData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      const apiBase = (process.env.NEXT_PUBLIC_API_BASE || "").replace(
        /\/$/,
        ""
      );
      const url = apiBase
        ? `${apiBase}/api/bookings/${bookingId}/status`
        : `/api/bookings/${bookingId}/status`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      // Update the bookings list
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );

      // Update the selected booking if it's the one being updated
      if (selectedBooking && selectedBooking.id === bookingId) {
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw error;
    }
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage bookings, customers, and track your business performance
            </p>
          </div>

          {/* Stats Overview */}
          <AdminStats bookings={bookings} />

          {/* Tab Navigation */}
          <div className="mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "bookings"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                📅 Bookings
              </button>
              <button
                onClick={() => setActiveTab("customers")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "customers"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                👥 Customers
              </button>
              <button
                onClick={() => setActiveTab("reports")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "reports"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                📊 Reports
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "bookings" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Booking Management
                </h2>
                <p className="text-gray-600">
                  View, filter, and manage all your bookings
                </p>
              </div>

              <BookingTable
                bookings={bookings}
                onBookingClick={handleBookingClick}
                onStatusUpdate={handleStatusUpdate}
              />
            </div>
          )}

          {activeTab === "customers" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Customer Management
                </h2>
                <p className="text-gray-600">
                  View all customers and their booking history
                </p>
              </div>

              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  {customers.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">
                        No customers found
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total Bookings
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {customers.map((customer) => {
                            const customerBookings = bookings.filter(
                              (booking) => booking.customer_id === customer.id
                            );
                            return (
                              <tr
                                key={customer.id}
                                className="hover:bg-gray-50"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {customer.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <a
                                    href={`mailto:${customer.email}`}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    {customer.email}
                                  </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <a
                                    href={`tel:${customer.phone}`}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    {customer.phone}
                                  </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {customerBookings.length}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Reports & Insights
                </h2>
                <p className="text-gray-600">
                  Track your business performance and trends
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Monthly Performance */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Monthly Performance
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Bookings:</span>
                      <span className="font-semibold">
                        {
                          bookings.filter(
                            (booking) =>
                              new Date(booking.date).getMonth() ===
                              new Date().getMonth()
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed Jobs:</span>
                      <span className="font-semibold text-green-600">
                        {
                          bookings.filter(
                            (booking) =>
                              booking.status === "completed" &&
                              new Date(booking.date).getMonth() ===
                                new Date().getMonth()
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending Estimates:</span>
                      <span className="font-semibold text-yellow-600">
                        {
                          bookings.filter(
                            (booking) =>
                              booking.status === "pending" &&
                              new Date(booking.date).getMonth() ===
                                new Date().getMonth()
                          ).length
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service Breakdown */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Service Breakdown
                  </h3>
                  <div className="space-y-3">
                    {Array.from(new Set(bookings.map((b) => b.service))).map(
                      (service) => (
                        <div key={service} className="flex justify-between">
                          <span className="text-gray-600">{service}:</span>
                          <span className="font-semibold">
                            {
                              bookings.filter(
                                (booking) => booking.service === service
                              ).length
                            }
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={closeModal}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
