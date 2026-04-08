<template>
  <div class="nav-grid">
    <div
      v-for="item in filteredItems"
      :key="item.id"
      class="nav-card"
      :style="{ '--item-color': item.color }"
      @click="handleClick(item)"
    >
      <div class="card-header">
        <div class="left-section">
          <div
            class="status-dot"
            :class="{
              online: siteStatus[item.id],
              offline: !siteStatus[item.id],
            }"
          ></div>
          <span class="project-name">{{ getName(item) }}</span>
        </div>
        <div class="icon-group">
          <a
            v-for="navIcon in item.icons"
            :key="navIcon.url"
            :href="navIcon.url"
            target="_blank"
            class="nav-icon-link"
            :title="navIcon.title"
            @click.stop
          >
            <img
              v-if="isImageIcon(navIcon.icon)"
              :src="navIcon.icon"
              :alt="navIcon.title"
              class="custom-icon"
            />
            <component
              v-else
              :is="getIcon(navIcon.icon)"
              theme="filled"
              size="20"
              fill="currentColor"
            />
          </a>
        </div>
      </div>
      <p class="description">{{ getDescription(item) }}</p>
      <div class="tags">
        <span v-for="tech in getTechStack(item)" :key="tech" class="tag tech">{{
          tech
        }}</span>
        <span v-for="hl in getHighlights(item)" :key="hl" class="tag highlight">{{
          hl
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as IconPark from "@icon-park/vue-next";
import { navItems, getNavUrl, type NavItem, type NavCategory } from "../../config/nav";
import { useLocaleStore } from "../../store/locale";
import { ref, computed, onMounted, type Component } from "vue";

const props = defineProps<{ category: NavCategory }>();

const localeStore = useLocaleStore();
const siteStatus = ref<Record<string, boolean>>({});

// 按分类过滤导航项
const filteredItems = computed(() =>
  navItems.filter((item) => item.category === props.category)
);

// 获取名称
const getName = (item: NavItem) => {
  return localeStore.locale === "zh" ? item.name : item.nameEn;
};

// 获取描述文字
const getDescription = (item: NavItem) => {
  return localeStore.locale === "zh" ? item.description : item.descriptionEn;
};

// 获取技术栈
const getTechStack = (item: NavItem) => {
  return localeStore.locale === "zh" ? item.techStack : item.techStackEn;
};

// 获取亮点
const getHighlights = (item: NavItem) => {
  return localeStore.locale === "zh" ? item.highlights : item.highlightsEn;
};

// 判断是否为自定义图片路径
const isImageIcon = (icon: string): boolean => icon.charAt(0) === "/";

// 根据图标名称获取 icon-park 组件
const getIcon = (name: string): Component | undefined => {
  return (IconPark as Record<string, Component>)[name];
};

// 检测网站状态
const checkSiteStatus = async (url: string): Promise<boolean> => {
  try {
    // 由于浏览器CORS限制，我们使用fetch with no-cors模式来检测
    await fetch(url, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-cache",
    });
    return true; // 如果没有抛出错误，认为网站可访问
  } catch (error) {
    return false; // 如果抛出错误，认为网站不可访问
  }
};

// 初始化所有网站状态检测
const initSiteStatus = async () => {
  for (const item of navItems) {
    const url = getNavUrl(item);
    const isOnline = await checkSiteStatus(url);
    siteStatus.value[item.id] = isOnline;
  }
};

// 跳转链接
const handleClick = (item: NavItem) => {
  window.open(getNavUrl(item), "_blank");
};

onMounted(() => {
  initSiteStatus();
});
</script>

<style lang="scss" scoped>
.nav-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fade-in 0.6s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
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
    filter: brightness(1.01);
  }

  &:active {
    transform: scale(0.98);
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #666;
  transition: all 0.3s ease;

  &.online {
    background-color: #00ff00;
  }

  &.offline {
    background-color: #ff0000;
  }
}

.icon-group {
  display: flex;
  align-items: flex-end;
  gap: 4px;
}

.nav-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: var(--text-light);
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;

 &:hover {
    filter: brightness(1.3);
  }
}

.custom-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.project-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-light);
}
.description {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
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
    background: var(--tag-dot-bg);
  }

  &.highlight::before {
    background: #ff9500;
  }
}
</style>
