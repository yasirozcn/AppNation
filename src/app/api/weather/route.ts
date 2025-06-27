import { NextRequest, NextResponse } from "next/server";
import { WeatherAPIResponse } from "@/types/weather";

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1";

// Rate limiting için basit cache
const requestCache = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // 1 dakikada maksimum 10 istek
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 dakika

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRequests = requestCache.get(ip);

  if (!userRequests || now > userRequests.resetTime) {
    requestCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userRequests.count >= RATE_LIMIT) {
    return false;
  }

  userRequests.count++;
  return true;
}

export async function GET(request: NextRequest) {
  // Rate limiting kontrolü
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit aşıldı. Lütfen 1 dakika bekleyin." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { error: "Şehir parametresi gerekli" },
      { status: 400 }
    );
  }

  if (!API_KEY) {
    return NextResponse.json(
      { error: "API anahtarı bulunamadı" },
      { status: 500 }
    );
  }

  // Input validation
  const sanitizedCity = city.trim().slice(0, 100); // Maksimum 100 karakter
  if (!sanitizedCity) {
    return NextResponse.json({ error: "Geçersiz şehir adı" }, { status: 400 });
  }

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(
          sanitizedCity
        )}&aqi=no`,
        {
          headers: {
            "User-Agent": "AppNation-Weather-App/1.0",
          },
          next: {
            revalidate: 300, // 5 dakika cache
          },
        }
      ),
      fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
          sanitizedCity
        )}&days=5&aqi=no`,
        {
          headers: {
            "User-Agent": "AppNation-Weather-App/1.0",
          },
          next: {
            revalidate: 1800, // 30 dakika cache (forecast daha az sık değişir)
          },
        }
      ),
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      const errorData = await currentResponse.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error?.message || "Hava durumu verisi alınamadı" },
        { status: currentResponse.status }
      );
    }

    const currentData: WeatherAPIResponse = await currentResponse.json();
    const forecastData: WeatherAPIResponse = await forecastResponse.json();

    const response = NextResponse.json({
      current: currentData,
      forecast: forecastData,
    });

    // CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("Weather API Error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası oluştu" },
      { status: 500 }
    );
  }
}
