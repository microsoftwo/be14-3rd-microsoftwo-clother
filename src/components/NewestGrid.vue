<template>
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
  </template>
  
  <script>
  import ImageCard from './ImageCard.vue'
  import axios from 'axios'
  
  export default {
    name: 'NewestGrid',
    components: {
      ImageCard
    },
    props: {
      categoryId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        posts: [],
        loading: false,
        lastPostId: null,
        hasMore: true
      }
    },
    methods: {
      async fetchPosts() {
        if (this.loading || !this.hasMore) return;
        
        try {
          this.loading = true;
          let url = `/api/post/feed?sort=latest`;
          
          if (this.lastPostId) {
            url += `&lastPostId=${this.lastPostId}`;
          }
          
          console.log('API Request URL:', url);
          const response = await axios.get(url);
          console.log('API Response:', response.data);
          
          const newPosts = response.data;
          
          if (newPosts.length === 0 || newPosts.length < 20) {
            this.hasMore = false;
          }
          
          if (newPosts.length > 0) {
            console.log('Last post in new batch:', newPosts[newPosts.length - 1]);
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
    created() {
      this.fetchPosts();
    },
    watch: {
      categoryId: {
        handler() {
          this.posts = [];
          this.lastPostId = null;
          this.hasMore = true;
          this.fetchPosts();
        },
        immediate: true
      }
    }
  }
  </script>
  
  <style scoped>
  .image-grid {
    display: grid;
    grid-template-columns: repeat(5, 250px);
    gap: 20px;
    padding: 20px 0;
    justify-content: center;
    margin: 0 auto;
    height: calc(100vh - 180px);
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