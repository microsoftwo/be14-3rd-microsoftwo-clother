<template>
    <div class="category-page">
      <div class="category-icons">
        <div 
          v-for="icon in categoryIcons" 
          :key="icon.id"
          :class="['icon-item', { active: selectedSubCategory === icon.category }]"
        >
          <img :src="icon.imageUrl" :alt="icon.category">
          <span>{{ icon.category }}</span>
        </div>
      </div>
      <div class="image-grid" ref="grid" @scroll="handleScroll">
        <template v-for="(post, index) in posts" :key="post.id">
          <ImageCard
            v-if="post && post.thumbnailUrl"
            :imageUrl="post.thumbnailUrl"
            :showIndex="false"
          />
        </template>
        <div v-if="loading" class="loading">Loading...</div>
      </div>
    </div>
  </template>
  
  <script>
  import ImageCard from './ImageCard.vue'
  import axios from 'axios'
  
  export default {
    name: 'CategoryGrid',
    components: {
      ImageCard
    },
    props: {
      mainCategory: {
        type: String,
        required: true
      },
      subCategory: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        posts: [],
        loading: false,
        lastPostId: null,
        hasMore: true,
        selectedSubCategory: '',
        categoryIcons: [
          { id: 1, category: '아우터', imageUrl: '/icons/outer.png' },
          { id: 2, category: '코트', imageUrl: '/icons/coat.png' },
          { id: 3, category: '패딩', imageUrl: '/icons/padding.png' },
          { id: 4, category: '무스탕', imageUrl: '/icons/mustang.png' },
          { id: 5, category: '가디건', imageUrl: '/icons/cardigan.png' },
          { id: 6, category: '플리스', imageUrl: '/icons/fleece.png' },
          { id: 7, category: '자켓', imageUrl: '/icons/jacket.png' },
          { id: 8, category: '점퍼', imageUrl: '/icons/jumper.png' },
          { id: 9, category: '기타', imageUrl: '/icons/etc.png' },
          { id: 10, category: '#TAG', imageUrl: '/icons/tag.png' }
        ]
      }
    },
    methods: {
      async fetchPosts() {
        if (this.loading || !this.hasMore) return;
        
        try {
          this.loading = true;
          const url = this.lastPostId 
            ? `/api/post/category/${this.mainCategory}/${this.subCategory}?lastId=${this.lastPostId}`
            : `/api/post/category/${this.mainCategory}/${this.subCategory}`;
          
          console.log('API Request URL:', url);
          const response = await axios.get(url);
          console.log('API Response:', response.data);
          
          const newPosts = response.data;
          
          if (newPosts.length === 0 || newPosts.length < 20) {
            this.hasMore = false;
          }
          
          if (newPosts.length > 0) {
            this.lastPostId = newPosts[newPosts.length - 1].id;
            this.posts = [...this.posts, ...newPosts.filter(post => post && post.thumbnailUrl)];
          }
        } catch (error) {
          console.error('Failed to fetch posts:', error);
        } finally {
          this.loading = false;
        }
      },
      handleScroll(e) {
        const grid = this.$refs.grid;
        const scrollPosition = grid.scrollTop + grid.clientHeight;
        const scrollThreshold = grid.scrollHeight - 100;
        
        if (scrollPosition >= scrollThreshold && !this.loading) {
          this.fetchPosts();
        }
      }
    },
    watch: {
      subCategory: {
        immediate: true,
        handler(newCategory) {
          this.selectedSubCategory = newCategory;
          this.posts = [];
          this.lastPostId = null;
          this.hasMore = true;
          this.fetchPosts();
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .category-page {
    padding-top: 20px;
  }
  
  .category-icons {
    display: flex;
    gap: 20px;
    padding: 20px;
    overflow-x: auto;
    margin-bottom: 20px;
    justify-content: center;
  }
  
  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  
  .icon-item img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .icon-item span {
    font-size: 12px;
    color: #666;
  }
  
  .icon-item.active {
    background-color: rgba(0, 0, 0, 0.1);
    img {
      border: 2px solid black;
    }
    span {
      color: black;
      font-weight: bold;
    }
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(5, 250px);
    gap: 20px;
    padding: 20px 0;
    justify-content: center;
    margin: 0 auto;
    height: calc(100vh - 280px);
    overflow-y: auto;
  }
  
  .loading {
    grid-column: 1 / -1;
    text-align: center;
    padding: 20px;
    color: #666;
  }
  
  @media (max-width: 1400px) {
    .image-grid {
      grid-template-columns: repeat(4, 250px);
    }
  }
  
  @media (max-width: 1100px) {
    .image-grid {
      grid-template-columns: repeat(3, 250px);
    }
  }
  
  @media (max-width: 850px) {
    .image-grid {
      grid-template-columns: repeat(2, 250px);
    }
  }
  
  @media (max-width: 580px) {
    .image-grid {
      grid-template-columns: repeat(1, 250px);
    }
  }
  </style> 