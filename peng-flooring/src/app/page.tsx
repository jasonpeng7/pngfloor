import Link from "next/link";
import Image from "next/image";
import {
  StarIcon,
  ClockIcon,
  HardwoodIcon,
  VinylIcon,
  RefinishIcon,
  CustomIcon,
} from "../components/icons";
import CallDropdown from "../components/CallDropdown";
import AnimatedCounter from "../components/AnimatedCounter";
import AnimatedSection, { AnimatedDelay } from "../components/AnimatedSection";

export default function Home() {
  return (
    <div className="max-w-[2000px] min-h-screen">
      {/* hero section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-8 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center lg:text-left">
            {/* Mobile-First CTA Button - Above the fold */}
            <div className="lg:hidden mb-8">
              <Link
                href="/bookings"
                className="w-full bg-blue-600 text-white px-8 py-5 rounded-lg font-bold text-xl inter-tight-bold hover:bg-blue-700 transition-colors duration-200 shadow-lg text-center block"
              >
                Book Free Estimate
              </Link>
            </div>

            {/* Simplified Hero Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content - Mobile First */}
              <div className="space-y-6 order-2 lg:order-1">
                {/* Simplified Headline */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 inter-tight-bold leading-tight">
                    Beautiful, Lasting Floors—
                    <span className="text-blue-600"> Installed by Experts</span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-gray-600 inter-tight-medium">
                    Professional flooring company serving the greater 626 area
                    since 2009. Quality installation and other flooring services
                    with honest estimates.
                  </p>
                </div>

                {/* Trust Badges Row - Immediate Value */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 items-center">
                  <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="w-4 h-4"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 inter-tight-semibold">
                      4.9/5
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                    <ClockIcon
                      className="w-4 h-4 text-blue-600"
                      fill="currentColor"
                    />
                    <span className="text-sm font-semibold text-gray-700 inter-tight-semibold">
                      15+ Years
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                    <span className="text-sm font-semibold text-gray-700 inter-tight-semibold">
                      Free Quote
                    </span>
                  </div>
                </div>

                {/* CTA buttons - Desktop */}
                <div className="hidden lg:flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                  <Link
                    href="/bookings"
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg inter-tight-bold hover:bg-blue-700 transition-colors duration-200 shadow-lg text-center"
                  >
                    Book Free Estimate
                  </Link>
                  <CallDropdown />
                </div>
              </div>

              {/* Image - Mobile Second */}
              <div className="relative order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/landing-page/main-stair.png"
                    alt="Professional hardwood flooring installation in Orange County and LA County by Peng Flooring"
                    width={2000}
                    height={2000}
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating testimonial card */}
                <AnimatedDelay className="absolute -bottom-10 -right-1 sm:-bottom-2 sm:-right-2 md:-bottom-4 md:-right-4 lg:-bottom-6 lg:-right-6 bg-white rounded-lg shadow-xl p-4 max-w-xs">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src="/landing-page/dewi.jpg"
                        alt="Dewi H. - Satisfied Customer"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
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
                    &ldquo;Best work in the 626 area! He transformed our old
                    floors into a very modern and sleek finish that completely
                    elevated our home. Professional, timely, and honest
                    pricing.&rdquo;
                  </p>
                </AnimatedDelay>
              </div>
            </div>

            {/* Scroll Cue - Animated Arrow */}
            <div className="mt-12 text-center">
              <div className="inline-flex flex-col items-center space-y-2 text-gray-600">
                <span className="text-sm font-medium inter-tight-medium">
                  Scroll to see our work
                </span>
                <div className="animate-bounce">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* services section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 inter-tight-bold">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 inter-tight-medium max-w-3xl mx-auto">
                Professional flooring services with quality materials and honest
                pricing. We handle everything from installation to refinishing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Vinyl Installation */}
              <AnimatedDelay className="text-center group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src="/landing-page/vinyl-service.png"
                    alt="Luxury Vinyl Installation"
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <VinylIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                    Luxury Vinyl
                  </h3>
                </div>
                <p className="text-gray-600 inter-tight-regular">
                  Waterproof, durable, and beautiful vinyl flooring
                  installation.
                </p>
              </AnimatedDelay>

              {/* Hardwood Installation */}
              <AnimatedDelay className="text-center group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src="/landing-page/stair-service.png"
                    alt="Hardwood Installation"
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <HardwoodIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                    Hardwood & Stairs
                  </h3>
                </div>
                <p className="text-gray-600 inter-tight-regular">
                  Premium hardwood installation and stair remodeling services.
                </p>
              </AnimatedDelay>

              {/* Refinishing */}
              <AnimatedDelay className="text-center group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src="/landing-page/refinish-service.png"
                    alt="Floor Refinishing"
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <RefinishIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                    Refinishing
                  </h3>
                </div>
                <p className="text-gray-600 inter-tight-regular">
                  Restore your existing floors to their original beauty.
                </p>
              </AnimatedDelay>

              {/* Custom Services */}
              <AnimatedDelay className="text-center group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src="/landing-page/custom-service.png"
                    alt="Custom Flooring Services"
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <CustomIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                    Custom Services
                  </h3>
                </div>
                <p className="text-gray-600 inter-tight-regular">
                  Specialized flooring solutions for unique projects.
                </p>
              </AnimatedDelay>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Animated Counter Section */}
      <AnimatedCounter endValue={862} />

      {/* Local Service Areas Section */}
      <section className="py-20 bg-[#222222] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gray-300 rounded-full opacity-30 blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-100 rounded-full opacity-40 blur-md"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white inter-tight-medium mb-4">
              Serving OC/LAC & San Gabriel Valley Areas
            </h2>
            <p className="text-xl text-white inter-tight-light max-w-3xl mx-auto">
              Our family-owned flooring company proudly serves the following
              cities and surrounding areas with professional flooring
              installation services.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-[500px] lg:max-w-none mx-auto lg:mx-0">
            {/* Why Choose Us */}
            <div className="bg-green-600 bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 shadow-lg h-full">
              <h3 className="text-xl font-bold text-white inter-tight-medium mb-4">
                Why Choose Us?
              </h3>
              <ul className="space-y-2 text-green-100 inter-tight-light">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>15+ years of professional experience</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>Only premium materials used in all projects</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>All work is done efficiently, clean, and on time</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>Free estimates with honest, transparent pricing</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>Quality workmanship guaranteed on every job</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>Family-owned business you can trust</span>
                </li>
              </ul>
            </div>

            {/* Orange County */}
            <div className="bg-black rounded-lg p-6 shadow-lg h-full">
              <h3 className="text-xl font-bold text-white inter-tight-medium mb-4">
                Orange County
              </h3>
              <ul className="space-y-2 text-gray-300 inter-tight-light">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Anaheim
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Fullerton
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Costa Mesa
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Huntington Beach
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Irvine
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Newport Beach
                </li>
                <li className="flex items-center text-yellow-300 font-semibold">
                  <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full mr-2"></span>
                  And many more!
                </li>
              </ul>
            </div>

            {/* San Gabriel Valley */}
            <div className="bg-black rounded-lg p-6 shadow-lg h-full">
              <h3 className="text-xl font-bold text-white inter-tight-medium mb-4">
                San Gabriel Valley
              </h3>
              <ul className="space-y-2 text-gray-300 inter-tight-light">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Alhambra
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Arcadia
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  El Monte
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Chino/Chino Hills
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Monterey Park
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Diamond Bar
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Walnut
                </li>
                <li className="flex items-center text-yellow-300 font-semibold">
                  <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full mr-2"></span>
                  And many more!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* steps section */}

      {/* CTA section */}
      <section className="py-16 lg:py-24 bg-blue-700 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-white inter-tight-bold">
              Ready to Transform Your Floors?
            </h2>
            <p className="text-xl text-blue-100 inter-tight-medium max-w-3xl mx-auto">
              Get your free estimate today and see how we can bring your
              flooring vision to life. No pressure, just honest advice and fair
              pricing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/bookings"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg inter-tight-bold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                Book Your Free Estimate
              </Link>
              <CallDropdown />
            </div>

            <p className="text-blue-100 inter-tight-regular">
              Serving Orange County and LA County • Insured • Free Estimates
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
