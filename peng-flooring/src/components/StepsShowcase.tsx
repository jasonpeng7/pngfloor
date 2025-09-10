"use client";

import {
  TrashIcon,
  PaintBrushIcon,
  HammerIcon,
  RulerIcon,
  SparklesIcon,
  BroomIcon,
  CheckIcon,
  ChevronRightIcon,
} from "./icons";
import { useLanguage } from "../contexts/LanguageContext";

export default function StepsShowcase() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t.step1Title,
      description: t.step1Description,
      icon: TrashIcon,
      timeFrame: t.step1Time,
    },
    {
      number: "02",
      title: t.step2Title,
      description: t.step2Description,
      icon: PaintBrushIcon,
      timeFrame: t.step2Time,
    },
    {
      number: "03",
      title: t.step3Title,
      description: t.step3Description,
      icon: HammerIcon,
      timeFrame: t.step3Time,
    },
    {
      number: "04",
      title: t.step4Title,
      description: t.step4Description,
      icon: RulerIcon,
      timeFrame: t.step4Time,
    },
    {
      number: "05",
      title: t.step5Title,
      description: t.step5Description,
      icon: SparklesIcon,
      timeFrame: t.step5Time,
    },
    {
      number: "06",
      title: t.step6Title,
      description: t.step6Description,
      icon: BroomIcon,
      timeFrame: t.step6Time,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-white inter-tight-bold">
            {t.ourProcess}
          </h2>
          <div className="flex items-start space-x-2 max-w-3xl mx-auto">
            <CheckIcon
              className="w-10 h-10 text-green-500 mt-1 flex-shrink-0"
              fill="currentColor"
            />
            <p className="text-xl text-white inter-tight-medium">
              {t.ourProcessText}
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="bg-white p-8 ">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <IconComponent
                        className="w-8 h-8 text-blue-600"
                        fill="currentColor"
                      />
                    </div>
                    <div className="text-4xl font-bold text-gray-300 inter-tight-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="w-full h-px bg-gray-200 mb-6"></div>

                  <h3 className="text-xl font-bold text-gray-900 inter-tight-bold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 inter-tight-regular sm: mb-[5px] md:mb-[10px]">
                    {step.description}
                  </p>
                  <p className="text-gray-600 inter-tight-regular text-sm">
                    {t.timeframe}: {step.timeFrame}
                  </p>
                  <p className="text-gray-600 inter-tight-regular text-xs">
                    {t.timeframeNote}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mobile CSS Scroll Snap Carousel */}
          <div className="lg:hidden">
            <div
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 snap-center px-4 "
                  >
                    <div className="bg-white p-8 min-h-[375px]">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <IconComponent
                            className="w-8 h-8 text-blue-600"
                            fill="currentColor"
                          />
                        </div>
                        <div className="text-4xl font-bold text-gray-300 inter-tight-bold">
                          {step.number}
                        </div>
                      </div>
                      <div className="w-full h-px bg-gray-200 mb-6"></div>

                      <h3 className="text-xl font-bold text-gray-900 inter-tight-bold mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 inter-tight-regular sm: mb-[5px] md:mb-[10px]">
                        {step.description}
                      </p>
                      <p className="text-gray-600 inter-tight-regular text-sm">
                        {t.timeframe}: {step.timeFrame}
                      </p>
                      <p className="text-gray-600 inter-tight-regular text-xs">
                        {t.timeframeNote}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll/Swipe Hint */}
            <div className="mt-4 flex justify-center items-center text-gray-400">
              <span className="text-sm font-semibold inter-tight-medium">
                {t.swipeNext}
              </span>
              <ChevronRightIcon className="w-5 h-5 ml-1 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
