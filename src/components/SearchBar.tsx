"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addHistory, setHistory } from "@/store/weatherSlice";

interface SearchBarProps {
  onCitySelect: (city: string) => void;
}

export default function SearchBar({ onCitySelect }: SearchBarProps) {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.weather);

  useEffect(() => {
    const stored = localStorage.getItem("weather-history");
    if (stored) {
      dispatch(setHistory(JSON.parse(stored)));
    }
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const city = input.trim();
    dispatch(addHistory(city));
    setInput("");
    onCitySelect(city);
  };

  const handleHistoryClick = async (city: string) => {
    dispatch(addHistory(city));
    onCitySelect(city);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Şehir adı girin..."
          className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-black"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
        >
          Ara
        </button>
      </form>
      {history.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {history.map((city) => (
            <button
              key={city}
              onClick={() => handleHistoryClick(city)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-blue-100 text-sm transition-colors text-black"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
