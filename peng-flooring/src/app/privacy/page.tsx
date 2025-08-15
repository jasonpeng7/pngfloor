"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Last Updated: {new Date().toLocaleDateString()}
            </p>

            <p className="mb-6 text-gray-700">
              Peng Flooring (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
              &ldquo;us&rdquo;) values your privacy. This Privacy Policy
              explains how we collect, use, and protect your personal
              information when you visit our website and book a free
              consultation or estimate.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Home or business address</li>
                <li>
                  Any other information you provide in your booking form or
                  message
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                We use your information solely for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Scheduling and confirming consultations</li>
                <li>Communicating about your booking</li>
                <li>Providing estimates and service information</li>
                <li>Improving our website and services</li>
              </ul>
              <p className="mb-4 font-medium text-gray-700">
                We <span className="underline">do not</span> sell, rent, or
                trade your personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. How We Protect Your Information
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Secure systems for storing data</li>
                <li>Access restricted to authorized personnel</li>
                <li>Collecting only necessary information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Sharing of Information
              </h2>
              <p className="text-gray-700 mb-4">
                We may share your information only with service providers who
                help operate our website or schedule consultations, or if
                required by law. We never share personal information for
                marketing by third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Data Retention
              </h2>
              <p className="text-gray-700 mb-4">
                We keep your data only as long as needed to complete your
                consultation or project, or to meet legal obligations. When no
                longer needed, it is securely deleted or anonymized.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Your Rights
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Request a copy of the personal data we hold</li>
                <li>Ask us to correct or delete your data</li>
                <li>Withdraw consent for us to contact you</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, contact us at:{" "}
                <a
                  href="mailto:privacy@pengflooring.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  privacy@pengflooring.com
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-gray-700 mb-4">
                We may update this policy from time to time. Changes will be
                posted here with the updated date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
