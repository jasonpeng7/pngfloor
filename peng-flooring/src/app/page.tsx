"use client";

import Link from "next/link";
import Image from "next/image";
import {
  StarIcon,
  ClockIcon,
  HardwoodIcon,
  VinylIcon,
  RefinishIcon,
  CustomIcon,
  FreeQuoteIcon,
} from "../components/icons";
import CallDropdown from "../components/CallDropdown";
import AnimatedCounter from "../components/AnimatedCounter";
import AnimatedSection, { AnimatedDelay } from "../components/AnimatedSection";
import { useLanguage } from "../contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

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
                {t.bookFreeEstimate}
              </Link>
            </div>

            {/* Simplified Hero Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content - Mobile First */}
              <div className="space-y-6 order-2 lg:order-1">
                {/* Simplified Headline */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 inter-tight-bold leading-tight">
                    {t.beautifulLastingFloors}
                    <span className="text-blue-600">
                      {" "}
                      {t.installedByExperts}
                    </span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-gray-600 inter-tight-medium">
                    {t.heroSubtitle}
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
                      {t.rating}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                    <ClockIcon
                      className="w-4 h-4 text-blue-600"
                      fill="currentColor"
                    />
                    <span className="text-sm font-semibold text-gray-700 inter-tight-semibold">
                      {t.yearsExperience}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                    <FreeQuoteIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700 inter-tight-semibold">
                      {t.freeQuote}
                    </span>
                  </div>
                </div>

                {/* CTA buttons - Desktop */}
                <div className="hidden lg:flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                  <Link
                    href="/bookings"
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg inter-tight-bold hover:bg-blue-700 transition-colors duration-200 shadow-lg text-center"
                  >
                    {t.bookFreeEstimate}
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
                        {t.testimonialName}
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
                    {t.testimonialText}
                  </p>
                </AnimatedDelay>
              </div>
            </div>

            {/* Scroll Cue - Animated Arrow */}
            <div className="mt-12 text-center">
              <div className="inline-flex flex-col items-center space-y-2 text-gray-600">
                <span className="text-sm font-medium inter-tight-medium">
                  {t.scrollText}
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
                {t.ourServices}
              </h2>
              <p className="text-xl text-gray-600 inter-tight-medium max-w-3xl mx-auto">
                {t.servicesSubtitle}
              </p>
            </div>

            {/* Desktop Grid - Hidden on mobile */}
            <div className="hidden lg:grid grid-cols-4 gap-8">
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
                    {t.luxuryVinyl}
                  </h3>
                </div>
                <p className="text-gray-600 inter-tight-regular">
                  {t.luxuryVinylDescription}
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
                    {t.hardwoodStairs}
                  </h3>
                </div>
                <p className="text-gray-600 inter-tight-regular">
                  {t.hardwoodStairsDescription}
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
                    {t.refinishing}
                  </h3>
                </div>
                <p className="text-gray-600 inter-tight-regular">
                  {t.refinishingDescription}
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
                    {t.customServices}
                  </h3>
                </div>
                <p className="text-gray-600 inter-tight-regular">
                  {t.customServicesDescription}
                </p>
              </AnimatedDelay>
            </div>

            {/* Mobile Animated Carousel - Hidden on desktop */}
            <div className="lg:hidden services-carousel relative h-80 flex items-center justify-center">
              {/* Vinyl Installation */}
              <div className="service-card absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
                <div className="relative overflow-hidden rounded-lg mb-4 max-w-md">
                  <Image
                    src="/landing-page/vinyl-service.png"
                    alt="Luxury Vinyl Installation"
                    width={400}
                    height={400}
                    className="w-full h-60 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <VinylIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                    {t.luxuryVinyl}
                  </h3>
                </div>
                <p className="text-gray-600 inter-tight-regular">
                  {t.luxuryVinylDescription}
                </p>
              </div>

              {/* Hardwood Installation */}
              <div className="service-card absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
                <div className="relative overflow-hidden rounded-lg mb-4 max-w-md">
                  <Image
                    src="/landing-page/stair-service.png"
                    alt="Hardwood Installation"
                    width={400}
                    height={400}
                    className="w-full h-60 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <HardwoodIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                    {t.hardwoodStairs}
                  </h3>
                </div>
                <p className="text-gray-600 inter-tight-regular">
                  {t.hardwoodStairsDescription}
                </p>
              </div>

              {/* Refinishing */}
              <div className="service-card absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
                <div className="relative overflow-hidden rounded-lg mb-4 max-w-md">
                  <Image
                    src="/landing-page/refinish-service.png"
                    alt="Floor Refinishing"
                    width={400}
                    height={400}
                    className="w-full h-60 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <RefinishIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                    {t.refinishing}
                  </h3>
                </div>
                <p className="text-gray-600 inter-tight-regular">
                  {t.refinishingDescription}
                </p>
              </div>

              {/* Custom Services */}
              <div className="service-card absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
                <div className="relative overflow-hidden rounded-lg mb-4 max-w-md">
                  <Image
                    src="/landing-page/custom-service.png"
                    alt="Custom Flooring Services"
                    width={400}
                    height={400}
                    className="w-full h-60 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <CustomIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                    {t.customServices}
                  </h3>
                </div>
                <p className="text-gray-600 inter-tight-regular">
                  {t.customServicesDescription}
                </p>
              </div>
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
              {t.servingAreas}
            </h2>
            <p className="text-xl text-white inter-tight-light max-w-3xl mx-auto">
              {t.servingAreasSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-[500px] lg:max-w-none mx-auto lg:mx-0">
            {/* Why Choose Us */}
            <div className="bg-green-600 bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 shadow-lg h-full">
              <h3 className="text-xl font-bold text-white inter-tight-medium mb-4">
                {t.whyChooseUs}
              </h3>
              <ul className="space-y-2 text-green-100 inter-tight-light">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>{t.whyChooseUsItem1}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>{t.whyChooseUsItem2}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>{t.whyChooseUsItem3}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>{t.whyChooseUsItem4}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>{t.whyChooseUsItem5}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>{t.whyChooseUsItem6}</span>
                </li>
              </ul>
            </div>

            {/* Orange County */}
            <div className="bg-black rounded-lg p-6 shadow-lg h-full">
              <h3 className="text-xl font-bold text-white inter-tight-medium mb-4">
                {t.orangeCounty}
              </h3>
              <ul className="space-y-2 text-gray-300 inter-tight-light">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {t.anaheim}
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {t.fullerton}
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {t.costaMesa}
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {t.huntingtonBeach}
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {t.irvine}
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {t.newportBeach}
                </li>
                <li className="flex items-center text-yellow-300 font-semibold">
                  <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full mr-2"></span>
                  {t.andManyMore}
                </li>
              </ul>
            </div>

            {/* San Gabriel Valley */}
            <div className="bg-black rounded-lg p-6 shadow-lg h-full">
              <h3 className="text-xl font-bold text-white inter-tight-medium mb-4">
                {t.sanGabrielValley}
              </h3>
              <ul className="space-y-2 text-gray-300 inter-tight-light">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {t.alhambra}
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {t.arcadia}
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {t.elMonte}
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {t.chinoHills}
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {t.montereyPark}
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {t.diamondBar}
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {t.walnut}
                </li>
                <li className="flex items-center text-yellow-300 font-semibold">
                  <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full mr-2"></span>
                  {t.andManyMore}
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
              {t.readyToTransform}
            </h2>
            <p className="text-xl text-blue-100 inter-tight-medium max-w-3xl mx-auto">
              {t.readyToTransformSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/bookings"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg inter-tight-bold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                {t.bookYourFreeEstimate}
              </Link>
              <CallDropdown />
            </div>

            <p className="text-blue-100 inter-tight-regular">
              {t.footerServing}
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
