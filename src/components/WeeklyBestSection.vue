<template>
  <div class="container">
    <div class="header-section">
      <h2 class="section-title" style="color: black">WEEKLY BEST TOP 6</h2>
      <button class="post-button">POST</button>
    </div>
    <!-- 부모가 넘겨준 posts 데이터 전달 -->
    <style-grid :posts="posts" layout="weekly"></style-grid>
  </div>
</template>

<script setup>
import { defineProps } from "vue"; // defineProps → 부모가 넘겨준 데이터 받기
import StyleGrid from "./StyleGrid.vue"; // StyleGrid → 재사용 가능한 컴포넌트

defineProps({
  posts: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 16px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.0125em;
  margin: 0;
}

.post-button {
  padding: 8px 16px;
  border: 1px solid #1976d2;
  background: none;
  color: #1976d2;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.post-button:hover {
  background-color: rgba(25, 118, 210, 0.04);
}
</style>
