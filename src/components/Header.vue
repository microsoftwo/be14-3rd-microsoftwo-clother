<!-- 
  Header.vue - 상단 네비게이션 바 컴포넌트
  로고, 메뉴 링크, 검색창, 프로필 드롭다운을 포함하는 헤더
-->
<template>
  <header class="header">
    <!-- 왼쪽 섹션: 로고와 네비게이션 링크 -->
    <div class="left-section">
      <router-link to="/" class="logo">clother</router-link>
      <nav class="nav-links">
        <router-link to="/hair">HAIR</router-link>
        <router-link to="/makeup">MAKEUP</router-link>
        <router-link to="/look">LOOK</router-link>
        <router-link to="/tag"># TAG</router-link>
        <router-link to="/hoonsoo">HOONSOO</router-link>
      </nav>
    </div>
    <!-- 오른쪽 섹션: 검색창과 프로필 -->
    <div class="right-section">
      <!-- 검색창 -->
      <div class="search-bar">
        <input type="text" placeholder="Search..." />
        <button class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
      <!-- 프로필 드롭다운 컨테이너 -->
      <div class="profile-container" @click="toggleDropdown" ref="profileContainer">
        <div class="profile-section">
          <img :src="userProfileImage" alt="Profile" class="profile-image" />
          <span class="username">{{ username }}</span>
          <svg class="dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <!-- 드롭다운 메뉴 -->
        <div v-if="isDropdownOpen" class="dropdown-menu">
          <div class="dropdown-header">
            <img :src="userProfileImage" alt="Profile" class="dropdown-profile-image" />
            <span class="dropdown-username">{{ username }}</span>
          </div>
          <div class="dropdown-items">
            <div class="dropdown-item" @click="goToMyProfile">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>내 프로필</span>
            </div>
            <div class="dropdown-item" @click="editProfile">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.5626 2.87868 19.1022 3.10217 19.5 3.5C19.8978 3.89782 20.1213 4.43739 20.1213 5C20.1213 5.56261 19.8978 6.10217 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>회원 정보 수정</span>
            </div>
            <div class="dropdown-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>나의 활동 기록</span>
            </div>
            <div class="dropdown-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 12H9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>로그아웃</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import profileImage from '../icons/profile-mando.JPG'

export default {
  name: 'Header',
  data() {
    return {
      username: 'michalamet',
      userProfileImage: profileImage,
      isDropdownOpen: false
    }
  },
  methods: {
    // 드롭다운 메뉴 토글
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    // 프로필 수정 모달 열기
    editProfile() {
      this.$emit('open-profile-edit')
      this.isDropdownOpen = false
    },
    // 내 프로필 페이지로 이동
    goToMyProfile() {
      this.$router.push('/mypage')
      this.isDropdownOpen = false
    },
    // 드롭다운 외부 클릭 시 닫기
    handleClickOutside(event) {
      if (this.$refs.profileContainer && !this.$refs.profileContainer.contains(event.target)) {
        this.isDropdownOpen = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem 0rem 2rem;
  background-color: black;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.logo {
  font-size: 1.5rem;
  font-family: 'Abril Fatface', cursive;
  color: white;
  text-decoration: none;
  font-weight: bold;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #888;
}

.nav-links a.router-link-active {
  color: #888;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 0.3rem 1rem;
  width: 300px;
}

.search-bar input {
  background: transparent;
  border: none;
  color: white;
  width: 100%;
  padding: 0.2rem;
  font-size: 0.9rem;
}

.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-bar input:focus {
  outline: none;
}

.search-icon {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.profile-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.profile-section:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.profile-image {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  color: white;
  font-size: 0.8rem;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background-color: #1a1a1a;
  border-radius: 8px;
  width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.dropdown-header {
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.dropdown-profile-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.dropdown-username {
  font-weight: 500;
  font-size: 0.9rem;
}

.dropdown-items {
  padding: 4px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown-item svg {
  width: 16px;
  height: 16px;
}

.dropdown-item span {
  font-size: 0.85rem;
}
</style> 