"use client";

import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="max-w-[2000px] min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-8">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Last Updated: {new Date().toLocaleDateString()}
            </p>

            <p className="mb-6 text-gray-700">
              Welcome to Peng Flooring (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
              &ldquo;us&rdquo;). By using our website or booking a service, you
              agree to these Terms of Service. Please read them carefully.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Services Provided
              </h2>
              <p className="text-gray-700 mb-4">
                We offer flooring consultations, estimates, and installation
                services. Consultations booked through our website are free, and
                any paid services will be discussed and agreed upon separately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Booking and Appointments
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>
                  Provide accurate contact information when booking a
                  consultation.
                </li>
                <li>
                  We may contact you via phone, email, or text to confirm
                  bookings.
                </li>
                <li>
                  We reserve the right to reschedule or cancel appointments if
                  necessary, and will notify you in advance where possible.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Estimates
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>
                  Estimates are based on the information and measurements
                  provided at the consultation.
                </li>
                <li>
                  Final project costs may change if additional work or materials
                  are required.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Your Responsibilities
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Provide accurate information during booking.</li>
                <li>
                  Ensure we have safe access to the property for measurements or
                  installation.
                </li>
                <li>Follow any safety or preparation instructions we give.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Payments
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>
                  Payment terms will be stated in your project agreement or
                  invoice.
                </li>
                <li>
                  We do not require payment for consultations or estimates.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-700 mb-4">
                We are not responsible for delays or issues caused by events
                beyond our control (e.g., weather, supplier shortages). We are
                not liable for indirect or incidental damages related to our
                services or your use of this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Intellectual Property
              </h2>
              <p className="text-gray-700 mb-4">
                All website content (text, images, logos, designs) is owned by
                us and may not be copied or reused without our permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Privacy
              </h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our{" "}
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Privacy Policy
                </Link>{" "}
                explains how we collect and use your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. Changes to These Terms
              </h2>
              <p className="text-gray-700 mb-4">
                We may update these Terms from time to time. Changes will be
                posted on this page with the updated date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                10. Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms, contact us at:{" "}
                <a
                  href="mailto:pengflooring@gmail.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  pengflooring@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
