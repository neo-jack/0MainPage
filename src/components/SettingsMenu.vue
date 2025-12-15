<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useWeatherStore } from "../store/weather";

const weatherStore = useWeatherStore();

const open = ref(false);
const rootRef = ref<HTMLElement | null>(null);

const toggle = () => {
  open.value = !open.value;
};

const close = () => {
  open.value = false;
};

const handleDocumentClick = (e: MouseEvent) => {
  const el = rootRef.value;
  if (!el) return;
  if (el.contains(e.target as Node)) return;
  close();
};

const refreshWeather = async () => {
  await weatherStore.fetchWeather();
  close();
};

const toggleAutoTheme = () => {
  weatherStore.toggleAutoTheme();
  close();
};

const clearCacheAndReload = () => {
  // 仅清理本项目用到的 key
  localStorage.removeItem("weatherCache");
  localStorage.removeItem("autoTheme");
  localStorage.removeItem("manualTheme");
  close();
  window.location.reload();
};

onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleDocumentClick);
});
</script>

<template>
  <div ref="rootRef" class="settings">
    <button
      class="settings-btn"
      type="button"
      title="菜单/设置"
      @click.stop="toggle"
    >
      设置
    </button>

    <div v-if="open" class="menu glass-card" @click.stop>
      <button class="menu-item" type="button" @click="refreshWeather">
        刷新天气
      </button>
      <button class="menu-item" type="button" @click="toggleAutoTheme">
        {{ weatherStore.autoTheme ? "关闭自动主题" : "开启自动主题" }}
      </button>
      <button
        class="menu-item danger"
        type="button"
        @click="clearCacheAndReload"
      >
        清除缓存并刷新
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  position: relative;
}

.settings-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

.menu {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  min-width: 180px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  z-index: 10;
}

.menu-item {
  width: 100%;
  text-align: left;
  padding: 0.55rem 0.6rem;
  border-radius: 10px;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-light);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.14);
  }

  &.danger {
    color: rgba(255, 200, 200, 0.95);
  }
}
</style>