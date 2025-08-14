import Link from "next/link";
import Image from "next/image";
import {
  StarIcon,
  CheckIcon,
  ClockIcon,
  PhoneIcon,
  HardwoodIcon,
  VinylIcon,
  RefinishIcon,
  CustomIcon,
} from "../components/icons";
import CallDropdown from "../components/CallDropdown";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* hero section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20 lg:py-32 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid lg:grid-cols-2 gap-12 items-center justify-center">
            {/* Image - Mobile First */}
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/wood-flooring.png"
                  alt="Beautiful hardwood flooring installation"
                  width={2000}
                  height={2000}
                  className="w-full h-[400px]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating testimonial card */}
              <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 md:-bottom-4 md:-left-4 lg:-bottom-6 lg:-left-6 bg-white rounded-lg shadow-xl p-4 max-w-xs">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold inter-tight-bold">
                      S
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 inter-tight-semibold">
                      Dewi H.
                    </p>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="w-4 h-4"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 inter-tight-regular">
                  &ldquo;Amazing work! They transformed our old floors into
                  something beautiful. Professional and honest pricing.&rdquo;
                </p>
              </div>
            </div>

            {/* Content - Mobile Second */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className=" space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 inter-tight-bold leading-tight">
                  Transform Your Floors—
                  <span className="text-blue-600"> For Free</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 inter-tight-medium">
                  Family-owned business serving the OC/LA Country Area since
                  2009. Quality flooring with honest estimates.
                </p>
              </div>

              {/* trust indicator section */}
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-5 h-5"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 inter-tight-medium">
                    4.9/5 (500+ reviews)
                  </span>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-600 inter-tight-medium">
                    Licensed & Insured
                  </span>
                </div> */}
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600 inter-tight-medium">
                    15+ Years Experience
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/bookings"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg inter-tight-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Schedule Your Free Consultation
                </Link>
                <CallDropdown />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 inter-tight-bold mb-4">
              Professional Flooring Services
            </h2>
            <p className="text-xl text-gray-600 inter-tight-medium max-w-3xl mx-auto">
              From installation to refinishing, we handle all your flooring
              needs with precision and care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hardwood Installation */}
            <div className="text-center group">
              <div className="bg-gray-100 rounded-xl p-6 mb-4 group-hover:bg-blue-50 transition-colors">
                <HardwoodIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 inter-tight-semibold mb-2">
                Hardwood Installation
              </h3>
              <p className="text-gray-600 inter-tight-regular">
                Premium hardwood floors installed with precision and care.
              </p>
            </div>

            {/* Vinyl & Laminate */}
            <div className="text-center group">
              <div className="bg-gray-100 rounded-xl p-6 mb-4 group-hover:bg-blue-50 transition-colors">
                <VinylIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 inter-tight-semibold mb-2">
                Vinyl & Laminate
              </h3>
              <p className="text-gray-600 inter-tight-regular">
                Durable and beautiful flooring options for any budget.
              </p>
            </div>

            {/* Refinishing & Repairs */}
            <div className="text-center group">
              <div className="bg-gray-100 rounded-xl p-6 mb-4 group-hover:bg-blue-50 transition-colors">
                <RefinishIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 inter-tight-semibold mb-2">
                Refinishing & Repairs
              </h3>
              <p className="text-gray-600 inter-tight-regular">
                Restore your existing floors to their original beauty.
              </p>
            </div>

            {/* Custom Flooring */}
            <div className="text-center group">
              <div className="bg-gray-100 rounded-xl p-6 mb-4 group-hover:bg-blue-50 transition-colors">
                <CustomIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 inter-tight-semibold mb-2">
                Custom Flooring
              </h3>
              <p className="text-gray-600 inter-tight-regular">
                Unique designs and patterns to match your vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white inter-tight-bold mb-4">
            Ready to Transform Your Floors?
          </h2>
          <p className="text-xl text-blue-100 inter-tight-medium mb-8">
            Get your free estimate today. No obligation, just honest pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bookings"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg inter-tight-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Book My Free Estimate
            </Link>
            <CallDropdown variant="white" />
          </div>
        </div>
      </section>
    </div>
  );
}
