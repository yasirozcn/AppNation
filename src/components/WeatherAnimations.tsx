"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { hideAnimation } from "@/store/weatherSlice";

interface Props {
  condition: string;
  isVisible: boolean;
}

export default function WeatherAnimations({ condition, isVisible }: Props) {
  const dispatch = useAppDispatch();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsExiting(false);
      // Hide animation after 4 seconds
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          dispatch(hideAnimation());
        }, 600); // fadeOut animation duration
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  const conditionLower = condition.toLowerCase();

  // Rain animation
  if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
    return (
      <div
        className={`fixed inset-0 pointer-events-none z-10 transition-all duration-600 ${
          isExiting ? "animate-fade-out" : "animate-fade-in"
        }`}
      >
        <div className="absolute inset-0 bg-blue-200 opacity-20 transition-opacity duration-500"></div>
        {[...Array(30)].map((_, i) => (
          <svg
            key={i}
            className="absolute w-4 h-6 text-blue-400 opacity-60 animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 100}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.8 + Math.random() * 0.8}s`,
            }}
          >
            <use href="/weather-icons.svg#raindrop-icon" />
          </svg>
        ))}
      </div>
    );
  }

  // Wind animation
  if (conditionLower.includes("wind") || conditionLower.includes("breeze")) {
    return (
      <div
        className={`fixed inset-0 pointer-events-none z-10 transition-all duration-600 ${
          isExiting ? "animate-fade-out" : "animate-fade-in"
        }`}
      >
        <div className="absolute inset-0 bg-gray-200 opacity-10 transition-opacity duration-500"></div>
        {[...Array(15)].map((_, i) => (
          <svg
            key={i}
            className="absolute w-8 h-8 text-gray-400 opacity-40 animate-wind"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <use href="/weather-icons.svg#wind-icon" />
          </svg>
        ))}
      </div>
    );
  }

  // Sun animation
  if (conditionLower.includes("sun") || conditionLower.includes("clear")) {
    return (
      <div
        className={`fixed inset-0 pointer-events-none z-10 transition-all duration-600 ${
          isExiting ? "animate-fade-out" : "animate-fade-in"
        }`}
      >
        <div className="absolute inset-0 bg-yellow-200 opacity-10 transition-opacity duration-500"></div>

        {/* Main sun - smaller on mobile */}
        <svg className="absolute top-1/4 left-1/4 w-16 h-16 md:w-24 md:h-24 text-yellow-400 animate-sun-rays opacity-60">
          <use href="/weather-icons.svg#sun-icon" />
        </svg>

        {/* Second sun - only shown on tablet and above */}
        <svg
          className="hidden md:block absolute top-1/3 right-1/4 w-20 h-20 text-yellow-300 animate-bounce opacity-40"
          style={{ animationDelay: "0.5s", animationDuration: "2s" }}
        >
          <use href="/weather-icons.svg#sun-icon" />
        </svg>

        {/* Third sun - only shown on desktop */}
        <svg
          className="hidden lg:block absolute bottom-1/4 left-1/3 w-12 h-12 text-yellow-500 animate-ping opacity-30"
          style={{ animationDelay: "1s", animationDuration: "3s" }}
        >
          <use href="/weather-icons.svg#sun-icon" />
        </svg>

        {/* Additional sun rays for mobile */}
        <svg className="md:hidden absolute top-1/3 right-1/4 w-10 h-10 text-yellow-300 animate-pulse opacity-30">
          <use href="/weather-icons.svg#sun-icon" />
        </svg>
      </div>
    );
  }

  // Snow animation
  if (conditionLower.includes("snow")) {
    return (
      <div
        className={`fixed inset-0 pointer-events-none z-10 transition-all duration-600 ${
          isExiting ? "animate-fade-out" : "animate-fade-in"
        }`}
      >
        <div className="absolute inset-0 bg-blue-100 opacity-20 transition-opacity duration-500"></div>
        {[...Array(25)].map((_, i) => (
          <svg
            key={i}
            className="absolute w-4 h-4 text-white opacity-80 animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <use href="/weather-icons.svg#snowflake-icon" />
          </svg>
        ))}
      </div>
    );
  }

  // Cloud animation
  if (conditionLower.includes("cloud") || conditionLower.includes("overcast")) {
    return (
      <div
        className={`fixed inset-0 pointer-events-none z-10 transition-all duration-600 ${
          isExiting ? "animate-fade-out" : "animate-fade-in"
        }`}
      >
        <div className="absolute inset-0 bg-gray-200 opacity-10 transition-opacity duration-500"></div>

        {/* Main cloud */}
        <svg className="absolute top-1/4 left-1/4 w-24 h-16 text-gray-300 animate-float opacity-40">
          <use href="/weather-icons.svg#cloud-icon" />
        </svg>

        {/* Second cloud - only on tablet and above */}
        <svg
          className="hidden md:block absolute top-1/3 right-1/4 w-20 h-14 text-gray-400 animate-float opacity-30"
          style={{ animationDelay: "1s", animationDuration: "8s" }}
        >
          <use href="/weather-icons.svg#cloud-icon" />
        </svg>

        {/* Third cloud - only on desktop */}
        <svg
          className="hidden lg:block absolute bottom-1/4 left-1/3 w-28 h-18 text-gray-300 animate-float opacity-35"
          style={{ animationDelay: "0.5s", animationDuration: "10s" }}
        >
          <use href="/weather-icons.svg#cloud-icon" />
        </svg>

        {/* Additional cloud for mobile */}
        <svg
          className="md:hidden absolute bottom-1/4 right-1/4 w-16 h-12 text-gray-400 animate-float opacity-25"
          style={{ animationDelay: "0.5s", animationDuration: "6s" }}
        >
          <use href="/weather-icons.svg#cloud-icon" />
        </svg>
      </div>
    );
  }

  return null;
}
