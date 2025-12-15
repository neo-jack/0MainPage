<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useWeatherStore } from "../store/weather";

const weatherStore = useWeatherStore();

// 背景图片列表（可替换为实际图片路径）
const bgImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920",
];

const currentBgIndex = ref(0);
const isLoaded = ref(false);

const backgroundUrl = computed(() => bgImages[currentBgIndex.value]);

// 遮罩颜色根据天气变化
const overlayStyle = computed(() => {
  const colorMap: Record<string, string> = {
    sunny: "rgba(255, 200, 100, 0.1)",
    cloudy: "rgba(150, 150, 150, 0.15)",
    rainy: "rgba(100, 150, 200, 0.2)",
    snowy: "rgba(200, 220, 255, 0.15)",
  };
  return {
    background: `linear-gradient(${
      colorMap[weatherStore.weatherType] || "rgba(0,0,0,0.1)"
    }, rgba(0,0,0,0.3))`,
  };
});

const onImageLoad = () => {
  isLoaded.value = true;
};

onMounted(() => {
  // 随机选择背景
  currentBgIndex.value = Math.floor(Math.random() * bgImages.length);
});
</script>

<template>
  <div class="background-layer">
    <img
      :src="backgroundUrl"
      :class="['bg-image', { loaded: isLoaded }]"
      alt="background"
      @load="onImageLoad"
    />
    <div class="overlay" :style="overlayStyle"></div>
  </div>
</template>

<style lang="scss" scoped>
.background-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px) brightness(0.3);
  transform: scale(1.1);
  transition: filter 0.8s ease, transform 0.8s ease;

  &.loaded {
    filter: blur(0) brightness(1);
    transform: scale(1);
  }
}

.overlay {
  position: absolute;
  inset: 0;
  transition: background 0.5s ease;
}
</style>
