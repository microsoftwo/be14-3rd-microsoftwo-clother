<template>
  <div class="post-grid">
    <div v-for="(post, index) in posts" :key="index" class="post-item">
      <img :src="post.imageUrl" :alt="'Post ' + (index + 1)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostGrid',
  props: {
    posts: {
      type: Array,
      required: true,
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
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  width: 100%;
}

.post-item {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.post-item img {
  width: 100%;
  height: 100%;
  border-radius: 40px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-item:hover img {
  transform: scale(1.05);
}
</style> 