<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer-info">
    <p>© {{ currentYear }} Your Name. All rights reserved.</p>
  </footer>
</template>

<style lang="scss" scoped>
.footer-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.85rem;
  animation: fade-in 0.6s ease forwards;
  animation-delay: 0.3s;
  opacity: 0;
}
</style>