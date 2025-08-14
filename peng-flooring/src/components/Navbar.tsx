"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex flex-shrink-0 flex-row items-end gap-x-[3px]">
            <Image src="/penglogo.svg" alt="logo" width={45} height={45} />
            <Link href="/" className="flex items-end">
              <span className="text-2xl font-bold text-gray-900 inter-tight-regular">
                flooring
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium inter-tight-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/bookings"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium inter-tight-medium transition-colors"
              >
                Free Estimate
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium inter-tight-medium transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium inter-tight-medium transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/bookings"
            className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium inter-tight-medium transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Book Service
          </Link>
          <Link
            href="/login"
            className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium inter-tight-medium transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
