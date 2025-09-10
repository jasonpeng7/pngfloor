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

const steps = [
  {
    number: "01",
    title: "Carpet/Baseboard Removal",
    description:
      "Carefully remove existing carpet or flooring and baseboards to prepare the surface for underlayment",
    icon: TrashIcon,
    timeFrame: "1-2 days",
  },
  {
    number: "02",
    title: "Prime Floor",
    description:
      "Clean/smoothe floor + apply underlayment to protect from water/heat damage",
    icon: PaintBrushIcon,
    timeFrame: "1-2 days",
  },
  {
    number: "03",
    title: "Install Flooring",
    description: "Professional installation of your chosen flooring material",
    icon: HammerIcon,
    timeFrame: "3-5 days",
  },
  {
    number: "04",
    title: "Install Baseboard",
    description: "Install and touch up baseboards for the complete look",
    icon: RulerIcon,
    timeFrame: "2-3 days",
  },
  {
    number: "05",
    title: "Finishing Touches",
    description: "Add final details and ensure everything is perfect",
    icon: SparklesIcon,
    timeFrame: "Same day",
  },
  {
    number: "06",
    title: "Clean",
    description: "Thorough cleanup leaving your space spotless!",
    icon: BroomIcon,
    timeFrame: "Same day",
  },
];

export default function StepsShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-white inter-tight-bold">
            Our Process
          </h2>
          <div className="flex items-start space-x-2 max-w-3xl mx-auto">
            <CheckIcon
              className="w-10 h-10 text-green-500 mt-1 flex-shrink-0"
              fill="currentColor"
            />
            <p className="text-xl text-white inter-tight-medium">
              We follow a 6-step process to ensure your flooring installation is
              done right, on time, and with the highest quality standards.
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
                    Timeframe: {step.timeFrame}
                  </p>
                  <p className="text-gray-600 inter-tight-regular text-xs">
                    *Exact time frame depends on the size of the project
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
                        Timeframe: {step.timeFrame}
                      </p>
                      <p className="text-gray-600 inter-tight-regular text-xs">
                        *Exact time frame depends on the size of the project
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll/Swipe Hint */}
            <div className="mt-4 flex justify-center items-center text-gray-400">
              <span className="text-sm font-semibold inter-tight-medium">
                Swipe to see next step
              </span>
              <ChevronRightIcon className="w-5 h-5 ml-1 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
