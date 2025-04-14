<template>
  <div class="search-results-view">
    <div class="search-results">
      <div v-if="isLoading" class="loading-spinner"></div>

      <div v-else-if="error" class="error-alert">
        {{ error }}
      </div>

      <div v-else-if="results.length === 0" class="no-results">
        검색 결과가 없습니다.
      </div>

      <div v-else class="results-grid">
        <div
          v-for="post in results"
          :key="post.id"
          class="result-card"
          @click="goToPost(post.id)"
        >
          <div class="post-image">
            <img :src="post.imageUrl" :alt="post.title" />
          </div>
          <div class="post-content">
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.content }}</p>
            <div class="post-meta">
              <span class="like-count">
                <span class="icon heart-icon"></span>
                {{ post.likeCount }}
              </span>
              <span class="comment-count">
                <span class="icon comment-icon"></span>
                {{ post.commentCount }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { boardAPI } from "../services/api";

const props = defineProps({
  keyword: {
    type: String,
    required: true,
  },
  sortBy: {
    type: String,
    default: "title+content",
  },
});

const router = useRouter();
const route = useRoute();
const results = ref([]);
const isLoading = ref(false);
const error = ref(null);

const searchPosts = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const data = await boardAPI.searchBoards(props.keyword, props.sortBy);
    results.value = data;
  } catch (err) {
    console.error("검색 중 오류 발생:", err);
    error.value = "검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    results.value = [];
  } finally {
    isLoading.value = false;
  }
};

const goToPost = (postId) => {
  router.push(`/boards/${postId}`);
};

// 키워드나 정렬 방식이 변경될 때마다 검색 실행
watch(
  () => [props.keyword, props.sortBy],
  () => {
    searchPosts();
  },
  { immediate: true }
);
</script>

<style scoped>
.search-results-view {
  padding: 24px;
  margin: 0 auto;
  background-color: #f7f3f2;
}

.search-header {
  margin-bottom: 64px;
  padding: 0 24px;
}

.search-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 16px;
  margin-top: 60px;
}

.search-info {
  color: #666;
  margin-bottom: 24px;
}

.keyword {
  font-weight: 500;
  color: #1976d2;
}

.sort-options {
  margin-top: 24px;
}

.sort-toggle {
  border-radius: 8px;
  overflow: hidden;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px 0;
}

.result-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.result-card:hover {
  transform: translateY(-4px);
}

.post-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-content {
  padding: 16px;
}

.post-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
}

.post-excerpt {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-meta {
  display: flex;
  gap: 16px;
  color: #666;
  font-size: 0.9rem;
}

.like-count,
.comment-count {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.heart-icon {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23ff4081" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>');
}

.comment-icon {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23666666" d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>');
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 40px auto;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-alert {
  margin: 20px 0;
  padding: 16px;
  background-color: #ffebee;
  color: #d32f2f;
  border-radius: 4px;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #666;
}

:deep(.v-btn-toggle .v-btn) {
  text-transform: none;
  font-weight: 500;
  letter-spacing: normal;
}

@media (max-width: 600px) {
  .search-results-view {
    padding: 16px;
  }

  .search-header {
    padding: 0 16px;
  }

  .sort-toggle {
    width: 100%;
  }

  :deep(.v-btn-toggle .v-btn) {
    flex: 1;
    min-width: 0;
  }

  .results-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
