<template>
  <div class="post-detail-container">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
    </div>

    <div v-else-if="error" class="error-container">
      <div class="error-message">{{ error }}</div>
    </div>

    <div v-else-if="post" class="post-container">
      <div class="post-content">
        <div class="post-grid">
          <!-- 왼쪽: 이미지 -->
          <div class="post-image-section">
            <div class="post-image-wrapper">
              <img
                :src="post.imageUrls[currentImageIndex]"
                class="post-image"
                alt="Post image"
              />
              <div v-if="imageLoading" class="image-loading">
                <div class="loading-spinner"></div>
              </div>
              <!-- 이미지 네비게이션 버튼 -->
              <button
                v-if="post.imageUrls?.length > 1 && currentImageIndex > 0"
                class="nav-button prev-button"
                @click="prevImage"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                v-if="
                  post.imageUrls?.length > 1 &&
                  currentImageIndex < post.imageUrls.length - 1
                "
                class="nav-button next-button"
                @click="nextImage"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
              <!-- 이미지 인디케이터 -->
              <div v-if="post.imageUrls?.length > 1" class="image-indicator">
                {{ currentImageIndex + 1 }} / {{ post.imageUrls.length }}
              </div>
            </div>
          </div>

          <!-- 오른쪽: 댓글 영역 -->
          <div class="post-info-container">
            <!-- 유저 정보 -->
            <div class="user-info-area px-6 py-4">
              <div class="d-flex align-center mb-2">
                <div class="user-avatar mr-3">
                  <img
                    :src="post.userInfo?.imageUrl || '/default-avatar.png'"
                    :alt="post.userInfo?.nickname || 'User'"
                    class="avatar-img"
                  />
                </div>
                <div>
                  <div class="text-subtitle-1 font-weight-bold">
                    {{ post.userInfo?.nickname }}
                  </div>
                  <div
                    v-if="post.userInfo?.height || post.userInfo?.weight"
                    class="text-body-2 text-grey"
                  >
                    <span v-if="post.userInfo?.height">
                      {{ post.userInfo.height }}cm
                    </span>
                    <span v-if="post.userInfo?.height && post.userInfo?.weight">
                      /
                    </span>
                    <span v-if="post.userInfo?.weight">
                      {{ post.userInfo.weight }}kg
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 댓글 목록 -->
            <div class="comments-section">
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="comment-item"
              >
                <div class="d-flex align-start">
                  <div class="user-avatar-small mr-3">
                    <img
                      :src="comment.user?.imageUrl || '/default-avatar.png'"
                      :alt="comment.user?.nickname || 'User'"
                      class="avatar-img"
                    />
                  </div>
                  <div class="flex-grow-1">
                    <div class="d-flex align-center">
                      <span class="comment-nickname">
                        {{ comment.user?.nickname || "사용자" }}
                      </span>
                      <span class="comment-time">
                        {{ comment.formattedTime }}
                      </span>
                    </div>
                    <div class="comment-content">
                      <p class="comment-text">{{ comment.content }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 좋아요/댓글 -->
            <div class="interaction-area px-6 py-3">
              <div class="d-flex align-center">
                <div class="d-flex align-center">
                  <button class="interaction-btn" @click="toggleLike">
                    <i
                      :class="[
                        'icon',
                        post.isLiked ? 'heart-filled' : 'heart-outline',
                      ]"
                    ></i>
                    <span class="count">{{ post.likeCount }}</span>
                  </button>
                </div>
                <div class="d-flex align-center ml-4">
                  <button
                    class="interaction-btn"
                    @click="router.push(`/boards/${postId}/comments`)"
                  >
                    <i class="icon comment-outline"></i>
                    <span class="count">{{ comments.length }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- 댓글 입력 -->
            <div class="comment-input-container">
              <div class="d-flex align-center">
                <div class="user-avatar-small mr-3">
                  <img
                    :src="currentUserInfo.imageUrl"
                    :alt="currentUserInfo.nickname"
                    class="avatar-img"
                  />
                </div>
                <div class="comment-input-wrapper">
                  <input
                    v-model="newComment"
                    type="text"
                    class="comment-input"
                    placeholder="댓글 달기..."
                    @keyup.enter="submitComment"
                  />
                  <button
                    class="post-button"
                    :disabled="!newComment.trim()"
                    @click="submitComment"
                  >
                    게시
                  </button>
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
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { boardAPI, userAPI } from "../services/api";

const route = useRoute();
const router = useRouter();
const postId = route.params.id;
const imageLoading = ref(false);
const post = ref({
  id: 1,
  content: "게시글 내용입니다.",
  imageUrls: ["/default-post-image.png"],
  likeCount: 0,
  isLiked: false,
  userInfo: {
    nickname: "사용자1",
    imageUrl: "/default-avatar.png",
    height: 170,
    weight: 60,
  },
});
const isLoading = ref(false);
const error = ref(null);
const userPosts = ref([]);

// 댓글 관련 상태
const showComments = ref(false);
const newComment = ref("");
const comments = ref([]);

const currentUserInfo = ref({
  id: null,
  nickname: "",
  imageUrl:
    "https://microsoftwo-clother.s3.ap-northeast-2.amazonaws.com/20250411120415890788e6ef5448e397928081b431400b",
});

const currentImageIndex = ref(0);

const nextImage = () => {
  if (currentImageIndex.value < post.value.imageUrls.length - 1) {
    currentImageIndex.value++;
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};

const fetchPostDetail = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(`http://localhost:8081/boards/${postId}`);

    if (!response.ok) {
      throw new Error("게시글을 불러오는데 실패했습니다.");
    }

    const data = await response.json();

    // 이미지 URL 문자열을 배열로 변환
    const imageUrls = data.imageUrl
      ? data.imageUrl.split(", ")
      : ["/default-post-image.png"];

    // 작성자 정보 가져오기
    const userResponse = await fetch(
      `http://localhost:8082/user/${data.userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    let userInfo = {
      nickname: "Unknown",
      imageUrl: "/default-avatar.png",
      height: null,
      weight: null,
    };

    if (userResponse.ok) {
      const userData = await userResponse.json();
      userInfo = {
        nickname: userData.nickname,
        imageUrl: userData.imageUrl || "/default-avatar.png",
        height: userData.height,
        weight: userData.weight,
      };
    }

    post.value = {
      id: data.id,
      imageUrls: imageUrls, // 이미지 URL 배열로 설정
      content: data.content || "",
      likeCount: data.likeCount || 0,
      isLiked: data.isLiked || false,
      userInfo: userInfo,
    };
  } catch (error) {
    console.error("Failed to fetch post detail:", error);
    error.value = "게시글을 불러오는데 실패했습니다.";
  } finally {
    isLoading.value = false;
  }
};

// 좋아요 처리
const toggleLike = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 즉시 UI 업데이트
    const isCurrentlyLiked = post.value.isLiked;
    post.value.isLiked = !isCurrentlyLiked;
    post.value.likeCount += isCurrentlyLiked ? -1 : 1;

    // 백그라운드에서 API 호출
    if (!isCurrentlyLiked) {
      fetch("http://localhost:8081/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          boardId: parseInt(post.value.id),
        }),
      }).catch((error) => {
        console.error("Error in like API:", error);
        // API 호출 실패 시 UI 원상복구
        post.value.isLiked = isCurrentlyLiked;
        post.value.likeCount = isCurrentlyLiked
          ? post.value.likeCount + 1
          : post.value.likeCount - 1;
      });
    } else {
      fetch(`http://localhost:8081/like/${post.value.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((error) => {
        console.error("Error in unlike API:", error);
        // API 호출 실패 시 UI 원상복구
        post.value.isLiked = isCurrentlyLiked;
        post.value.likeCount = isCurrentlyLiked
          ? post.value.likeCount + 1
          : post.value.likeCount - 1;
      });
    }
  } catch (error) {
    console.error("Error in toggleLike:", error);
  }
};

const goBack = () => {
  router.go(-1);
};

// 시간 포맷 함수
const formatTimeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return "방금 전";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  } else {
    // 년도가 다르면 년도까지 표시
    const year = past.getFullYear();
    const month = past.getMonth() + 1;
    const day = past.getDate();
    const currentYear = now.getFullYear();

    if (year !== currentYear) {
      return `${year}년 ${month}월 ${day}일`;
    } else {
      return `${month}월 ${day}일`;
    }
  }
};

// 댓글 목록 가져오기
const fetchComments = async () => {
  try {
    const response = await fetch(
      `http://localhost:8081/comments/${post.value.id}`
    );
    if (!response.ok) {
      throw new Error("댓글을 불러오는데 실패했습니다.");
    }
    const data = await response.json();
    comments.value = data.map((comment) => ({
      ...comment,
      formattedTime: formatTimeAgo(comment.createdAt),
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

// 댓글창이 열릴 때 댓글 목록 가져오기
watch(showComments, (newValue) => {
  if (newValue) {
    fetchComments();
  }
});

// 댓글 페이지로 이동
const goToComments = () => {
  router.push(`/boards/${postId}/comments`);
};

const fetchCurrentUserInfo = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.log("로그인 정보가 없습니다.");
      return;
    }

    const response = await fetch(`http://localhost:8082/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      currentUserInfo.value = {
        id: userData.id,
        nickname: userData.nickname,
        imageUrl:
          userData.imageUrl ||
          "https://microsoftwo-clother.s3.ap-northeast-2.amazonaws.com/20250411120415890788e6ef5448e397928081b431400b",
      };
      console.log("현재 사용자 정보:", currentUserInfo.value);
    } else {
      console.error("사용자 정보를 가져오는데 실패했습니다.");
    }
  } catch (error) {
    console.error("Error fetching current user info:", error);
  }
};

// 댓글 제출
const submitComment = () => {
  if (!newComment.value.trim()) return;

  // 새 댓글 객체 생성
  const tempComment = {
    id: Date.now(),
    content: newComment.value.trim(),
    userId: currentUserInfo.value.id,
    boardId: post.value.id,
    createdAt: new Date().toISOString(),
    formattedTime: "방금 전",
    user: {
      id: currentUserInfo.value.id,
      nickname: currentUserInfo.value.nickname,
      imageUrl: currentUserInfo.value.imageUrl || "/default-avatar.png",
    },
  };

  // UI 즉시 업데이트
  comments.value.unshift(tempComment);
  newComment.value = "";
};

// 댓글 삭제 함수 단순화
const handleDeleteComment = (commentId) => {
  const index = comments.value.findIndex((comment) => comment.id === commentId);
  if (index !== -1) {
    comments.value.splice(index, 1);
  }
};

// 북마크 상태
const toggleBookmark = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 즉시 UI 업데이트
    post.value.isBookmarked = !post.value.isBookmarked;

    // 백그라운드에서 API 호출
    const endpoint = `http://localhost:8081/bookmarks/${post.value.id}`;
    const method = post.value.isBookmarked ? "POST" : "DELETE";

    fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body:
        method === "POST"
          ? JSON.stringify({
              userId: parseInt(userId),
              boardId: parseInt(post.value.id),
            })
          : undefined,
    }).catch((error) => {
      console.error("Error in bookmark API:", error);
      // API 호출 실패 시 UI 원상복구
      post.value.isBookmarked = !post.value.isBookmarked;
    });
  } catch (error) {
    console.error("Error in toggleBookmark:", error);
  }
};

onMounted(() => {
  fetchPostDetail();
  fetchCurrentUserInfo();
});
</script>

<style scoped>
.post-detail-container {
  background-color: white;
  min-height: 100vh;
  padding-top: 60px;
  padding-bottom: 60px;
}

.post-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px;
}

.post-content {
  background: white;
  min-height: 600px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.post-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 600px;
}

.post-image-section {
  position: relative;
  background-color: #fafafa;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.post-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-info-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.user-info-area {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.comments-section {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
  color: black;
}

.comment-item {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-nickname {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
}

.comment-time {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 8px;
}

.comment-content {
  font-size: 14px;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.87);
  margin: 4px 0 0;
}

.interaction-area {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  background-color: white;
}

.comment-input-container {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: 8px 16px;
  background-color: white;
}

.comment-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.comment-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 8px 0;
  background: transparent;
}

.post-button {
  color: #0095f6;
  font-weight: 600;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
}

.post-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar-small {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-red {
  color: #f44336;
}

.material-icons {
  font-size: 24px;
}

.d-flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.align-start {
  align-items: flex-start;
}

.flex-grow-1 {
  flex-grow: 1;
}

.mr-1 {
  margin-right: 4px;
}

.mr-2 {
  margin-right: 8px;
}

.mr-3 {
  margin-right: 12px;
}

.mr-4 {
  margin-right: 16px;
}

.ml-2 {
  margin-left: 8px;
}

.ml-4 {
  margin-left: 16px;
}

.mb-2 {
  margin-bottom: 8px;
}

.mb-4 {
  margin-bottom: 16px;
}

.mt-1 {
  margin-top: 4px;
}

.mb-0 {
  margin-bottom: 0;
}

.px-6 {
  padding-left: 24px;
  padding-right: 24px;
}

.py-3 {
  padding-top: 12px;
  padding-bottom: 12px;
}

.py-4 {
  padding-top: 16px;
  padding-bottom: 16px;
}

.text-subtitle-1 {
  font-size: 16px;
  line-height: 1.5;
  color: black;
}

.text-subtitle-2 {
  font-size: 14px;
  line-height: 1.2;
  color: black;
}

.text-body-2 {
  font-size: 14px;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.87);
}

.text-caption {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
}

.text-grey {
  color: rgba(0, 0, 0, 0.6);
}

.font-weight-bold {
  font-weight: 700;
}

.font-weight-medium {
  font-weight: 500;
}

.divider-line {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  margin: 16px -24px;
  width: calc(100% + 48px);
}

@media (max-width: 959px) {
  .post-grid {
    grid-template-columns: 1fr;
  }

  .post-image-section {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    height: 550px;
  }

  .post-container {
    padding: 16px;
  }
}

.icon-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #262626;
}

.icon-heart {
  font-size: 24px;
  line-height: 1;
  color: #262626;
}

.icon-heart.is-liked {
  color: #ed4956;
}

.icon-comment {
  font-size: 20px;
  line-height: 1;
}

.count {
  font-size: 14px;
  font-weight: 500;
  color: #262626;
}

.ml-3 {
  margin-left: 12px;
}

.ml-1 {
  margin-left: 4px;
}

.justify-space-between {
  justify-content: space-between;
}

.icon-bookmark {
  font-size: 24px;
  line-height: 1;
  color: #262626;
  transition: transform 0.2s ease;
}

.icon-bookmark.is-bookmarked {
  color: #262626;
  transform: scale(1.1);
}

.icon-text {
  font-family: "Material Icons";
  font-size: 16px;
  color: #262626;
  line-height: 1;
}

.interaction-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.icon {
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
}

.heart-outline {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>');
}

.heart-filled {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="red" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>');
}

.comment-outline {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>');
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1;
  color: #333;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-50%) scale(1.1);
}

.prev-button {
  left: 16px;
}

.next-button {
  right: 16px;
}

.image-indicator {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}
</style>
