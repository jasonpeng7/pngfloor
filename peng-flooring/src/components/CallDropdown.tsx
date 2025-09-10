"use client";

import { useState, useRef, useEffect } from "react";
import { PhoneIcon } from "./icons";
import { useLanguage } from "../contexts/LanguageContext";

interface CallDropdownProps {
  className?: string;
  variant?: "default" | "white";
}

export default function CallDropdown({
  className = "",
  variant = "default",
}: CallDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const buttonClasses =
    variant === "white"
      ? "border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg text-lg inter-tight-semibold transition-colors flex items-center justify-center"
      : "border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-bold py-4 px-8 rounded-lg text-lg inter-tight-semibold transition-colors flex items-center justify-center";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button onClick={toggleDropdown} className={buttonClasses}>
        <PhoneIcon className="w-5 h-5 mr-2 " />
        {t.callNow}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="py-2">
            {/* English Option */}
            <a
              href="tel:+16265407720"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm inter-tight-bold">
                    EN
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start ml-3">
                <p className="text-sm font-medium text-gray-900 inter-tight-medium">
                  {t.english}
                </p>
                <p className="text-xs text-gray-500 inter-tight-regular">
                  (626) 540-7720
                </p>
              </div>
            </a>

            {/* Chinese Option */}
            <a
              href="tel:+16268257815"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm inter-tight-bold">
                    中
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start ml-3">
                <p className="text-sm font-medium text-gray-900 inter-tight-medium">
                  {t.chinese}
                </p>
                <p className="text-xs text-gray-500 inter-tight-regular">
                  (626) 825-7815
                </p>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
