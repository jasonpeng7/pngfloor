import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get your free flooring estimate today!",
  description:
    "Schedule your free flooring estimate with Peng Flooring. Profssional luxury vinyl installation. No obligation, honest pricing.",
  alternates: {
    canonical: "/bookings",
  },
};

export default function BookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
