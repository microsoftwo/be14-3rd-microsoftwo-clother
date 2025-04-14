<template>
  <div class="container">
    <div class="header">
      <div class="sort-buttons">
        <button
          class="sort-btn"
          :class="{ active: sortBy === 'likes' }"
          @click="handleSortChange('likes')"
          :disabled="isLoading"
        >
          LIKES
        </button>
        <button
          class="sort-btn"
          :class="{ active: sortBy === 'newest' }"
          @click="handleSortChange('newest')"
          :disabled="isLoading"
        >
          NEWEST
        </button>
      </div>
      <div class="search-container">
        <select v-model="searchType" class="search-select">
          <option
            v-for="option in searchOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.title }}
          </option>
        </select>

        <div class="search-bar">
          <input type="text" v-model="search" placeholder="Search..." />
          <button class="search-icon" @click="handleSearch">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading-bar"></div>

    <div v-if="posts && posts.length > 0">
      <style-grid :posts="posts" layout="main"></style-grid>
    </div>
    <div v-else class="no-posts">No posts available</div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import StyleGrid from "./StyleGrid.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  posts: {
    type: Array,
    required: true,
    default: () => [],
  },
  sortBy: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:sort-by"]);

const search = ref("");
const searchType = ref("content");
const router = useRouter();

const searchOptions = [
  { title: "Content", value: "content" },
  { title: "Title", value: "title" },
  { title: "Content & Title", value: "both" },
];

const handleSortChange = (value) => {
  emit("update:sort-by", value);
};

const handleSearch = () => {
  if (search.value.trim()) {
    router.push({
      path: "/boards/search",
      query: {
        keyword: search.value.trim(),
        sortBy: searchType.value,
      },
    });
  }
};

// 데이터 변경 감지
watch(
  () => props.posts,
  (newPosts) => {
    console.log("Posts updated:", newPosts);
  },
  { deep: true }
);
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
  padding: 16px 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.sort-buttons {
  display: flex;
  gap: 8px;
}

.sort-btn {
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.3s;
}

.sort-btn.active {
  color: #1976d2;
  font-weight: 600;
  position: relative;
}

.sort-btn.active::after {
  content: "";
  position: absolute;
  bottom: -16px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1976d2;
}

.sort-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-select {
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ddd;
  background: none;
  font-size: 14px;
  outline: none;
  cursor: pointer;
}

.search-bar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 4px;
}

.search-bar input {
  border: none;
  outline: none;
  padding: 4px;
  font-size: 14px;
  width: 200px;
}

.search-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-bar {
  height: 4px;
  background: linear-gradient(to right, #1976d2, #64b5f6);
  animation: loading 1.5s infinite;
  margin-bottom: 16px;
}

@keyframes loading {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.no-posts {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
}
</style>
