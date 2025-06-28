import { ForecastData } from "@/types/weather";

interface Props {
  data: ForecastData;
  unit: "metric" | "imperial";
}

export default function ForecastCard({ data, unit }: Props) {
  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <h3 className="text-xl font-bold mb-4 text-center text-black">
        5 Günlük Tahmin
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {data.list.map((item) => (
          <div
            key={item.date}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
          >
            <div className="font-semibold mb-1 text-center text-black">
              {new Date(item.date).toLocaleDateString("tr-TR", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </div>
            <img
              src={`https:${item.icon}`}
              alt={item.condition}
              className="w-10 h-10 mb-1"
            />
            <div className="text-lg font-bold text-black transition-all duration-400">
              {unit === "metric"
                ? `${item.temperature}°C`
                : `${item.temperatureF}°F`}
            </div>
            <div className="text-xs text-black text-center mb-1 transition-all duration-400">
              {item.condition}
            </div>
            <div className="text-xs text-black text-center transition-all duration-400">
              {unit === "metric"
                ? `${item.minTemp}° / ${item.maxTemp}°`
                : `${item.minTempF}° / ${item.maxTempF}°`}
            </div>
            {item.chanceOfRain > 0 && (
              <div className="text-xs text-blue-500 mt-1 transition-all duration-400">
                Yağış: %{item.chanceOfRain}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
