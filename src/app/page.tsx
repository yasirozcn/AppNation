"use client";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { useWeather } from "@/hooks/useWeather";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import UnitToggle from "@/components/UnitToggle";
import WeatherAnimations from "@/components/WeatherAnimations";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("");
  const { weather, forecast, unit, loading, error, showAnimation } =
    useAppSelector((state) => state.weather);

  // React Query ile hava durumu verilerini al
  useWeather(selectedCity);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
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
            Hava Durumu
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Dashboard
            </span>
          </h1>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Dünyanın herhangi bir şehrinin güncel hava durumu ve 5 günlük
            tahminini görüntüleyin
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
            <p className="mt-2 text-black">
              Hava durumu bilgileri yükleniyor...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
              <p className="font-bold">Hata!</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Weather Display */}
        {weather && !loading && !error && (
          <div className="mt-8">
            <WeatherCard data={weather} unit={unit} />
            {forecast && <ForecastCard data={forecast} unit={unit} />}
          </div>
        )}

        {/* Welcome State */}
        {!weather && !loading && !error && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🌤️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Hava Durumunu Keşfedin
              </h2>
              <p className="text-black">
                Yukarıdaki arama çubuğuna bir şehir adı yazarak hava durumu
                bilgilerini görüntüleyin
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
