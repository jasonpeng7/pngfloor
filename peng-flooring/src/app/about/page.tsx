"use client";

import Link from "next/link";
import Image from "next/image";
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
import { useLanguage } from "../../contexts/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-[2000px] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 inter-tight-bold leading-tight">
              {t.aboutPageTitle?.split(" ").slice(0, 2).join(" ")}{" "}
              <span className="text-blue-600">
                {t.aboutPageTitle?.split(" ").slice(2).join(" ")}
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 inter-tight-medium max-w-4xl mx-auto">
              {t.aboutPageSubtitle}
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
                    {t.insured}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <AwardIcon
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                  />
                  <span className="text-sm font-semibold text-gray-900 inter-tight-semibold">
                    {t.yearsExperience}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ChineseLanguageIcon
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                  />
                  <span className="text-sm font-semibold text-gray-900 inter-tight-semibold">
                    {t.speaksChinese}
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
                  {t.leoPengIntro}
                </h2>
              </div>

              <div className="space-y-4 text-lg text-gray-600 inter-tight-regular leading-relaxed">
                <p>{t.leoPengP1}</p>
                <p>{t.leoPengP2}</p>
                <p>
                  {t.leoPengP3?.split("Peng Flooring")[0]}
                  <span className="font-bold">Peng Flooring</span>
                  {t.leoPengP3?.split("Peng Flooring")[1]}
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 inter-tight-bold">
                    15+
                  </div>
                  <div className="text-sm text-gray-600 inter-tight-medium">
                    {t.yearsExperience}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 inter-tight-bold">
                    800+
                  </div>
                  <div className="text-sm text-gray-600 inter-tight-medium">
                    {t.happyCustomers}
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
              {t.ourMission}
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl lg:text-2xl text-white inter-tight-medium leading-relaxed">
                {t.ourMissionText}
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
              {t.experienceExpertise}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedDelay className="text-center space-y-4 p-6 bg-gray-50 rounded-xl">
                <CalendarIcon
                  className="w-12 h-12 text-blue-600 mx-auto"
                  fill="currentColor"
                />
                <h3 className="text-xl font-bold text-gray-900 inter-tight-bold">
                  {t.yearsInBusiness}
                </h3>
                <p className="text-gray-600 inter-tight-regular">
                  {t.yearsInBusinessText}
                </p>
              </AnimatedDelay>

              <AnimatedDelay className="text-center space-y-4 p-6 bg-gray-50 rounded-xl">
                <AwardIcon
                  className="w-12 h-12 text-blue-600 mx-auto"
                  fill="currentColor"
                />
                <h3 className="text-xl font-bold text-gray-900 inter-tight-bold">
                  {t.specialized}
                </h3>
                <p className="text-gray-600 inter-tight-regular">
                  {t.specializedText}
                </p>
              </AnimatedDelay>

              <AnimatedDelay className="text-center space-y-4 p-6 bg-gray-50 rounded-xl">
                <CheckIcon
                  className="w-12 h-12 text-blue-600 mx-auto"
                  fill="currentColor"
                />
                <h3 className="text-xl font-bold text-gray-900 inter-tight-bold">
                  {t.premiumQuality}
                </h3>
                <p className="text-gray-600 inter-tight-regular">
                  {t.premiumQualityText}
                </p>
              </AnimatedDelay>
            </div>

            {/* Specializations */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 inter-tight-bold mb-2">
                {t.ourCoreServices}
              </h3>
              <p className="text-gray-600 text-xs inter-tight-light mb-8">
                {t.photosReference}
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
                      {t.luxuryVinylInstallation}
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
                      {t.baseboardRefinishing}
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
                      {t.floorRefinishing}
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
                      {t.stairRemodeling}
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
                      {t.carpetRemoval}
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
              {t.ourWorkSpeaks}
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
                      {t.curved}
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
                      {t.twoBlock}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold mb-2">
                    {t.stairProjectsChino}
                  </h3>
                  <p className="text-gray-600 inter-tight-regular">
                    {
                      t.stairProjectsChinoText?.split(
                        "Total project timeline:"
                      )[0]
                    }
                    <span className="inter-tight-medium">
                      Total project timeline:
                      {
                        t.stairProjectsChinoText?.split(
                          "Total project timeline:"
                        )[1]
                      }
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
                      {t.luxVinyl}
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
                      {t.luxVinyl}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold mb-2">
                    {t.fullServiceWalnut}
                  </h3>
                  <p className="text-gray-600 inter-tight-regular">
                    {
                      t.fullServiceWalnutText?.split(
                        "Total project timeline:"
                      )[0]
                    }
                    <span className="inter-tight-medium">
                      Total project timeline:
                      {
                        t.fullServiceWalnutText?.split(
                          "Total project timeline:"
                        )[1]
                      }
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
                  {t.committedCommunity}
                </h2>
              </div>

              <div className="space-y-4 text-lg text-gray-600 inter-tight-regular">
                <p>{t.committedCommunityText}</p>
              </div>

              {/* Areas served */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 inter-tight-bold">
                  {t.topAreas}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      {t.chinoHillsAbout}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      {t.rowlandHeightsAbout}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      {t.walnutAbout}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      {t.chinoAbout}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      {t.arcadiaAbout}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      {t.irvineAbout}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      {t.elMonteAbout}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                    />
                    <span className="text-gray-700 inter-tight-medium">
                      {t.alhambraAbout}
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
                    {t.community}
                  </h3>
                  <p className="text-sm inter-tight-regular">
                    {t.communityText}
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
      <section className="py-16 lg:py-24 bg-blue-600">
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
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg inter-tight-bold hover:bg-blue-400 transition-colors duration-200 shadow-lg"
              >
                <PhoneIcon className="w-5 h-5" fill="currentColor" />
                <span>{t.callNow}</span>
              </a>
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
