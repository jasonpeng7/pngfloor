"use client";

import { useState, useMemo } from "react";

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

interface BookingTableProps {
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  onStatusUpdate: (bookingId: string, newStatus: string) => Promise<void>;
}

export default function BookingTable({
  bookings,
  onBookingClick,
  onStatusUpdate,
}: BookingTableProps) {
  const [filters, setFilters] = useState({
    dateRange: "all",
    status: "all",
    service: "all",
    search: "",
  });
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const filteredAndSortedBookings = useMemo(() => {
    const filtered = bookings.filter((booking) => {
      // Date filter
      if (filters.dateRange !== "all") {
        const now = new Date();
        const bookingDate = new Date(booking.date);
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const weekStart = new Date(
          today.getTime() - today.getDay() * 24 * 60 * 60 * 1000
        );
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        switch (filters.dateRange) {
          case "today":
            if (
              bookingDate < today ||
              bookingDate >= new Date(today.getTime() + 24 * 60 * 60 * 1000)
            ) {
              return false;
            }
            break;
          case "week":
            if (
              bookingDate < weekStart ||
              bookingDate >=
                new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
            ) {
              return false;
            }
            break;
          case "month":
            if (
              bookingDate < monthStart ||
              bookingDate >=
                new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1)
            ) {
              return false;
            }
            break;
        }
      }

      // Status filter
      if (filters.status !== "all" && booking.status !== filters.status) {
        return false;
      }

      // Service filter
      if (filters.service !== "all" && booking.service !== filters.service) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          booking.name.toLowerCase().includes(searchLower) ||
          booking.email.toLowerCase().includes(searchLower) ||
          booking.address.toLowerCase().includes(searchLower) ||
          booking.service.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: Date | string;
      let bValue: Date | string;

      switch (sortBy) {
        case "date":
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        case "service":
          aValue = a.service;
          bValue = b.service;
          break;
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [bookings, filters, sortBy, sortOrder]);

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    setIsUpdating(bookingId);
    try {
      await onStatusUpdate(bookingId, newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(null);
    }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const services = Array.from(new Set(bookings.map((b) => b.service)));

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) =>
                setFilters({ ...filters, dateRange: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service
            </label>
            <select
              value={filters.service}
              onChange={(e) =>
                setFilters({ ...filters, service: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Services</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, email, address, or service..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSortBy("name");
                    setSortOrder(
                      sortBy === "name" && sortOrder === "asc" ? "desc" : "asc"
                    );
                  }}
                >
                  Customer Name
                  {sortBy === "name" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSortBy("service");
                    setSortOrder(
                      sortBy === "service" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    );
                  }}
                >
                  Service
                  {sortBy === "service" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSortBy("date");
                    setSortOrder(
                      sortBy === "date" && sortOrder === "asc" ? "desc" : "asc"
                    );
                  }}
                >
                  Date & Time
                  {sortBy === "date" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSortBy("status");
                    setSortOrder(
                      sortBy === "status" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    );
                  }}
                >
                  Status
                  {sortBy === "status" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onBookingClick(booking)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {booking.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(booking.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                    {booking.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(booking.id, "confirmed");
                        }}
                        disabled={
                          isUpdating === booking.id ||
                          booking.status === "confirmed"
                        }
                        className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(booking.id, "completed");
                        }}
                        disabled={
                          isUpdating === booking.id ||
                          booking.status === "completed"
                        }
                        className="text-green-600 hover:text-green-900 disabled:opacity-50"
                      >
                        Complete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        <div className="p-4 space-y-4">
          {filteredAndSortedBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onBookingClick(booking)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{booking.name}</h3>
                  <p className="text-sm text-gray-500">{booking.email}</p>
                </div>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Service:</span>{" "}
                  {booking.service}
                </div>
                <div>
                  <span className="font-medium">Date:</span>{" "}
                  {formatDate(booking.date)}
                </div>
                <div>
                  <span className="font-medium">Address:</span>{" "}
                  {booking.address}
                </div>
              </div>

              <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusUpdate(booking.id, "confirmed");
                  }}
                  disabled={
                    isUpdating === booking.id || booking.status === "confirmed"
                  }
                  className="text-blue-600 hover:text-blue-900 disabled:opacity-50 text-sm"
                >
                  Confirm
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusUpdate(booking.id, "completed");
                  }}
                  disabled={
                    isUpdating === booking.id || booking.status === "completed"
                  }
                  className="text-green-600 hover:text-green-900 disabled:opacity-50 text-sm"
                >
                  Complete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredAndSortedBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No bookings found</p>
        </div>
      )}
    </div>
  );
}
