import Image from "next/image";
import { WeatherData } from "@/types/weather";

interface Props {
  data: WeatherData;
  unit: "metric" | "imperial";
}

export default function WeatherCard({ data, unit }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center max-w-sm mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl font-bold text-black">
          {data.city}, {data.country}
        </span>
        <Image
          src={`https:${data.icon}`}
          alt={data.condition}
          width={48}
          height={48}
          className="w-12 h-12"
          priority
          unoptimized // Weather API icons are already optimized
        />
      </div>
      <div className="text-5xl font-extrabold mb-2 text-black">
        {unit === "metric" ? `${data.temperature}°C` : `${data.temperatureF}°F`}
      </div>
      <div className="text-lg text-black mb-2">{data.condition}</div>
      <div className="text-sm text-black mb-4">
        Feels like:{" "}
        {unit === "metric" ? `${data.feelsLike}°C` : `${data.feelsLikeF}°F`}
      </div>
      <div className="grid grid-cols-2 gap-6 text-black text-sm">
        <div>
          Humidity: <span className="font-semibold">{data.humidity}%</span>
        </div>
        <div>
          Wind: <span className="font-semibold">{data.windSpeed} km/h</span>
        </div>
        <div>
          UV: <span className="font-semibold">{data.uv}</span>
        </div>
        <div>
          Visibility:{" "}
          <span className="font-semibold">{data.visibility} km</span>
        </div>
      </div>
    </div>
  );
}
