"use client";
import { useState, Suspense, lazy } from "react";
import { useAppSelector } from "@/store/hooks";
import { useWeather } from "@/hooks/useWeather";
import SearchBar from "@/components/SearchBar";
import UnitToggle from "@/components/UnitToggle";
import WeatherAnimations from "@/components/WeatherAnimations";

// Lazy load components that are not immediately visible
const WeatherCard = lazy(() => import("@/components/WeatherCard"));
const ForecastCard = lazy(() => import("@/components/ForecastCard"));

// Loading fallback component
const WeatherCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center max-w-sm mx-auto animate-pulse">
    <div className="flex items-center gap-3 mb-2">
      <div className="h-8 bg-gray-200 rounded w-32"></div>
      <div className="w-12 h-12 bg-gray-200 rounded"></div>
    </div>
    <div className="h-16 bg-gray-200 rounded w-24 mb-2"></div>
    <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
    <div className="grid grid-cols-2 gap-6 w-full">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded"></div>
      ))}
    </div>
  </div>
);

const ForecastCardSkeleton = () => (
  <div className="mt-8 max-w-4xl mx-auto">
    <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow p-4 flex flex-col items-center animate-pulse"
        >
          <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
          <div className="w-10 h-10 bg-gray-200 rounded mb-1"></div>
          <div className="h-6 bg-gray-200 rounded w-12 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("");
  const {
    weather,
    forecast,
    unit,
    loading,
    error,
    showAnimation,
    backgroundColor,
  } = useAppSelector((state) => state.weather);

  // Get weather data with React Query
  useWeather(selectedCity);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  // Determine background color
  const backgroundClass =
    backgroundColor || "bg-gradient-to-br from-blue-50 via-white to-purple-50";

  return (
    <div
      className={`min-h-screen ${backgroundClass} py-8 transition-all duration-1000`}
    >
      {/* Weather Animations */}
      {weather && showAnimation && (
        <WeatherAnimations
          condition={weather.condition}
          isVisible={showAnimation}
        />
      )}

      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Weather
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Dashboard
            </span>
          </h1>
          <p className="text-lg text-black max-w-2xl mx-auto">
            View current weather and 5-day forecast for any city in the world
          </p>
        </header>

        {/* Search Bar */}
        <SearchBar onCitySelect={handleCitySelect} />

        {/* Unit Toggle */}
        <UnitToggle />

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-black">Loading weather information...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
              <p className="font-bold">Error!</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Weather Display */}
        {weather && !loading && !error && (
          <div className="mt-8">
            <Suspense fallback={<WeatherCardSkeleton />}>
              <WeatherCard data={weather} unit={unit} />
            </Suspense>
            {forecast && (
              <Suspense fallback={<ForecastCardSkeleton />}>
                <ForecastCard data={forecast} unit={unit} />
              </Suspense>
            )}
          </div>
        )}

        {/* Welcome State */}
        {!weather && !loading && !error && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🌤️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Discover the Weather
              </h2>
              <p className="text-black">
                Enter a city name in the search bar above to view weather
                information
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
