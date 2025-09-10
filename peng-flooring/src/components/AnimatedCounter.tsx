"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface AnimatedCounterProps {
  endValue: number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  endValue,
  duration = 4000,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeInOutQuart =
        progress < 0.5
          ? 8 * progress * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 4) / 2;
      const currentCount = Math.floor(easeInOutQuart * endValue);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, endValue, duration]);

  return (
    <div
      ref={counterRef}
      className={`text-center py-16 bg-gradient-to-br from-blue-50 to-indigo-50 ${className}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-2xl shadow-xl p-8 md:p-12 ">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white inter-tight-medium mb-4">
            {t.weHaveHelpedOver}
          </h3>
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-blue-600 inter-tight-bold mb-4">
            {count.toLocaleString()}
          </div>
          <p className="text-xl md:text-2xl text-white inter-tight-medium">
            {t.satisfiedCustomers}
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex items-center space-x-2 text-sm text-gray-500 inter-tight-regular">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white inter-tight-light">
                {t.trustedByFamilies}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
