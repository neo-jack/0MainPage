<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { BackgroundLayer } from "./components/BackgroundLayer";
import { ProfileCard } from "./components/ProfileCard";
import { NavGrid } from "./components/NavGrid";
import { FooterInfo } from "./components/FooterInfo";
import { SettingsMenu } from "./components/SettingsMenu";
import { useLocaleStore } from "./store/locale";
import { useThemeStore } from "./store/theme";
import { zh, en } from "./i18n";

const localeStore = useLocaleStore();
const themeStore = useThemeStore();

// 国际化文案
const t = computed(() => (localeStore.locale === "zh" ? zh : en));
const isLoaded = ref(false);

// 监听主题色变化
watch(
  () => themeStore.themeColor,
  (color) => {
    document.documentElement.style.setProperty("--primary-color", color);
  },
  { immediate: true }
);

onMounted(() => {
  // 初始化语言设置
  localeStore.init();
  // 初始化主题设置
  themeStore.init();

  // 页面加载完成后显示内容
  setTimeout(() => {
    isLoaded.value = true;
  }, 300);
});
</script>

<template>
  <div class="app-container" :class="{ 'dark-mode': themeStore.darkMode }">
    <!-- 背景层 -->
    <BackgroundLayer />

    <!-- 主内容区 -->
    <Transition name="fade">
      <main v-if="isLoaded" class="main-content">
        <div class="main-actions">
          <!-- 语言切换按钮 -->
          <button
            class="locale-toggle-btn"
            type="button"
            title="切换语言"
            @click="localeStore.toggleLocale"
          >
            {{ t.locale.switch }}
          </button>
          <!-- 主题切换按钮 -->
          <button
            class="theme-toggle-btn"
            type="button"
            :title="themeStore.darkMode ? t.theme.toLight : t.theme.toDark"
            @click="themeStore.toggleDarkMode"
          >
            <span v-if="themeStore.darkMode" class="icon">&#9728;</span>
            <span v-else class="icon">&#9790;</span>
          </button>
          <SettingsMenu />
        </div>
        <div class="content-wrapper">
          <!-- 左侧：个人信息卡片 -->
          <section class="left-section">
            <ProfileCard />
          </section>

          <!-- 右侧：功能区 -->
          <section class="right-section">
            <!-- 功能区顶部 -->
            <div class="top-bar">
              <div class="nav-title">{{ t.navTitle.text }}</div>
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.locale-toggle-btn {
  height: 42px;
  padding: 0 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 21px;
  background: rgba(80, 80, 80, 0.85);
  color: var(--text-light);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(100, 100, 100, 0.95);
  }
}

.theme-toggle-btn {
  width: 42px;
  height: 42px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  background: rgba(80, 80, 80, 0.85);
  color: var(--text-light);
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(100, 100, 100, 0.95);
  }

  .icon {
    line-height: 0;
  }
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  max-width: 1200px;
  margin: 4em auto 20px auto;
  width: 100%;
  min-height: 0; /* 允许flex子项收缩 */
  overflow: hidden; /* 防止溢出 */
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
  max-height: 380px;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1rem;
}

.nav-title {
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Arial Black", "Microsoft YaHei", sans-serif;
  background-image: linear-gradient(
    135deg,
    rgb(255, 107, 107),
    rgb(78, 205, 196) 25%,
    rgb(69, 183, 209) 50%,
    rgb(240, 147, 251) 75%,
    rgb(245, 87, 108)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

// 响应式适配
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;

    padding: 5rem 1rem 2rem 1rem;
    height: 100vh; /* 设置为全屏高度 */
    margin: 0 auto; /* 移除上下边距 */
  }

  .left-section {
    width: 100%;
  }

  .right-section {
    width: 100%;
    max-height: 500px;
    flex: 1; /* 让right-section占据剩余空间 */
    min-height: 100px;
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
