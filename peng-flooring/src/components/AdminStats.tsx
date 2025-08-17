"use client";

import { useState, useEffect } from "react";

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

interface AdminStatsProps {
  bookings: Booking[];
}

export default function AdminStats({ bookings }: AdminStatsProps) {
  const [stats, setStats] = useState({
    upcomingAppointments: 0,
    pendingRequests: 0,
    completedThisMonth: 0,
    totalThisMonth: 0,
  });

  useEffect(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const upcomingAppointments = bookings.filter(
      (booking) => new Date(booking.date) > now && booking.status !== "canceled"
    ).length;

    const pendingRequests = bookings.filter(
      (booking) => booking.status === "pending"
    ).length;

    const completedThisMonth = bookings.filter(
      (booking) =>
        booking.status === "completed" &&
        new Date(booking.date) >= startOfMonth &&
        new Date(booking.date) <= endOfMonth
    ).length;

    const totalThisMonth = bookings.filter(
      (booking) =>
        new Date(booking.date) >= startOfMonth &&
        new Date(booking.date) <= endOfMonth
    ).length;

    setStats({
      upcomingAppointments,
      pendingRequests,
      completedThisMonth,
      totalThisMonth,
    });
  }, [bookings]);

  const statCards = [
    {
      title: "Upcoming Appointments",
      value: stats.upcomingAppointments,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      color: "bg-yellow-50 border-yellow-200",
      textColor: "text-yellow-700",
      highlight: true,
    },
    {
      title: "Completed This Month",
      value: stats.completedThisMonth,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
    },
    {
      title: "Total This Month",
      value: stats.totalThisMonth,
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => (
        <div
          key={index}
          className={`bg-white rounded-lg border-2 p-6 shadow-sm transition-all duration-200 hover:shadow-md ${
            card.highlight ? "ring-2 ring-yellow-300" : ""
          } ${card.color}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {card.title}
              </p>
              <p className={`text-3xl font-bold ${card.textColor}`}>
                {card.value}
              </p>
            </div>
            {card.highlight && (
              <div className="animate-pulse">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
