import { useEffect, useRef } from "react";

export const usePageAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const areasRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial styles for individual elements immediately
    const setInitialStyles = () => {
      if (heroRef.current) {
        heroRef.current.style.opacity = "0";
        heroRef.current.style.transform = "translateY(20px)";
      }

      const elementsToObserve = [
        servicesRef.current,
        testimonialsRef.current,
        areasRef.current,
        ctaRef.current,
      ].filter(Boolean);

      elementsToObserve.forEach((el) => {
        if (el) {
          (el as HTMLElement).style.opacity = "0";
          (el as HTMLElement).style.transform = "translateY(30px)";
        }
      });
    };

    // Apply initial styles immediately
    setInitialStyles();

    // Show the container and start animations
    const startAnimations = () => {
      if (containerRef.current) {
        containerRef.current.style.transition = "opacity 0.3s ease-out";
        containerRef.current.style.opacity = "1";
      }
    };

    // Start animations after a brief delay
    const containerTimer = setTimeout(startAnimations, 100);

    // Hero section fade/slide in animation
    const heroTimer = setTimeout(() => {
      if (heroRef.current) {
        heroRef.current.style.transition =
          "opacity 0.8s ease-out, transform 0.8s ease-out";
        heroRef.current.style.opacity = "1";
        heroRef.current.style.transform = "translateY(0)";
      }
    }, 200);

    // Scroll reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.transition =
            "opacity 0.6s ease-out, transform 0.6s ease-out";
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Observe elements for scroll reveal
    const elementsToObserve = [
      servicesRef.current,
      testimonialsRef.current,
      areasRef.current,
      ctaRef.current,
    ].filter(Boolean);

    elementsToObserve.forEach((el) => {
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      clearTimeout(containerTimer);
      clearTimeout(heroTimer);
      observer.disconnect();
    };
  }, []);

  return {
    containerRef,
    heroRef,
    servicesRef,
    testimonialsRef,
    areasRef,
    ctaRef,
  };
};
