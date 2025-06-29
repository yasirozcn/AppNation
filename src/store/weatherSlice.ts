import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData, ForecastData } from "@/types/weather";

interface WeatherState {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  history: string[];
  unit: "metric" | "imperial";
  loading: boolean;
  error: string | null;
  showAnimation: boolean;
  backgroundColor: string | null;
}

const initialState: WeatherState = {
  weather: null,
  forecast: null,
  history: [],
  unit: "metric",
  loading: false,
  error: null,
  showAnimation: false,
  backgroundColor: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<WeatherData>) => {
      state.weather = action.payload;
      state.error = null;
      state.showAnimation = true;

      // Determine background color based on weather condition
      const condition = action.payload.condition.toLowerCase();
      if (condition.includes("rain") || condition.includes("drizzle")) {
        state.backgroundColor = "bg-blue-200";
      } else if (condition.includes("snow")) {
        state.backgroundColor = "bg-blue-100";
      } else if (condition.includes("clear") || condition.includes("sun")) {
        state.backgroundColor = "bg-yellow-50";
      } else if (
        condition.includes("cloud") ||
        condition.includes("overcast")
      ) {
        state.backgroundColor = "bg-gray-200";
      } else if (condition.includes("wind") || condition.includes("breeze")) {
        state.backgroundColor = "bg-gray-200";
      } else {
        state.backgroundColor = "bg-gray-50";
      }
    },
    setForecast: (state, action: PayloadAction<ForecastData>) => {
      state.forecast = action.payload;
    },
    addHistory: (state, action: PayloadAction<string>) => {
      const city = action.payload;
      state.history = [city, ...state.history.filter((c) => c !== city)].slice(
        0,
        5
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("weather-history", JSON.stringify(state.history));
      }
    },
    setHistory: (state, action: PayloadAction<string[]>) => {
      state.history = action.payload;
    },
    setUnit: (state, action: PayloadAction<"metric" | "imperial">) => {
      state.unit = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    hideAnimation: (state) => {
      state.showAnimation = false;
    },
    clearBackground: (state) => {
      state.backgroundColor = null;
    },
  },
});

export const {
  setWeather,
  setForecast,
  addHistory,
  setHistory,
  setUnit,
  setLoading,
  setError,
  hideAnimation,
  clearBackground,
} = weatherSlice.actions;

export default weatherSlice.reducer;
