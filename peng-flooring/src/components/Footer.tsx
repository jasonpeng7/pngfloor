"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white inter-tight-regular">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Business Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4 inter-tight-bold">
              Peng Flooring
            </h3>
            <p className="text-gray-300 mb-6 inter-tight-regular">
              Family-owned flooring company serving Orange County and LA County
              since 2009. Quality flooring installation, refinishing, and
              flooring services with honest estimates.
            </p>

            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-blue-400 mr-3">📞</span>
                <a
                  href="tel:+16265407720"
                  className="text-gray-300 hover:text-white transition-colors inter-tight-medium"
                >
                  (626) 540-7720
                </a>
              </div>

              <div className="flex items-center">
                <span className="text-blue-400 mr-3">✉️</span>
                <a
                  href="mailto:pengflooring@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors inter-tight-medium"
                >
                  pengflooring@gmail.com
                </a>
              </div>

              <div className="flex items-center">
                <span className="text-blue-400 mr-3">📍</span>
                <span className="text-gray-300 inter-tight-medium">
                  Serving the 626 area and surrounding cities
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 inter-tight-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors inter-tight-regular"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors inter-tight-regular"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors inter-tight-regular"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/bookings"
                  className="text-gray-300 hover:text-white transition-colors inter-tight-regular"
                >
                  Book a Free Estimate
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors inter-tight-regular"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Reviews */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 inter-tight-semibold">
              Connect With Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-blue-400 mr-3">📸</span>
                <a
                  href="https://instagram.com/comingsoon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors inter-tight-regular"
                >
                  Coming Soon
                </a>
              </div>

              {/* <div className="flex items-center">
                <span className="text-blue-400 mr-3">📘</span>
                <a
                  href="https://facebook.com/pengflooring"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors inter-tight-regular"
                >
                  Facebook
                </a>
              </div> */}
              {/* 
              <div className="flex items-center">
                <span className="text-blue-400 mr-3">⭐</span>
                <a
                  href="https://yelp.com/biz/peng-flooring"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors inter-tight-regular"
                >
                  Yelp Reviews
                </a>
              </div> */}

              {/* <div className="flex items-center">
                <span className="text-blue-400 mr-3">🔍</span>
                <a
                  href="https://google.com/maps/place/peng-flooring"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors inter-tight-regular"
                >
                  Google Reviews
                </a>
              </div> */}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <h4 className="text-xl font-semibold text-white mb-4 inter-tight-semibold">
            Ready to transform your floors?
          </h4>
          <Link
            href="/bookings"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors inter-tight-semibold"
          >
            Book Your Free Consultation
          </Link>
        </div>
      </div>

      {/* Legal & SEO Footer */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm inter-tight-regular">
                © {currentYear} Peng Flooring. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm inter-tight-regular mt-1">
                Proudly serving homeowners in LAC, OC, and the greater 626 area.
              </p>
            </div>

            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors inter-tight-regular"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors inter-tight-regular"
              >
                Terms of Service
              </Link>
              <a
                href="https://jasonpe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors inter-tight-regular"
              >
                Website made by{" "}
                <span className="text-yellow-200">Jason Peng</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
