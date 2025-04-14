<template>
  <div class="post-grid-wrapper">
    <div class="post-grid">
      <div
        v-for="(post, index) in paginatedPosts"
        :key="index"
        class="post-item"
      >
        <img :src="post.imageUrl" :alt="'Post ' + (index + 1)" />
        
        <!-- ▶ 버튼은 마지막 이미지 위에만 표시 -->
        <button
          v-if="index === paginatedPosts.length - 1 && (currentPage + 1) * itemsPerPage < posts.length"
          class="next-btn"
          @click="nextPage"
        >
          ▶
        </button>

         <!-- ◀ 화살표: 첫 이미지에만 표시 -->
        <button
          v-if="index === 0 && currentPage > 0"
          class="prev-btn"
          @click="prevPage"
        >
          ◀
        </button>
      </div>
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
      validator: (value) => value.every(post => post.imageUrl)
    }
  },
  data() {
    return {
      currentPage: 0,
      itemsPerPage: 5
    };
  },
  computed: {
    paginatedPosts() {
      const start = this.currentPage * this.itemsPerPage
      return this.posts.slice(start, start + this.itemsPerPage)
    }
  },
  methods: {
    nextPage() {
      if ((this.currentPage + 1) * this.itemsPerPage < this.posts.length) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--
      }
    }
  }
}
</script>

<style scoped>
.post-grid-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  width: 100%;
  position: relative;
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
  border-radius: 35px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-item:hover img {
  opacity: 0.7;
}

/* ▶ 버튼 (이미지 위 오른쪽 아래) */
.next-btn,
.prev-btn {
  position: absolute;
  top: 50%; /* 중앙 */
  transform: translateY(-50%); /* 정확히 중앙 */
  bottom: 8px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 오른쪽 아래 (▶) */
.next-btn {
  right: 0;
}

/* 왼쪽 아래 (◀) */
.prev-btn {
  left: 0;
}

.next-btn:hover
.prev-btn:hover {
  background: rgba(255, 255, 255, 0.85);
  color: black;
}
</style>
