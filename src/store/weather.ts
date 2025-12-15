import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

// 天气类型枚举
export type WeatherType = "sunny" | "cloudy" | "rainy" | "snowy";

// 天气代码映射
const getWeatherType = (code: number): WeatherType => {
  if (code === 800) return "sunny";
  if (code >= 801 && code <= 804) return "cloudy";
  if (
    (code >= 200 && code <= 599) ||
    (code >= 300 && code <= 399) ||
    (code >= 500 && code <= 599)
  )
    return "rainy";
  if (code >= 600 && code <= 699) return "snowy";
  if (code >= 700 && code <= 799) return "cloudy";
  return "sunny"; // 默认晴天
};

export const useWeatherStore = defineStore("weather", () => {
  // 状态
  const weatherData = ref<{
    city: string;
    temp: number;
    text: string;
    code: number;
    isDay: boolean;
  } | null>(null);

  const loading = ref(false);
  const error = ref<string | null>(null);
  const autoTheme = ref(true); // 天气自动调节开关
  const manualTheme = ref<string>("#4a9eff"); // 手动选择的主题色

  // 计算属性
  const weatherType = computed<WeatherType>(() => {
    if (!weatherData.value) return "sunny";
    return getWeatherType(weatherData.value.code);
  });

  // 根据天气获取主题色
  const themeColor = computed(() => {
    if (!autoTheme.value) return manualTheme.value;

    const themeMap: Record<WeatherType, string> = {
      sunny: "#ff9500",
      cloudy: "#8e8e93",
      rainy: "#5ac8fa",
      snowy: "#e5e5ea",
    };
    return themeMap[weatherType.value] || "#4a9eff";
  });

  // 获取天气数据
  const fetchWeather = async (city: string = "Shanghai") => {
    loading.value = true;
    error.value = null;

    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || "";
      if (!apiKey) {
        throw new Error("未配置 VITE_OPENWEATHER_API_KEY");
      }

      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: city,
            appid: apiKey,
            units: "metric",
            lang: "zh_cn",
          },
        }
      );

      const data = response.data;
      const now = Number(data.dt) || 0;
      const sunrise = Number(data.sys?.sunrise) || 0;
      const sunset = Number(data.sys?.sunset) || 0;

      weatherData.value = {
        city: data.name,
        temp: data.main?.temp,
        text: data.weather?.[0]?.description,
        code: data.weather?.[0]?.id,
        isDay: sunrise && sunset ? now >= sunrise && now < sunset : true,
      };

      // 缓存数据
      localStorage.setItem(
        "weatherCache",
        JSON.stringify({
          data: weatherData.value,
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      console.error("天气获取失败:", err);
      error.value = "天气数据获取失败";

      // 尝试使用缓存
      const cache = localStorage.getItem("weatherCache");
      if (cache) {
        const { data } = JSON.parse(cache);
        weatherData.value = data;
      }
    } finally {
      loading.value = false;
    }
  };

  // 切换自动主题
  const toggleAutoTheme = () => {
    autoTheme.value = !autoTheme.value;
    localStorage.setItem("autoTheme", String(autoTheme.value));
  };

  // 设置手动主题色
  const setManualTheme = (color: string) => {
    manualTheme.value = color;
    localStorage.setItem("manualTheme", color);
  };

  // 初始化
  const init = () => {
    // 恢复设置
    const savedAutoTheme = localStorage.getItem("autoTheme");
    if (savedAutoTheme !== null) {
      autoTheme.value = savedAutoTheme === "true";
    }

    const savedManualTheme = localStorage.getItem("manualTheme");
    if (savedManualTheme) {
      manualTheme.value = savedManualTheme;
    }

    // 获取天气
    fetchWeather();
  };

  return {
    weatherData,
    loading,
    error,
    autoTheme,
    manualTheme,
    weatherType,
    themeColor,
    fetchWeather,
    toggleAutoTheme,
    setManualTheme,
    init,
  };
});