<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import BackgroundLayer from "./components/BackgroundLayer.vue";
import ProfileCard from "./components/ProfileCard.vue";
import NavGrid from "./components/NavGrid.vue";
import TimeWeather from "./components/TimeWeather.vue";
import ThemeSwitch from "./components/ThemeSwitch.vue";
import FooterInfo from "./components/FooterInfo.vue";
import SettingsMenu from "./components/SettingsMenu.vue";
import { useWeatherStore } from "./store/weather";

const weatherStore = useWeatherStore();
const isLoaded = ref(false);

watch(
  () => weatherStore.themeColor,
  (color) => {
    document.documentElement.style.setProperty("--primary-color", color);
  },
  { immediate: true }
);

onMounted(() => {
  // 初始化天气数据
  weatherStore.init();
  
  // 页面加载完成后显示内容
  setTimeout(() => {
    isLoaded.value = true;
  }, 300);
});
</script>

<template>
  <div class="app-container" :class="weatherStore.weatherType">
    <!-- 背景层 -->
    <BackgroundLayer />

    <!-- 主内容区 -->
    <Transition name="fade">
      <main v-if="isLoaded" class="main-content">
        <div class="main-actions">
          <SettingsMenu />
        </div>
        <div class="content-wrapper">
          <!-- 左侧：个人信息卡片 -->
          <section class="left-section">
            <ProfileCard />
          </section>

          <!-- 右侧：功能区 -->
          <section class="right-section">
            <!-- 时间天气 + 主题切换 -->
            <div class="top-bar">
              <TimeWeather />
            </div>
            <!-- 导航网格 -->
            <NavGrid />
          </section>
        </div>

        <!-- 底部版权 -->
        <FooterInfo />
      </main>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.main-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.main-actions {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 5;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.left-section {
  flex: 0 0 auto;
  width: 380px;
}

.right-section {
  flex: 0 0 auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.top-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
}

// 响应式适配
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  .left-section,
  .right-section {
    width: 100%;
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>