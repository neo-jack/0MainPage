<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

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

const clearCacheAndReload = () => {
  // 仅清理本项目用到的 key
  localStorage.removeItem("autoTheme");
  localStorage.removeItem("manualTheme");
  localStorage.removeItem("darkMode");
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
      <span class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>

    <div v-if="open" class="menu glass-card" @click.stop>
      <a
        class="menu-item link"
        href="https://java2ai.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        网站风格参考链接
      </a>
 
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  position: relative;
}

.settings-btn {
  width: 42px;
  height: 42px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  background: rgba(80, 80, 80, 0.85);
  color: var(--text-light);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(100, 100, 100, 0.95);
  }
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 18px;
  height: 18px;

  span {
    display: block;
    width: 16px;
    height: 2px;
    background: #fff;
    border-radius: 1px;
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

  &.link {
    text-decoration: none;
    display: block;
  }
}
</style>
