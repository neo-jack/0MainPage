<template>
  <div class="day-background" :style="dayBackgroundStyle">
    <!-- 太阳元素 -->
    <div class="sun-layer">
      <div class="sun">
        <div class="sun-core"></div>
      </div>
    </div>

    <!-- 蜂巢结构 -->
    <div class="honeycomb-layer">
      <div class="honeycomb-grid">
        <div
          v-for="row in 7"
          :key="'row-' + row"
          class="honeycomb-row"
          :class="{ offset: row % 2 === 0 }"
        >
          <div
            v-for="col in 7"
            :key="'cell-' + row + '-' + col"
            class="honeycomb-cell"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// 晴天背景样式
const dayBackgroundStyle = computed(() => ({
  background: "linear-gradient(180deg, #9EC6F3 0%, #BDDDE4 40%, #FFF1D5 100%)",
}));
</script>

<style lang="scss" scoped>
.day-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  transition: background 0.5s ease;
  overflow: hidden;
}

// 太阳层
.sun-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.sun {
  position: absolute;
  top: 15%;
  right: 20%;
  width: 80px;
  height: 80px;
  animation: sun-glow 4s ease-in-out infinite;
}

.sun-core {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    #ffd700 0%,
    #ffed4e 30%,
    #ffc107 60%,
    rgba(255, 215, 0, 0.8) 100%
  );
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.2);
}

// 蜂巢结构
.honeycomb-layer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.1;
  pointer-events: none;
}

.honeycomb-grid {
  display: flex;
  flex-direction: column;
  gap: -2px;
}

.honeycomb-row {
  display: flex;
  gap: 2px;

  &.offset {
    margin-left: 15px;
  }
}

.honeycomb-cell {
  width: 30px;
  height: 26px;
  background: rgba(255, 193, 7, 0.3);
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  border: 1px solid rgba(255, 193, 7, 0.5);
}

@keyframes sun-glow {
  0%,
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
}

@keyframes sun-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes ray-pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scaleY(1);
  }
  50% {
    opacity: 1;
    transform: scaleY(1.2);
  }
}
</style>
