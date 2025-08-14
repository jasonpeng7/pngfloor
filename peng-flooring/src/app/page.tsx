import Link from "next/link";

export default function Home() {
  return (
    <div className="p-[25px] min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="inter-tight-extrabold text-4xl lg:text-6xl text-gray-600 mb-8">
          Professional Flooring Services
        </p>
        <div className="space-y-4">
          <Link
            href="/bookings"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-block"
          >
            Book Free Estimate
          </Link>
          <div>
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              Sign in to manage your bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
