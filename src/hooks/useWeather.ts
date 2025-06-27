import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setWeather,
  setForecast,
  setLoading,
  setError,
} from "@/store/weatherSlice";
import { WeatherData, ForecastData, WeatherAPIResponse } from "@/types/weather";
import React from "react";

// API fonksiyonu
const fetchWeatherData = async (city: string) => {
  if (!city.trim()) throw new Error("Şehir adı gerekli");

  const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Hava durumu verisi alınamadı");
  }

  return data;
};

// Veri dönüştürme fonksiyonları
const transformWeatherData = (data: {
  current: WeatherAPIResponse;
}): WeatherData => {
  const currentData = data.current as WeatherAPIResponse;
  return {
    city: currentData.location.name,
    country: currentData.location.country,
    temperature: Math.round(currentData.current.temp_c),
    temperatureF: Math.round(currentData.current.temp_f),
    condition: currentData.current.condition.text,
    icon: currentData.current.condition.icon,
    humidity: currentData.current.humidity,
    windSpeed: Math.round(currentData.current.wind_kph),
    feelsLike: Math.round(currentData.current.feelslike_c),
    feelsLikeF: Math.round(currentData.current.feelslike_f),
    uv: currentData.current.uv,
    visibility: currentData.current.vis_km,
  };
};

const transformForecastData = (data: {
  forecast: WeatherAPIResponse;
}): ForecastData => {
  const forecastData = data.forecast as WeatherAPIResponse;
  return {
    city: forecastData.location.name,
    country: forecastData.location.country,
    list: forecastData.forecast.forecastday.map((day) => ({
      date: day.date,
      temperature: Math.round(day.day.avgtemp_c),
      temperatureF: Math.round(day.day.avgtemp_f),
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
      maxTemp: Math.round(day.day.maxtemp_c),
      maxTempF: Math.round(day.day.maxtemp_f),
      minTemp: Math.round(day.day.mintemp_c),
      minTempF: Math.round(day.day.mintemp_f),
      chanceOfRain: day.day.daily_chance_of_rain,
    })),
  };
};

export const useWeather = (city: string) => {
  const dispatch = useAppDispatch();
  const { weather, forecast, loading, error } = useAppSelector(
    (state) => state.weather
  );

  const {
    data,
    isLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeatherData(city),
    enabled: !!city.trim(),
    staleTime: 5 * 60 * 1000, // 5 dakika
    gcTime: 10 * 60 * 1000, // 10 dakika
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // React Query'den gelen verileri RTK store'a senkronize et
  React.useEffect(() => {
    if (data) {
      const weatherData = transformWeatherData(data);
      const forecastData = transformForecastData(data);

      dispatch(setWeather(weatherData));
      dispatch(setForecast(forecastData));
      dispatch(setError(null));
    }
  }, [data, dispatch]);

  // Loading state'ini senkronize et
  React.useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  // Error state'ini senkronize et
  React.useEffect(() => {
    if (queryError) {
      const errorMessage =
        queryError instanceof Error
          ? queryError.message
          : "Bilinmeyen hata oluştu";
      dispatch(setError(errorMessage));
    }
  }, [queryError, dispatch]);

  const fetchWeather = React.useCallback(() => {
    if (city.trim()) {
      refetch();
    }
  }, [city, refetch]);

  return {
    weather,
    forecast,
    loading,
    error,
    fetchWeather,
    refetch,
  };
};
