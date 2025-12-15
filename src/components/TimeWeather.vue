<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Refresh } from "@icon-park/vue-next";
import { useWeatherStore } from "../store/weather";

const weatherStore = useWeatherStore();

// 时间显示
const currentTime = ref("");
const currentDate = ref("");

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  currentDate.value = now.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

let timer: number;

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
  weatherStore.init();
});

onUnmounted(() => {
  clearInterval(timer);
});

// 刷新天气
const refreshWeather = () => {
  weatherStore.fetchWeather();
};
</script>

<template>
  <div class="time-weather glass-card">
    <!-- 时间 -->
    <div class="time-section">
      <div class="time">{{ currentTime }}</div>
      <div class="date">{{ currentDate }}</div>
    </div>

    <!-- 天气 -->
    <div class="weather-section">
      <template v-if="weatherStore.weatherData">
        <span class="city">{{ weatherStore.weatherData.city }}</span>
        <span class="temp">{{ weatherStore.weatherData.temp }}°C</span>
        <span class="text">{{ weatherStore.weatherData.text }}</span>
      </template>
      <template v-else-if="weatherStore.loading">
        <span class="loading">加载中...</span>
      </template>
      <template v-else>
        <span class="error">天气获取失败</span>
      </template>

      <!-- 刷新按钮 -->
      <button
        class="refresh-btn"
        @click="refreshWeather"
        :disabled="weatherStore.loading"
        title="刷新天气"
      >
        <Refresh :spin="weatherStore.loading" size="16" fill="#fff" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.time-weather {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-light);
  animation: fade-in 0.6s ease forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

.time-section {
  .time {
    font-size: 1.5rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .date {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-top: 0.25rem;
  }
}

.weather-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  .city {
    color: var(--text-muted);
  }

  .temp {
    font-weight: 600;
  }

  .text {
    color: var(--text-muted);
  }

  .loading,
  .error {
    color: var(--text-muted);
  }
}

.refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>