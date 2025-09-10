"use client";

import { useState } from "react";
import {
  BookingFormIcon,
  ReviewEstimateIcon,
  SiteVisitIcon,
  StartProjectIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./icons";
import { useLanguage } from "../contexts/LanguageContext";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface BookingStepsProps {
  className?: string;
}

export default function BookingSteps({ className = "" }: BookingStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useLanguage();

  const steps: Step[] = [
    {
      number: 1,
      title: t.bookingStep1Title,
      description: t.bookingStep1Description,
      icon: <BookingFormIcon />,
    },
    {
      number: 2,
      title: t.bookingStep2Title,
      description: t.bookingStep2Description,
      icon: <ReviewEstimateIcon />,
    },
    {
      number: 3,
      title: t.bookingStep3Title,
      description: t.bookingStep3Description,
      icon: <SiteVisitIcon />,
    },
    {
      number: 4,
      title: t.bookingStep4Title,
      description: t.bookingStep4Description,
      icon: <StartProjectIcon />,
    },
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <section className={`py-16 bg-[#222222] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white inter-tight-bold mb-4">
            {t.howItWorks}
          </h2>
          <p className="text-lg text-white inter-tight-medium max-w-3xl mx-auto">
            {t.howItWorksSubtitle}
          </p>
        </div>

        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden lg:grid grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-black p-6 text-center hover:shadow-md transition-shadow duration-300 relative"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-blue-600">{step.icon}</div>
              </div>

              {/* Step Number */}
              <div className="text-sm font-semibold text-blue-600 inter-tight-semibold mb-2">
                {t.step} {step.number.toString().padStart(2, "0")}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white inter-tight-semibold mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-white inter-tight-regular text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Carousel - Hidden on desktop */}
        <div className="lg:hidden">
          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevStep}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 -ml-2"
              aria-label="Previous step"
            >
              <ChevronLeftIcon />
            </button>

            <button
              onClick={nextStep}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 -mr-2"
              aria-label="Next step"
            >
              <ChevronRightIcon />
            </button>

            {/* Carousel Content */}
            <div className="overflow-hidden mx-8">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentStep * 100}%)` }}
              >
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="w-full flex-shrink-0 bg-black p-6 text-center"
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-blue-600">{step.icon}</div>
                    </div>

                    {/* Step Number */}
                    <div className="text-sm font-semibold text-blue-600 inter-tight-semibold mb-2">
                      {t.step} {step.number.toString().padStart(2, "0")}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white inter-tight-semibold mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white inter-tight-regular text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentStep
                      ? "bg-blue-600"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
