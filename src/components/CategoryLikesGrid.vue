<template>
    <div class="image-grid" @scroll="handleScroll">
      <template v-for="(post, index) in posts" :key="post.id">
        <ImageCard
          v-if="post && post.thumbnailUrl"
          :imageUrl="post.thumbnailUrl"
          :index="index + 1"
          :showIndex="true"
          :postId="post.id"
          @image-clicked="navigateToPostDetail"
        />
      </template>
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </template>
  
  <script>
  import ImageCard from './ImageCard.vue'
  import axios from 'axios'
  
  export default {
    name: 'CategoryLikesGrid',
    components: {
      ImageCard
    },
    props: {
      categoryId: {
        type: String,
        required: true
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
          let url = `/api/post/feed?sort=likes&categoryIds=${this.categoryId}`;
          
          if (this.lastPostId) {
            url += `&lastPostId=${this.lastPostId}`;
          }
          
          console.log('API Request URL:', url);
          
          const response = await axios.get(url);
          const newPosts = response.data;
          
          if (newPosts.length < 20) {
            this.hasMore = false;
          }
          
          if (newPosts.length > 0) {
            this.lastPostId = newPosts[newPosts.length - 1].id;
            this.posts = [...this.posts, ...newPosts];
          }
        } catch (error) {
          console.error('Failed to fetch posts:', error);
        } finally {
          this.loading = false;
        }
      },
      handleScroll(e) {
        const element = e.target;
        if (element.scrollHeight - element.scrollTop <= element.clientHeight + 100) {
          this.fetchPosts();
        }
      },
      navigateToPostDetail(postId) {
      this.$router.push(`/post-detail/${postId}`); // 라우터로 이동
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