<!-- 
  PostGrid.vue - 게시물 그리드 컴포넌트
  이미지 게시물을 그리드 형태로 표시하는 컴포넌트
-->
<template>
  <div class="post-grid">
    <!-- 각 게시물 아이템을 반복하여 표시 -->
    <div v-for="(post, index) in posts" :key="index" class="post-item">
      <img :src="post.imageUrl" :alt="'Post ' + (index + 1)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostGrid',
  props: {
    // 게시물 데이터 배열
    posts: {
      type: Array,
      required: true,
      // 각 게시물은 imageUrl 속성을 가져야 함
      validator: (value) => {
        return value.every(post => post.imageUrl)
      }
    }
  }
}
</script>

<style scoped>
.post-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);  /* 5열 그리드 */
  gap: 8px;  /* 그리드 아이템 간 간격 */
  width: 100%;
}

.post-item {
  position: relative;
  aspect-ratio: 3/4;  /* 3:4 비율 유지 */
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.post-item img {
  width: 100%;
  height: 100%;
  border-radius: 35px;
  object-fit: cover;  /* 이미지 비율 유지하면서 컨테이너 채우기 */
  transition: transform 0.3s ease; 
}

.post-item:hover img {
  opacity: 0.7;  /* 호버시 이미지 반투명하게 */
  border-radius: 20px;
}
</style> 