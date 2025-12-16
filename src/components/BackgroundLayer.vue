<script setup lang="ts">
import { computed } from "vue";
import { useWeatherStore } from "../store/weather";

const weatherStore = useWeatherStore();

// 根据暗黑模式计算背景样式
const backgroundStyle = computed(() => {
  if (weatherStore.darkMode) {
    // 黑夜背景：深色渐变
    return {
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
    };
  } else {
    // 白天背景：浅色渐变
    return {
      background: "linear-gradient(135deg, #e8f4f8 0%, #d4e8ed 50%, #c9dfe6 100%)",
    };
  }
});
</script>

<template>
  <div class="background-layer" :style="backgroundStyle"></div>
</template>

<style lang="scss" scoped>
.background-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  transition: background 0.5s ease;
}
</style>
