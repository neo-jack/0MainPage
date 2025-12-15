<script setup lang="ts">
import {
  Application,
  LayoutOne,
  FileCode,
  Server,
  DatabaseConfig,
} from "@icon-park/vue-next";
import { navItems, getNavUrl, type NavItem } from "../config/nav";

// 图标映射
const iconMap: Record<string, any> = {
  Application,
  Layout: LayoutOne,
  DataFile: FileCode,
  Server,
  Database: DatabaseConfig,
};

// 跳转链接
const handleClick = (item: NavItem) => {
  window.open(getNavUrl(item), "_blank");
};
</script>

<template>
  <div class="nav-grid">
    <div
      v-for="item in navItems"
      :key="item.id"
      class="nav-item glass-card"
      :style="{ '--item-color': item.color }"
      @click="handleClick(item)"
    >
      <div class="icon-wrapper">
        <component :is="iconMap[item.icon]" size="24" :fill="item.color" />
      </div>
      <span class="name">{{ item.name }}</span>
      <span class="arrow">→</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fade-in 0.6s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  cursor: pointer;
  color: var(--text-light);
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(4px);

    .arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .icon-wrapper {
      background: var(--item-color);
    }
  }

  &:active {
    transform: scale(0.98);
  }
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  margin-right: 1rem;
  transition: all 0.3s;
}

.name {
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
}

.arrow {
  font-size: 1.2rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s;
  color: var(--text-muted);
}
</style>