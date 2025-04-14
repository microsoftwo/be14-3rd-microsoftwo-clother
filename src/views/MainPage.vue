<template>
    <div class="main-page">
      <div class="nav-container">
        <div class="sub-nav">
          <router-link :to="likesPath" class="sub-nav-button" :class="{ 'active': isLikesActive }">LIKES</router-link>
          <router-link :to="newestPath" class="sub-nav-button" :class="{ 'active': isNewestActive }">NEWEST</router-link>
        </div>
        <router-link to="/posting" class="post-button">
          <span class="post-icon">✎</span>
          POST
        </router-link>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainPage',
    computed: {
      currentPath() {
        return this.$route.path
      },
      isCategoryPage() {
        return this.currentPath.match(/^\/(look|hair|makeup)\//)
      },
      currentCategory() {
        if (!this.isCategoryPage) return null
        const match = this.currentPath.match(/^\/(look|hair|makeup)\/([^/]+)/)
        return match ? { type: match[1], category: match[2] } : null
      },
      likesPath() {
        return this.currentCategory 
          ? `/${this.currentCategory.type}/${this.currentCategory.category}/likes` 
          : '/likes'
      },
      newestPath() {
        return this.currentCategory 
          ? `/${this.currentCategory.type}/${this.currentCategory.category}/latest` 
          : '/newest'
      },
      isLikesActive() {
        return this.currentPath.endsWith('/likes') || this.currentPath === '/likes'
      },
      isNewestActive() {
        return this.currentPath.endsWith('/latest') || this.currentPath === '/newest'
      }
    }
  }
  </script>
  
  <style scoped>
  .main-page {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  .nav-container {
    padding: 5rem 2rem 0rem 3rem;   /* top right bottom left */
    background-color: black;
    width: 100%;
    margin-bottom: 5px;               /* 아래 콘텐츠와의 간격 줄이기 */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .sub-nav {
    display: flex;
    gap: 1rem;
    margin-left: 20px;                /* likes, newest 버튼 오른쪽으로 이동 */
  }
  
  
  .sub-nav-button {
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #666;
    border-radius: 20px;
    font-size: 0.9rem;
    background-color: #f0f0f0;
    transition: all 0.2s ease;
  }
  
  .sub-nav-button.active {
    background-color: #666;
    color: white;
  }
  
  .post-button {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0.5rem 1rem;
    background-color: #f0f0f0;
    color: #666;
    text-decoration: none;
    border-radius: 20px;
    margin-right: 40px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .post-button:hover {
    background-color: #666;
    color: white;
  }
  
  .post-icon {
    font-size: 14px;
  }
  
  .content {
    flex: 1;
    padding: 20px;
  }
  </style> 