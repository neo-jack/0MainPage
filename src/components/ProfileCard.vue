<script setup lang="ts">
import { Github } from "@icon-park/vue-next";
import { useLocaleStore } from "../store/locale";
import { zh, en } from "../i18n";
import { computed } from "vue";

const localeStore = useLocaleStore();
const t = computed(() => localeStore.locale === "zh" ? zh : en);

// 个人信息配置
const profile = {
  avatar: "/avatar.png", // 替换为你的头像
  name: "Laaaanbq",
  github: "https://github.com/your-username",
};
</script>

<template>
  <div class="profile-card glass-card">
    <!-- 头像 -->
    <div class="avatar-wrapper">
      <img :src="profile.avatar" :alt="profile.name" class="avatar" />
    </div>

    <!-- 名称 -->
    <h1 class="name">{{ profile.name }}</h1>

    <!-- 描述 -->
    <p class="description">{{ t.profile.description }}</p>

    <!-- 社交链接 -->
    <div class="social-links">
      <a
        :href="profile.github"
        target="_blank"
        class="social-link"
        title="GitHub"
      >
        <Github theme="filled" size="24" fill="#fff" />
      </a>
      <span class="author-name">@蓝斌铨</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-card {
  padding: 2rem;
  text-align: center;
  color: var(--text-light);
  animation: fade-in 0.6s ease forwards;
}

.avatar-wrapper {
  margin-bottom: 1.5rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid var(--border-light);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
}

.name {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  position: relative; /* 为绝对定位的子元素提供参考 */
  align-items: center;
}

.author-name {
  position: absolute;
  right: 0;
  font-size: 0.75rem; /* 小字 */
  color: rgba(255, 255, 255, 0.6); /* 淡色显示 */
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
}
</style>