"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUnit } from "@/store/weatherSlice";

export default function UnitToggle() {
  const dispatch = useAppDispatch();
  const { unit } = useAppSelector((state) => state.weather);

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        className={`px-3 py-1 rounded-l cursor-pointer transition-all duration-300 ${
          unit === "metric"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700"
        }`}
        onClick={() => dispatch(setUnit("metric"))}
      >
        °C
      </button>
      <button
        className={`px-3 py-1 rounded-r cursor-pointer transition-all duration-300 ${
          unit === "imperial"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700"
        }`}
        onClick={() => dispatch(setUnit("imperial"))}
      >
        °F
      </button>
    </div>
  );
}
