<template>
  <div class="grid-container">
    <!-- 게시글 묶음(chunk) 단위로 반복 -->
    <div v-for="(chunk, index) in chunkedPosts" :key="index" class="grid-row">
      <!-- 게시글 하나씩 출력 -->
      <div
        v-for="post in chunk"
        :key="post.id"
        :class="[
          'grid-col',
          layout === 'weekly' ? 'weekly-layout' : 'main-layout',
        ]"
      >
        <!-- 게시글 카드 -->
        <div class="post-card" @click="handlePostClick(post.id)">
          <!-- 게시글 이미지 -->
          <div class="image-container">
            <img
              :src="getImageUrl(post)"
              :alt="post.title"
              class="post-image"
              @load="handleImageLoad(post.id)"
              @error="handleImageError(post.id)"
            />
            <!-- 이미지 로딩중 보여줄 UX -->
            <div v-if="!isImageLoaded(post.id)" class="loading-overlay">
              <div class="loading-spinner"></div>
            </div>
          </div>

          <!-- 게시글 좋아요/댓글 영역 -->
          <div class="card-actions">
            <div class="action-row">
              <!-- 좋아요 버튼 & 수 -->
              <div class="action-col">
                <button class="icon-button" @click.stop="toggleLike(post)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    :fill="post.isLiked ? 'red' : 'none'"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="action-icon"
                  >
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    ></path>
                  </svg>
                  <span class="action-count">{{ post.likeCount }}</span>
                </button>
              </div>

              <!-- 댓글 수 -->
              <div class="action-col">
                <div class="comment-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="action-icon"
                  >
                    <path
                      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                    ></path>
                  </svg>
                  <span class="action-count">{{ post.commentCount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const imageLoadedMap = ref(new Map()); // 이미지별 로딩 상태 관리

// props 정의
const props = defineProps({
  posts: {
    type: Array,
    required: true,
    default: () => [],
  },
  layout: {
    type: String,
    default: "weekly", // weekly or main 형태
  },
});

// 로컬스토리지에서 토큰 가져오기
const getHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// 게시글을 layout에 따라 묶어주는 computed
const chunkedPosts = computed(() => {
  if (!props.posts || props.posts.length === 0) {
    return [];
  }

  if (props.layout === "weekly") {
    return [props.posts.slice(0, 6)]; // weekly는 최대 6개만 표시
  }

  const result = [];
  for (let i = 0; i < props.posts.length; i += 5) {
    result.push(props.posts.slice(i, i + 5));
  }
  return result;
});

// 게시글 이미지 가져오기
const getImageUrl = (post) => {
  return post.imageUrl || "";
};

// 게시글 클릭 시 상세 페이지 이동
const handlePostClick = (postId) => {
  router.push(`/boards/${postId}`);
};

// 이미지 로딩 상태 관리
const isImageLoaded = (postId) => {
  return imageLoadedMap.value.get(postId) || false;
};

const handleImageLoad = (postId) => {
  imageLoadedMap.value.set(postId, true);
};

const handleImageError = (postId) => {
  imageLoadedMap.value.set(postId, true);
};

// 게시글 좋아요 토글 처리
const toggleLike = async (post) => {
  try {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 즉시 UI 업데이트
    const isCurrentlyLiked = post.isLiked;
    post.isLiked = !isCurrentlyLiked;
    post.likeCount += isCurrentlyLiked ? -1 : 1;

    // 백그라운드에서 API 호출
    const endpoint = !isCurrentlyLiked
      ? "http://localhost:8000/core-service/like"
      : `http://localhost:8000/core-service/${post.id}`;

    const options = !isCurrentlyLiked
      ? {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: parseInt(userId),
            boardId: parseInt(post.id),
          }),
        }
      : {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

    fetch(endpoint, options).catch((error) => {
      console.error("Error in like/unlike API:", error);
      // API 호출 실패 시 UI 원상복구
      post.isLiked = isCurrentlyLiked;
      post.likeCount = isCurrentlyLiked
        ? post.likeCount + 1
        : post.likeCount - 1;
    });
  } catch (error) {
    console.error("Error in toggleLike:", error);
  }
};
</script>

<style scoped>
.grid-container {
  width: 100%;
  padding: 16px 0;
}

.grid-row {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
  width: 100%;
}

.grid-col {
  padding: 8px;
  box-sizing: border-box;
}

.weekly-layout {
  width: calc(100% / 6); /* 6개를 한 줄에 배치 */
}

.main-layout {
  width: 20%;
}

.post-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  width: 100%;
  background-color: #f5f5f5;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
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

.card-actions {
  padding: 8px;
  background-color: #f5f5f5;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-col {
  display: flex;
  align-items: center;
}

.icon-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
}

.action-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.action-count {
  font-size: 12px;
  color: #666;
}

.comment-info {
  display: flex;
  align-items: center;
}

@media (max-width: 1200px) {
  .grid-col.main-layout {
    width: 25%;
  }
  .grid-col.weekly-layout {
    width: calc(100% / 4); /* 4개씩 */
  }
}

@media (max-width: 992px) {
  .grid-col.main-layout {
    width: 33.33%;
  }
  .grid-col.weekly-layout {
    width: calc(100% / 3); /* 3개씩 */
  }
}

@media (max-width: 768px) {
  .grid-col.main-layout {
    width: 50%;
  }
  .grid-col.weekly-layout {
    width: 50%; /* 2개씩 */
  }
}

@media (max-width: 576px) {
  .grid-col.main-layout,
  .grid-col.weekly-layout {
    width: 100%; /* 1개씩 */
  }
}
</style>
