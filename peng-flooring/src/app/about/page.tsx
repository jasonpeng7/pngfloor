import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  CheckIcon,
  UserIcon,
  AwardIcon,
  MapPinIcon,
  CalendarIcon,
  HeartIcon,
  PhoneIcon,
  HardwoodIcon,
  RefinishIcon,
  CustomIcon,
  ChineseLanguageIcon,
} from "../../components/icons";
import StepsShowcase from "../../components/StepsShowcase";
import Testimonials from "../../components/Testimonials";
import AnimatedSection, {
  AnimatedDelay,
} from "../../components/AnimatedSection";

export const metadata: Metadata = {
  title: "About Peng Flooring",
  description:
    "Meet Leo Peng, Founder of Peng Flooring, your trusted flooring expert with 15+ years of experience.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-[2000px] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 inter-tight-bold leading-tight">
              Meet Your <span className="text-blue-600">Flooring Experts</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 inter-tight-medium max-w-4xl mx-auto">
              Committed to transforming your home with quality flooring that
              lasts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* leo peng */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative overflow-hidden">
                <Image
                  src="/about-page/longde.png"
                  alt="Professional flooring contractor working on hardwood installation"
                  width={600}
                  height={600}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating credentials card */}
              <AnimatedDelay className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-xl p-4 max-w-xs">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckIcon
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                  />
                  <span className="text-sm font-semibold text-gray-900 inter-tight-semibold">
                    Insured
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <AwardIcon
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                  />
                  <span className="text-sm font-semibold text-gray-900 inter-tight-semibold">
                    15+ Years Experience
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ChineseLanguageIcon
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                  />
                  <span className="text-sm font-semibold text-gray-900 inter-tight-semibold">
                    Speaks Chinese
                  </span>
                </div>
              </AnimatedDelay>
            </div>

            {/* Personal story */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <UserIcon
                  className="w-8 h-8 text-blue-600"
                  fill="currentColor"
                />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 inter-tight-bold">
                  Hi, My name is Leo!
                </h2>
              </div>

              <div className="space-y-4 text-lg text-gray-600 inter-tight-regular leading-relaxed">
                <p>
                  I&apos;m the owner of Peng Flooring. I&apos;ve been working
                  with home remodeling for over 15 years, specializing in
                  flooring and stairs. What started as a passion for quality
                  craftsmanship has grown into a family business dedicated to
                  helping homeowners like you transform your beautiful spaces.
                </p>
                <p>
                  I started this business because I believe every home deserves
                  beautiful, lasting floors—and every customer deserves honest
                  pricing and personal service. When you hire us, you&apos;re
                  not just getting a contractor; you&apos;re getting someone who
                  cares about your home as much as you do.
                </p>
                <p>
                  My approach is simple: treat every job like it&apos;s my own
                  home— we use only the best materials, and never cut corners.
                  That&apos;s the{" "}
                  <span className="font-bold">Peng Flooring</span> way.
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 inter-tight-bold">
                    15+
                  </div>
                  <div className="text-sm text-gray-600 inter-tight-medium">
                    Years Experience
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 inter-tight-bold">
                    800+
                  </div>
                  <div className="text-sm text-gray-600 inter-tight-medium">
                    Happy Customers
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* jason peng section */}
      {/* <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative  overflow-hidden">
                <Image
                  src="/about-page/jason.jpg"
                  alt="Professional flooring contractor working on hardwood installation"
                  width={600}
                  height={600}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div> */}

      {/* Personal story */}
      {/* <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <UserIcon
                  className="w-8 h-8 text-blue-600"
                  fill="currentColor"
                />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 inter-tight-bold">
                  Hi, My name is Jason!
                </h2>
              </div> */}

      {/* <div className="space-y-4 text-lg text-gray-600 inter-tight-regular leading-relaxed">
                <p>
                  I&apos;m Jason — the creator of this website and proud son of
                  the owner of Peng Flooring. My dad has been working in home
                  remodeling for over 15 years, specializing in flooring and
                  stairs.
                </p>
                <p>
                  I built this site to make it easier for customers to connect
                  with my dad&apos;s work and book free estimates. I manage the
                  online aspect of this business, whether it be marketing or
                  handling sales calls to working with finances. I also help out
                  with the business on-site from time to time, talking to
                  clients or simply helping out with projects.
                </p>
              </div> */}

      {/* Quick stats */}
      {/* <div className="pt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 inter-tight-bold">
                    2+
                  </div>
                  <div className="text-sm text-gray-600 inter-tight-medium">
                    Years Experience
                  </div>
                </div>{" "}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section> */}

      {/* Mission Statement Section */}
      <section className="py-16 lg:py-24 bg-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center space-y-8">
            <div className="flex justify-center">
              <HeartIcon
                className="w-16 h-16 text-red-500"
                fill="currentColor"
              />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white inter-tight-bold">
              Our Mission
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl lg:text-2xl text-white inter-tight-medium leading-relaxed">
                Our mission is simple—deliver beautiful, lasting floors with
                honest pricing and a personal touch you can trust. We believe
                quality flooring shouldn&apos;t break the bank, and every
                customer deserves to be treated like family.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Experience & Expertise Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center space-y-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 inter-tight-bold">
              Experience & Expertise
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedDelay className="text-center space-y-4 p-6 bg-gray-50 rounded-xl">
                <CalendarIcon
                  className="w-12 h-12 text-blue-600 mx-auto"
                  fill="currentColor"
                />
                <h3 className="text-xl font-bold text-gray-900 inter-tight-bold">
                  15+ Years in Business
                </h3>
                <p className="text-gray-600 inter-tight-regular">
                  Serving Orange County, LA County, and 626 area since 2009 with
                  consistent quality and reliability.
                </p>
              </AnimatedDelay>

              <AnimatedDelay className="text-center space-y-4 p-6 bg-gray-50 rounded-xl">
                <AwardIcon
                  className="w-12 h-12 text-blue-600 mx-auto"
                  fill="currentColor"
                />
                <h3 className="text-xl font-bold text-gray-900 inter-tight-bold">
                  Specialized
                </h3>
                <p className="text-gray-600 inter-tight-regular">
                  Industry professional combining best practices and top quality
                  materials
                </p>
              </AnimatedDelay>

              <AnimatedDelay className="text-center space-y-4 p-6 bg-gray-50 rounded-xl">
                <CheckIcon
                  className="w-12 h-12 text-blue-600 mx-auto"
                  fill="currentColor"
                />
                <h3 className="text-xl font-bold text-gray-900 inter-tight-bold">
                  Premium Quality
                </h3>
                <p className="text-gray-600 inter-tight-regular">
                  We use top quality products, tools, and materials for long
                  lasting floors.
                </p>
              </AnimatedDelay>
            </div>

            {/* Specializations */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 inter-tight-bold mb-2">
                Our Core Services
              </h3>
              <p className="text-gray-600 text-xs inter-tight-light mb-8">
                *These photos are for reference only.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Vinyl Installation */}
                <AnimatedDelay className="text-center group">
                  <div className="relative overflow-hidden rounded-lg mb-3 ">
                    <Image
                      src="/about-page/vinyl-about.png"
                      alt="Luxury Vinyl Installation"
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <HardwoodIcon className="w-6 h-6 text-blue-600 mr-2" />
                    <h4 className="font-medium text-gray-900 inter-tight-medium">
                      Luxury Vinyl Installation
                    </h4>
                  </div>
                </AnimatedDelay>

                {/* Baseboard Refinishing */}
                <AnimatedDelay className="text-center group">
                  <div className="relative overflow-hidden rounded-lg mb-3 ">
                    <Image
                      src="/about-page/baseboard-about.png"
                      alt="Baseboard Refinishing"
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <RefinishIcon className="w-6 h-6 text-blue-600 mr-2" />
                    <h4 className="font-medium text-gray-900 inter-tight-medium">
                      Baseboard Refinishing
                    </h4>
                  </div>
                </AnimatedDelay>

                {/* Floor Refinishing */}
                <AnimatedDelay className="text-center group">
                  <div className="relative overflow-hidden rounded-lg mb-3 ">
                    <Image
                      src="/about-page/refinishing-about.png"
                      alt="Floor Refinishing"
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <RefinishIcon className="w-6 h-6 text-blue-600 mr-2" />
                    <h4 className="font-medium text-gray-900 inter-tight-medium">
                      Floor Refinishing
                    </h4>
                  </div>
                </AnimatedDelay>

                {/* Stair Installation */}
                <AnimatedDelay className="text-center group">
                  <div className="relative overflow-hidden rounded-lg mb-3 ">
                    <Image
                      src="/about-page/stair-remodel.png"
                      alt="Baseboard Refinishing"
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <RefinishIcon className="w-6 h-6 text-blue-600 mr-2" />
                    <h4 className="font-medium text-gray-900 inter-tight-medium">
                      Stair Remodeling
                    </h4>
                  </div>
                </AnimatedDelay>

                {/* Carpet Removal */}
                <AnimatedDelay className="text-center group lg:col-start-2">
                  <div className="relative overflow-hidden rounded-lg mb-3 ">
                    <Image
                      src="/about-page/carpet-removal.png"
                      alt="Carpet Removal"
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <CustomIcon className="w-6 h-6 text-blue-600 mr-2" />
                    <h4 className="font-medium text-gray-900 inter-tight-medium">
                      Carpet Removal
                    </h4>
                  </div>
                </AnimatedDelay>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps Showcase */}
      <StepsShowcase />

      {/* Before & After Showcase */}
      <section className="py-16 lg:py-24 bg-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center space-y-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-white inter-tight-bold">
              Our Work Speaks for Itself
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* stair service*/}
              <AnimatedDelay className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <Image
                      src="/about-page/showcase-stairs.JPG"
                      alt="Before: Worn hardwood floors"
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      CURVED
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src="/about-page/showcase-stair2.JPG"
                      alt="After: Refinished hardwood floors"
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      TWO BLOCK
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold mb-2">
                    Stair Replacement Projects in Chino Hills, CA
                  </h3>
                  <p className="text-gray-600 inter-tight-regular">
                    Complete stair projects for beautiful 2,500 sq. ft. houses.
                    Full remodel of stairs including new rails, baseboards, and
                    baseshoes. Replaced previously aged and warped stairs into a
                    grand staircase with modern designs and colors.{" "}
                    <span className="inter-tight-medium">
                      Total project timeline: 1 week
                    </span>
                  </p>
                </div>
              </AnimatedDelay>

              {/* full service */}
              <AnimatedDelay className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <Image
                      src="/about-page/full-service2.JPG"
                      alt="Before: Old carpet flooring"
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      LUX. VINYL
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src="/about-page/full-service1.JPG"
                      alt="After: New hardwood installation"
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      LUX. VINYL
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold mb-2">
                    Full Service Projects- Flooring + Stairs in Walnut, CA
                  </h3>
                  <p className="text-gray-600 inter-tight-regular">
                    Full service projects for beautiful 3,000 sq. ft. houses.
                    Replaced old carpet with luxury vinyl wood for and remodeled
                    stairs for both homes. Professional trim work and seamless
                    transitions throughout both houses.{" "}
                    <span className="inter-tight-medium">
                      Total project timeline: 1½ weeks (Flooring: 6 days,
                      Stairs: 5 days)
                    </span>
                  </p>
                </div>
              </AnimatedDelay>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Local Commitment Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <MapPinIcon
                  className="w-8 h-8 text-blue-600"
                  fill="currentColor"
                />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 inter-tight-bold">
                  Committed to Our Community
                </h2>
              </div>

              <div className="space-y-4 text-lg text-gray-600 inter-tight-regular">
                <p>
                  As a local business owner, I&apos;m proud to serve the
                  communities that raised me. We work throughout Orange County
                  and LA County, with deep roots in the 626 area.
                </p>
              </div>

              {/* Areas served */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 inter-tight-bold">
                  Top Areas We Serve:
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      Chino Hills
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      Rowland Heights
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      Walnut
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      Chino
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      Arcadia
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      Irvine
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      El Monte
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      Alhambra
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/about-page/sangabriel.jpg"
                  alt="Local community flooring project"
                  width={600}
                  height={600}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold inter-tight-bold mb-2">
                    Community.
                  </h3>
                  <p className="text-sm inter-tight-regular">
                    Every project is done with quality and care.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <Testimonials />

      {/* Call-to-Action Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-700">
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
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg inter-tight-bold hover:bg-blue-400 transition-colors duration-200 shadow-lg"
              >
                <PhoneIcon className="w-5 h-5" fill="currentColor" />
                <span>Call Now</span>
              </a>
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
