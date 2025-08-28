import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface BookingData {
  customer_id?: string;
  date?: string;
  name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  lived_in?: string;
  service?: string;
  house_size?: string;
  rooms?: string;
  message?: string;
  status?: string;
  hp_trap?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: BookingData = await request.json();

    // Simple honeypot check
    if (typeof data.hp_trap === "string" && data.hp_trap.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Thanks!" },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!data.name || !data.email || !data.phone_number || !data.address) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // For local development, just log the data and return success
    console.log("Booking request received:", {
      name: data.name,
      email: data.email,
      phone: data.phone_number,
      address: data.address,
      service: data.service,
      house_size: data.house_size,
      rooms: data.rooms,
      lived_in: data.lived_in,
      message: data.message,
      date: data.date,
    });

    // In production, this would send an email via Gmail API
    // For now, just return success
    return NextResponse.json(
      {
        success: true,
        message:
          "Your estimate request has been submitted successfully! We'll contact you within 48 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing booking request:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
