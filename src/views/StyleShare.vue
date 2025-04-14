<template>
  <div class="home-container">
    <HeroSection />
    <div class="content-wrapper">
      <div class="content-card">
        <WeeklyBestSection :posts="weeklyBestPosts" />
        <div class="divider"></div>
        <MainContentSection
          :posts="mainPosts"
          :sort-by="sortBy"
          :is-loading="isLoading"
          @update:sort-by="handleSortChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import HeroSection from "../components/HeroSection.vue";
import WeeklyBestSection from "../components/WeeklyBestSection.vue";
import MainContentSection from "../components/MainContentSection.vue";
import { useRouter } from "vue-router";
// import { boardAPI } from "@/services/api";

const router = useRouter();
const sortBy = ref("newest");
const isLoading = ref(true);
const allPosts = ref([]);

const fetchPosts = async () => {
  try {
    isLoading.value = true;
    console.log("Fetching posts with sortBy:", sortBy.value);
    if (sortBy.value === "likes") {
      console.log("Fetching like boards...");
      const data = await boardAPI.getLikeBoards();
      console.log("Received like boards data:", JSON.stringify(data, null, 2));
      allPosts.value = data;
    } else {
      console.log("Fetching newest boards...");
      const data = await boardAPI.getNewestBoards();
      console.log(
        "Received newest boards data:",
        JSON.stringify(data, null, 2)
      );
      allPosts.value = data;
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  } finally {
    isLoading.value = false;
  }
};

const weeklyBestPosts = computed(() => {
  if (!allPosts.value) return [];
  return [...allPosts.value]
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 6);
});

const mainPosts = computed(() => {
  if (!allPosts.value) return [];
  return allPosts.value;
});

const handleSortChange = async (value) => {
  sortBy.value = value;
  await fetchPosts();
};

const goToPostDetail = (postId) => {
  router.push(`/boards/${postId}`);
};

onMounted(async () => {
  await fetchPosts();
});
</script>

<style scoped>
.home-container {
  background-color: black;
  min-height: 100vh;
}

.content-wrapper {
  width: 100%;
  padding: 0;
  padding-bottom: 64px;
}

.content-card {
  background-color: white;
  border-radius: 24px;
  margin: 0;
  padding-bottom: 60px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14),
    0 1px 14px 0 rgba(0, 0, 0, 0.12);
}

.divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.12);
  margin: 16px 0;
}

.weekly-best-section {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

.weekly-best {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  padding: 0 24px;
}

.best-posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 0 24px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  padding: 0 24px;
}

.post-card,
.best-post-card {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.post-card:hover,
.best-post-card:hover {
  transform: translateY(-4px);
}

.post-image-container {
  position: relative;
  padding-top: 100%;
}

.post-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-card:hover .post-overlay,
.best-post-card:hover .post-overlay {
  opacity: 1;
}

.post-stats {
  display: flex;
  gap: 24px;
  color: white;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.heart-icon {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"/></svg>');
}

.comment-icon {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22H9M10,16V19.08L13.08,16H20V4H4V16H10Z"/></svg>');
}

.sort-options {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding: 0 24px;
}

.sort-button {
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-button:hover {
  background-color: #f5f5f5;
}

.sort-button.active {
  background-color: #1976d2;
  color: white;
  border-color: #1976d2;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #1976d2;
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

@media (max-width: 1200px) {
  .posts-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .posts-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .best-posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .best-posts-grid {
    grid-template-columns: 1fr;
  }

  .content-card {
    padding: 16px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 16px;
  }
}

@media (max-width: 600px) {
  .home-container {
    padding: 16px;
  }

  .content-card {
    padding: 16px;
  }
}
</style>
