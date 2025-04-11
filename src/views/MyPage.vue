<!-- 
  MyPage.vue - 메인 프로필 페이지 컴포넌트
  사용자의 프로필 정보와 게시물을 표시하는 메인 페이지
-->
<template>
  <div class="mypage">
    <div class="content">
      <!-- 프로필 섹션: 사용자 정보 표시 -->
      <Profile @open-edit-modal="showEditModal = true" />
      <!-- 게시물 컨테이너: POST와 HOONSOO 섹션을 포함 -->
      <div class="post-container">
        <!-- POST 섹션: 사용자의 일반 게시물 표시 -->
        <div class="post-section">
          <div class="section-title">POST</div>
          <div class="post-grid">
            <PostGrid :posts="myPosts" />
          </div>
        </div>
        <!-- HOONSOO 섹션: 훈수 게시물 표시 -->
        <div class="hoonsoo-section">
          <div class="section-title">HOONSOO</div>
          <div class="post-grid">
            <PostGrid :posts="hoonsoPosts" />
          </div>
        </div>
      </div>
    </div>
    <!-- 프로필 수정 모달: showEditModal이 true일 때만 표시 -->
    <ProfileEditModal v-if="showEditModal" @close="showEditModal = false" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Profile from '../components/Profile.vue'
import PostGrid from '../components/PostGrid.vue'
import ProfileEditModal from '../components/ProfileEditModal.vue'
import { MY_POSTS, HOONSOO_POSTS } from '../constants/images'

export default {
  name: 'MyPage',
  components: {
    Profile,
    PostGrid,
    ProfileEditModal
  },
  setup() {
    // 모달 표시 상태를 관리하는 반응형 변수
    const showEditModal = ref(false)
    return {
      showEditModal,
      myPosts: MY_POSTS,      // 일반 게시물 데이터
      hoonsoPosts: HOONSOO_POSTS  // 훈수 게시물 데이터
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
  border-bottom: 1px solid rgba(0, 0, 0, 1);
  color: rgb(0, 0, 0);
}

.post-grid {
  margin-top: 20px;
}

.post-section, .hoonsoo-section {
  margin-top: 0px;
  margin-bottom: 30px;
  margin-left: 30px;
  margin-right: 30px;
}

.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(242, 240, 241, 0.9);
  border-radius: 30px;
  padding: 20px;
  width: 90%;
  margin: 0 auto;
}
</style> 