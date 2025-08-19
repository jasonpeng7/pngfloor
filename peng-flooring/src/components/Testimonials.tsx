import { StarIcon } from "./icons";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Dewi H.",
    location: "Rowland Heights, CA",
    rating: 5,
    text: "Best work in the 626 area! He transformed our old floors into a very modern and sleek finish that completely elevated our home. Professional, timely, and honest pricing.",
    avatar: "D",
    avatarColor: "blue",
  },
  {
    id: 2,
    name: "Shuting L.",
    location: "Chino Hills, CA",
    rating: 5,
    text: "Speaks Chinese! We remodeled our hown with luxury vinyl, and it is absolutely beautiful. Our house was around 2000 sqft., single story, and it took him around 1½ week. Fair pricing, and extremely clean. Highly recommend!",
    avatar: "S",
    avatarColor: "green",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 inter-tight-bold">
            What Our Customers Say
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-4">
                  {testimonial.id === 1 ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/landing-page/dewi.jpg"
                        alt={`${testimonial.name} - Satisfied Customer`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-12 h-12 bg-${testimonial.avatarColor}-100 rounded-full flex items-center justify-center`}
                    >
                      <span
                        className={`text-${testimonial.avatarColor}-600 font-bold inter-tight-bold`}
                      >
                        {testimonial.avatar}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col items-start">
                    <p className="font-semibold text-gray-900 inter-tight-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 inter-tight-regular">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 inter-tight-regular italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Overall rating */}
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-8 h-8" fill="currentColor" />
                ))}
              </div>
              <div className="text-2xl font-bold text-gray-900 inter-tight-bold">
                4.9/5
              </div>
            </div>
            <p className="text-lg text-gray-700 inter-tight-medium">
              Average rating from{" "}
              <span className="font-bold text-blue-600">800+</span> satisfied
              customers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
