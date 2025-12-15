import axios from "axios";

// OpenWeatherMap 配置
const OPEN_WEATHER_BASE = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "";

export interface WeatherResponse {
  name: string;
  weather: Array<{
    id: number;
    description: string;
  }>;
  main: {
    temp: number;
  };
  dt: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
}

// 获取当前天气
export const getCurrentWeather = async (
  city: string
): Promise<WeatherResponse> => {
  const response = await axios.get(`${OPEN_WEATHER_BASE}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
      lang: "zh_cn",
    },
  });
  return response.data;
};