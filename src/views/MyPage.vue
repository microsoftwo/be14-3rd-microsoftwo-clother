<template>
  <div class="mypage">
    <div class="content">
      <Profile @open-edit-modal="showEditModal = true" />
      <div class = "post-container" >
        <div class="post-section">
          <div class="section-title">POST</div>
          <div class="post-grid">
            <PostGrid :posts="myPosts" />
          </div>
        </div>
        <div class="hoonsoo-section">
          <div class="section-title">HOONSOO</div>
          <div class="post-grid">
            <PostGrid :posts="hoonsoPosts" />
          </div>
        </div>
    </div>
    </div>
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
    const showEditModal = ref(false)
    return {
      showEditModal,
      myPosts: MY_POSTS,
      hoonsoPosts: HOONSOO_POSTS
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
  margin: 10px 10px 20px;
  padding-bottom: 3px;
  border-bottom: 1px solid rgba(0, 0, 0, 1);
  color: rgb(0, 0, 0);
}

.post-grid {
  margin-top: 20px;
}

.post-section, .hoonsoo-section {
  margin-top: 0px;
  margin-bottom: 20px;
}

.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(242, 240, 241, 0.9);
  border-radius: 30px;
  padding: 20px;
  width: 80%;
  margin: 0 auto;
}
</style> 