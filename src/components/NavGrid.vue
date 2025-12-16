<script setup lang="ts">
import {
  Application,
  LayoutOne,
  FileCode,
  Server,
  DatabaseConfig,
} from "@icon-park/vue-next";
import { navItems, getNavUrl, type NavItem } from "../config/nav";
import { useLocaleStore } from "../store/locale";
import { computed } from "vue";

const localeStore = useLocaleStore();

// 图标映射
const iconMap: Record<string, any> = {
  Application,
  Layout: LayoutOne,
  DataFile: FileCode,
  Server,
  Database: DatabaseConfig,
};

// 获取描述文字
const getDescription = (item: NavItem) => {
  return localeStore.locale === "zh" ? item.description : item.descriptionEn;
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
      class="nav-card"
      :style="{ '--item-color': item.color }"
      @click="handleClick(item)"
    >
      <div class="card-header">
        <div class="icon-wrapper">
          <component :is="iconMap[item.icon]" size="20" fill="#fff" />
        </div>
        <span class="project-name">{{ item.name }}</span>
      </div>
      <p class="description">{{ getDescription(item) }}</p>
      <div class="tags">
        <span v-for="tech in item.techStack" :key="tech" class="tag tech">{{ tech }}</span>
        <span v-for="hl in item.highlights" :key="hl" class="tag highlight">{{ hl }}</span>
      </div>
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

.nav-card {
  padding: 1rem 1.25rem;
  cursor: pointer;
  color: #fff;
  background: var(--item-color);
  border-radius: 12px;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: scale(0.98);
  }
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  margin-right: 0.75rem;
}

.project-name {
  font-size: 1rem;
  font-weight: 600;
}

.description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);

  &.highlight {
    background: rgba(255, 255, 255, 0.3);
  }
}
</style>