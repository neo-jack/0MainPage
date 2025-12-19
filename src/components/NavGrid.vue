<script setup lang="ts">
import { LinkOne } from "@icon-park/vue-next";
import { navItems, getNavUrl, type NavItem } from "../config/nav";
import { useLocaleStore } from "../store/locale";

const localeStore = useLocaleStore();

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
          <LinkOne size="20" fill="#fff" />
        </div>
        <span class="project-name">{{ item.name }}</span>
      </div>
      <p class="description">{{ getDescription(item) }}</p>
      <div class="tags">
        <span v-for="tech in item.techStack" :key="tech" class="tag tech">{{
          tech
        }}</span>
        <span v-for="hl in item.highlights" :key="hl" class="tag highlight">{{
          hl
        }}</span>
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
  max-height: 320px;
  overflow-y: auto;

  // 隐藏滚动条但保留滚动功能
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE/Edge
  &::-webkit-scrollbar {
    display: none; // Chrome/Safari
  }
}

.nav-card {
  padding: 1rem 1.25rem;
  cursor: pointer;
  color: var(--text-light);
  background: var(--card-bg-solid);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--border-light);
  border-radius: 12px;
  transition: all 0.3s;

  &:hover {
    filter: brightness(1.1);
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
  margin-right: 0.75rem;
  position: relative; // 三角形伪元素定位
  overflow: hidden; // 把三角裁在这个小方块里面
  background: transparent; // 实际背景交给 ::before
}
.icon-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  // 裁出一个上尖下宽的等腰三角形
  clip-path: polygon(50% 0, 0 100%, 100% 100%);
  // 彩色渐变：首尾用 var(--bg-color)，暗色下偏暗，亮色下偏亮
  background: conic-gradient(
    from 210deg,
    var(--bg-color),
    #ff6b6b,
    #f7d94c,
    #4adede,
    #a66bff,
    var(--bg-color)
  );
  opacity: 0.9;
}
.project-name {
  font-size: 1rem;
  font-weight: 600;
}

.description {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--text-muted);

  // 圆点样式
  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--item-color);
  }

  &.highlight::before {
    background: #ff9500;
  }
}
</style>
