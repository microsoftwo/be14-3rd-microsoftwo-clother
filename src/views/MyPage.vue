<!-- 
  MyPage.vue - 메인 프로필 페이지 컴포넌트
  사용자의 프로필 정보와 게시물을 표시하는 메인 페이지
-->
<template>
  <div class="mypage">
    <div class="content">
      <!-- 프로필 섹션: 사용자 정보 표시 -->
      <Profile />
      
      <!-- 게시물 컨테이너: POST와 STYLE SHARE 섹션을 포함 -->
      <div class="post-container">
        <div class="post-section">
          <div class="section-title">POST</div>
          <div class="post-grid">
            <PostGrid :posts="myPosts" />
          </div>
        </div>
        <div class="style-share-section">
          <div class="section-title">STYLE SHARE</div>
          <div class="post-grid">
            <PostGrid :posts="styleSharePosts" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from '../components/Profile.vue'
import PostGrid from '../components/PostGrid.vue'
import { MY_POSTS, STYLE_SHARE_POSTS } from '../constants/images'
import { ref } from 'vue'

export default {
  name: 'MyPage',
  components: {
    Profile,
    PostGrid
  },
  setup() {
    const myPosts = ref(MY_POSTS)
    const styleSharePosts = ref(STYLE_SHARE_POSTS)

    return {
      myPosts,
      styleSharePosts
    }
  }
}
</script>

<style scoped>
.mypage {
  width: 100%;
  min-height: 100vh;
  background-color: black;
  color: white;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px 20px;
}

.section-title {
  text-align: left;
  font-size: 12px;
  font-weight: bold;
  margin: 20px 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.9);
  color: rgb(0, 0, 0);
}

.post-grid {
  margin-top: 20px;
}

.post-section, .style-share-section {
  margin-top: 0px;
  margin-bottom: 30px;
  margin-left: 30px;
  margin-right: 30px;
}

.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  padding: 20px;
  width: 90%;
  margin: 0 auto;
  min-height: 400px;
}
</style> 