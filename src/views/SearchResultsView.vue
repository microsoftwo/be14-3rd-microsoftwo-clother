<template>
  <div class="search-results-view">
    <div class="search-header">
      <h1 class="search-title" style="color: black">검색 결과</h1>
      <div class="search-info">
        <span class="keyword">"{{ keyword }}"</span>
      </div>
      <div class="sort-options">
        <div class="toggle-group">
          <button
            :class="['toggle-btn', selectedSort === 'title' ? 'active' : '']"
            @click="selectedSort = 'title'"
          >
            제목
          </button>
          <button
            :class="['toggle-btn', selectedSort === 'content' ? 'active' : '']"
            @click="selectedSort = 'content'"
          >
            내용
          </button>
          <button
            :class="[
              'toggle-btn',
              selectedSort === 'title+content' ? 'active' : '',
            ]"
            @click="selectedSort = 'title+content'"
          >
            제목+내용
          </button>
        </div>
      </div>
    </div>

    <search-results :keyword="keyword" :sort-by="selectedSort" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import SearchResults from "../components/SearchResults.vue";

const router = useRouter();
const route = useRoute();

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

const selectedSort = ref(props.sortBy);
const results = ref([]);

// 정렬 방식이 변경될 때 URL 업데이트
watch(selectedSort, (newSort) => {
  router.push({
    path: "/boards/search",
    query: {
      keyword: props.keyword,
      sortBy: newSort,
    },
  });
});
</script>

<style scoped>
.search-results-view {
  padding: 24px;
  max-width: 1200px;
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

.result-count {
  margin-left: 8px;
}

.sort-options {
  margin-top: 24px;
}

.toggle-group {
  display: inline-flex;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
}

.toggle-btn {
  padding: 8px 16px;
  border: none;
  background: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.toggle-btn.active {
  background-color: #1976d2;
  color: white;
}

@media (max-width: 600px) {
  .search-results-view {
    padding: 16px;
  }

  .search-header {
    padding: 0 16px;
  }

  .toggle-group {
    display: flex;
    width: 100%;
  }

  .toggle-btn {
    flex: 1;
    text-align: center;
    white-space: nowrap;
  }
}
</style>
