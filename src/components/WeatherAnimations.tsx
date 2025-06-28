"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { hideAnimation } from "@/store/weatherSlice";

interface Props {
  condition: string;
  isVisible: boolean;
}

export default function WeatherAnimations({ condition, isVisible }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isVisible) {
      // 3 saniye sonra animasyonu gizle
      const timer = setTimeout(() => {
        dispatch(hideAnimation());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  const conditionLower = condition.toLowerCase();

  // Yağmur animasyonu
  if (
    conditionLower.includes("rain") ||
    conditionLower.includes("yağmur") ||
    conditionLower.includes("drizzle")
  ) {
    return (
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-blue-200 opacity-20"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-blue-400 opacity-60 animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    );
  }

  // Rüzgar animasyonu
  if (
    conditionLower.includes("wind") ||
    conditionLower.includes("rüzgar") ||
    conditionLower.includes("breeze")
  ) {
    return (
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gray-200 opacity-10"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-1 bg-gray-400 opacity-40 animate-wind"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    );
  }

  // Güneş animasyonu
  if (
    conditionLower.includes("sun") ||
    conditionLower.includes("güneş") ||
    conditionLower.includes("clear") ||
    conditionLower.includes("açık")
  ) {
    return (
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-yellow-200 opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-yellow-300 rounded-full animate-bounce opacity-40"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-yellow-500 rounded-full animate-ping opacity-30"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    );
  }

  // Kar animasyonu
  if (conditionLower.includes("snow") || conditionLower.includes("kar")) {
    return (
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-blue-100 opacity-20"></div>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    );
  }

  // Bulut animasyonu
  if (
    conditionLower.includes("cloud") ||
    conditionLower.includes("bulut") ||
    conditionLower.includes("overcast")
  ) {
    return (
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gray-200 opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-16 bg-gray-300 rounded-full opacity-40 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-24 h-12 bg-gray-400 rounded-full opacity-30 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-28 h-14 bg-gray-300 rounded-full opacity-35 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>
    );
  }

  return null;
}
