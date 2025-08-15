import {
  TrashIcon,
  PaintBrushIcon,
  HammerIcon,
  RulerIcon,
  SparklesIcon,
  BroomIcon,
  CheckIcon,
} from "./icons";

const steps = [
  {
    number: "01",
    title: "Carpet/Baseboard Removal",
    description:
      "Carefully remove existing carpet and baseboards to prepare the surface",
    icon: TrashIcon,
  },
  {
    number: "02",
    title: "Prime Floor",
    description:
      "Clean/smoothe floor + apply primer sheet to protect from water/heat damage",
    icon: PaintBrushIcon,
  },
  {
    number: "03",
    title: "Install Flooring",
    description: "Professional installation of your chosen flooring material",
    icon: HammerIcon,
  },
  {
    number: "04",
    title: "Install Baseboard",
    description: "Install and finish baseboards for the complete look",
    icon: RulerIcon,
  },
  {
    number: "05",
    title: "Finishing Touches",
    description: "Add final details and ensure everything is perfect",
    icon: SparklesIcon,
  },
  {
    number: "06",
    title: "Clean",
    description: "Thorough cleanup leaving your space spotless!",
    icon: BroomIcon,
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <p className="text-gray-600 inter-tight-regular">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
