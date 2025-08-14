import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex ">
      <div className="text-center">
        <Image
          src="/wood-flooring.png"
          alt="logo"
          width={2000}
          height={2000}
          className="mb-8 w-screen h-[500px] md:max-h-[500px]"
        />
        <p className="inter-tight-bold text-4xl lg:text-6xl text-gray-600 mb-8">
          Professional Flooring Services
        </p>
        <div className="p-[25px] space-y-4">
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
