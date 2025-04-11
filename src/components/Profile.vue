<!-- 
  Profile.vue - 사용자 프로필 컴포넌트
  사용자의 프로필 이미지, 이름, 키/몸무게, 소개글을 표시
-->
<template>
  <div class="profile">
    <div class="profile-content">
      <!-- 프로필 이미지 컨테이너 -->
      <div class="profile-image-container">
        <img :src="profileImage" alt="Profile" class="profile-image" />
      </div>
      <!-- 프로필 정보 컨테이너 -->
      <div class="profile-info">
        <div class="info-row">
          <h1 class="username">michalamet</h1>
        </div>
        <div class="stats-row">
          <span class="stats">165cm 45kg</span>
          <!-- 프로필 수정 버튼 -->
          <button class="edit-button" @click="openEditModal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.5626 2.87868 19.1022 3.10217 19.5 3.5C19.8978 3.89782 20.1213 4.43739 20.1213 5C20.1213 5.56261 19.8978 6.10217 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- 사용자 소개글 -->
    <p class="bio">귀여운 게 최고야</p>
  </div>
</template>

<script>
import profileImage from '../icons/profile-mando.jpg'

export default {
  name: 'Profile',
  data() {
    return {
      profileImage
    }
  },
  methods: {
    // 프로필 수정 모달 열기
    openEditModal() {
      this.$emit('open-edit-modal')
    }
  }
}
</script>

<style scoped>
/* 프로필 컨테이너 스타일 */
.profile {
  padding: 20px;
  background: transparent;
  color: white;
  display: flex;
  margin-left: 38px;
  flex-direction: column;
}

/* 프로필 내용 컨테이너 스타일 */
.profile-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

/* 프로필 이미지 컨테이너 스타일 */
.profile-image-container {
  flex-shrink: 0;
}

/* 프로필 이미지 스타일 */
.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

/* 프로필 정보 컨테이너 스타일 */
.profile-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 사용자 이름 행 스타일 */
.info-row {
  display: flex;
  align-items: center;
}

/* 사용자 이름 스타일 */
.username {
  font-size: 1.2rem;
  margin: 0;
  color: #F05EC9;
  font-weight: 500;
}

/* 키/몸무게 행 스타일 */
.stats-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 키/몸무게 텍스트 스타일 */
.stats {
  font-size: 1rem;
  color: #999;
}

/* 수정 버튼 스타일 */
.edit-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

/* 수정 버튼 호버 효과 */
.edit-button:hover {
  color: white;
}

/* 소개글 스타일 */
.bio {
  font-size: 1rem;
  color: white;
  text-align: left;
  margin-left: 0;
  padding-left: 0;
  display: block;
  margin-top: 10px;
  margin-bottom: 1px;
}
</style> 