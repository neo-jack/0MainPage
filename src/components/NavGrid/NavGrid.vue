<script setup lang="ts">
import { LinkOne } from "@icon-park/vue-next";
import { navItems, getNavUrl, type NavItem } from "../../config/nav";
import { useLocaleStore } from "../../store/locale";
import { ref, onMounted } from "vue";

const localeStore = useLocaleStore();
const siteStatus = ref<Record<string, boolean>>({});

// 获取描述文字
const getDescription = (item: NavItem) => {
  return localeStore.locale === "zh" ? item.description : item.descriptionEn;
};

// 检测网站状态
const checkSiteStatus = async (url: string): Promise<boolean> => {
  try {
    // 由于浏览器CORS限制，我们使用fetch with no-cors模式来检测
    const response = await fetch(url, {
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
        <div class="left-section">
          <div
            class="status-dot"
            :class="{
              online: siteStatus[item.id],
              offline: !siteStatus[item.id],
            }"
          ></div>
          <span class="project-name">{{ item.name }}</span>
        </div>
        <div class="github-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
        </div>
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
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.6);
  }

  &.offline {
    background-color: #ff0000;
    box-shadow: 0 0 8px rgba(255, 0, 0, 0.6);
  }
}

.github-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  transition: all 0.3s ease;
  cursor: pointer;
}

.github-icon:hover {
  color: var(--primary-color);
  transform: scale(1.1);
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
