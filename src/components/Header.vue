<!-- 
  Header.vue - 상단 네비게이션 바 컴포넌트
  로고, 메뉴 링크, 검색창, 프로필 드롭다운을 포함하는 헤더
-->
<template>
  <header class="header">
    <!-- 로고 섹션 -->
    <div class="logo-section">
      <router-link to="/likes" class="logo">clother</router-link>
    </div>
    <!-- 네비게이션 링크 섹션 -->
    <nav class="nav-links">
      <div class="nav-dropdown">
        <div class="nav-link-wrapper" @click="toggleHairMenu">
          <span class="nav-link">HAIR</span>
          <svg class="dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ 'rotated': showHairMenu }">
            <path d="M6 9L12 15L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="nav-dropdown-content" v-show="showHairMenu"></div>
        <div class="nav-dropdown-content" v-show="showHairMenu" @click="closeHairMenu">
          <div class="nav-categories">
            <div class="category-column">
              <h3>염색</h3>
              <router-link to="/hair/black">블랙</router-link>
              <router-link to="/hair/brown">브라운</router-link>
              <router-link to="/hair/blonde">블론드</router-link>
              <router-link to="/hair/red">레드</router-link>
              <router-link to="/hair/blue">블루</router-link>
              <router-link to="/hair/purple">퍼플</router-link>
              <router-link to="/hair/pink">핑크</router-link>
              <router-link to="/hair/etc-color">기타</router-link>
            </div>
            <div class="category-column">
              <h3>펌</h3>
              <router-link to="/hair/men-perm">남성 펌</router-link>
              <router-link to="/hair/women-perm">여성 펌</router-link>
            </div>
            <div class="category-column">
              <h3>커트</h3>
              <router-link to="/hair/men-cut">남성 커트</router-link>
              <router-link to="/hair/women-cut">여성 커트</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-dropdown">
        <div class="nav-link-wrapper" @click="toggleMakeupMenu">
          <span class="nav-link">MAKEUP</span>
          <svg class="dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ 'rotated': showMakeupMenu }">
            <path d="M6 9L12 15L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="nav-dropdown-content" v-show="showMakeupMenu" @click="closeMakeupMenu">
          <div class="nav-categories">
            <div class="category-column">
              <h3>베이스</h3>
              <router-link to="/makeup/cushion">쿠션</router-link>
              <router-link to="/makeup/foundation">파운데이션</router-link>
              <router-link to="/makeup/bb-cream">BB크림</router-link>
              <router-link to="/makeup/powder">파우더</router-link>
              <router-link to="/makeup/etc-base">기타</router-link>
            </div>
            <div class="category-column">
              <h3>립</h3>
              <router-link to="/makeup/lipstick">립스틱</router-link>
              <router-link to="/makeup/tint">립틴트</router-link>
              <router-link to="/makeup/gloss">립글로스</router-link>
              <router-link to="/makeup/balm">립밤</router-link>
              <router-link to="/makeup/etc-lip">기타</router-link>
            </div>
            <div class="category-column">
              <h3>아이브로우</h3>
              <router-link to="/makeup/eyebrow-pencil">아이브로우 펜슬</router-link>
              <router-link to="/makeup/eyebrow-powder">아이브로우 파우더</router-link>
              <router-link to="/makeup/eyebrow-mascara">브로우 마스카라</router-link>
              <router-link to="/makeup/eyebrow-tint">브로우 틴트</router-link>
              <router-link to="/makeup/etc-eyebrow">기타</router-link>
            </div>
            <div class="category-column">
              <h3>아이섀도우</h3>
              <router-link to="/makeup/matt-shadow">매트 섀도우</router-link>
              <router-link to="/makeup/shimmer-shadow">쉬머 섀도우</router-link>
              <router-link to="/makeup/glitter-shadow">글리터 섀도우</router-link>
              <router-link to="/makeup/etc-shadow">기타</router-link>
            </div>
            <div class="category-column">
              <h3>아이라이너</h3>
              <router-link to="/makeup/pencil-liner">펜슬 아이라이너</router-link>
              <router-link to="/makeup/liquid-liner">리퀴드 아이라이너</router-link>
              <router-link to="/makeup/etc-liner">기타</router-link>
            </div>
            <div class="category-column">
              <h3>속눈썹</h3>
              <router-link to="/makeup/mascara">마스카라</router-link>
              <router-link to="/makeup/volume">볼륨</router-link>
              <router-link to="/makeup/etc-lash">기타</router-link>
            </div>
            <div class="category-column">
              <h3>기타</h3>
              <router-link to="/makeup/highlight">하이라이터</router-link>
              <router-link to="/makeup/shading">쉐이딩</router-link>
              <router-link to="/makeup/blusher">블러셔</router-link>
              <router-link to="/makeup/makeup-review">메이크업 리뷰</router-link>
              <router-link to="/makeup/makeup-brush">메이크업 브러쉬</router-link>
              <router-link to="/makeup/makeup-puff">메이크업 퍼프</router-link>
              <router-link to="/makeup/etc">기타</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="look-dropdown">
        <div class="look-link-wrapper" @click="toggleLookMenu">
          <span class="look-link">LOOK</span>
          <svg class="dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ 'rotated': showLookMenu }">
            <path d="M6 9L12 15L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="look-dropdown-content" v-show="showLookMenu" @click="closeLookMenu">
          <div class="look-categories">
            <div class="category-column">
              <h3>아우터</h3>
              <router-link to="/look/coat">코트</router-link>
              <router-link to="/look/padding">패딩</router-link>
              <router-link to="/look/mustang">무스탕</router-link>
              <router-link to="/look/cardigan">가디건</router-link>
              <router-link to="/look/fleece">플리스</router-link>
              <router-link to="/look/jacket">자켓</router-link>
              <router-link to="/look/jumper">점퍼</router-link>
              <router-link to="/look/etc-outer">기타</router-link>
            </div>
            <div class="category-column">
              <h3>상의</h3>
              <router-link to="/look/mantoman">맨투맨</router-link>
              <router-link to="/look/hood">후드</router-link>
              <router-link to="/look/knit">니트</router-link>
              <router-link to="/look/shirt">셔츠</router-link>
              <router-link to="/look/long-sleeve">긴팔티</router-link>
              <router-link to="/look/short-sleeve">반팔티</router-link>
              <router-link to="/look/sleeveless">민소매</router-link>
              <router-link to="/look/etc-top">기타</router-link>
            </div>
            <div class="category-column">
              <h3>하의</h3>
              <router-link to="/look/denim-pants">데님팬츠</router-link>
              <router-link to="/look/cotton-pants">코튼팬츠</router-link>
              <router-link to="/look/cargo-pants">카고팬츠</router-link>
              <router-link to="/look/training-pants">트레이닝팬츠</router-link>
              <router-link to="/look/slacks">슬랙스</router-link>
              <router-link to="/look/skirt">스커트</router-link>
              <router-link to="/look/shorts">숏팬츠</router-link>
              <router-link to="/look/etc-bottom">기타</router-link>
            </div>
            <div class="category-column">
              <h3>신발</h3>
              <router-link to="/look/sneakers">스니커즈</router-link>
              <router-link to="/look/gudu">구두</router-link>
              <router-link to="/look/boots">부츠</router-link>
              <router-link to="/look/flat">플랫</router-link>
              <router-link to="/look/slipper">슬리퍼</router-link>
              <router-link to="/look/etc-shoes">기타</router-link>
            </div>
            <div class="category-column">
              <h3>모자</h3>
              <router-link to="/look/cap">캡/야구모자</router-link>
              <router-link to="/look/hunting">헌팅캡</router-link>
              <router-link to="/look/fedora">페도라</router-link>
              <router-link to="/look/beanie">비니</router-link>
              <router-link to="/look/trooper">트루퍼</router-link>
              <router-link to="/look/balaclava">바라클라바</router-link>
              <router-link to="/look/etc-hat">기타</router-link>
            </div>
            <div class="category-column">
              <h3>가방</h3>
              <router-link to="/look/backpack">백팩</router-link>
              <router-link to="/look/shoulder-bag">숄더백</router-link>
              <router-link to="/look/cross-bag">크로스백</router-link>
              <router-link to="/look/tote-bag">토트백</router-link>
              <router-link to="/look/waist-hip">웨이스트/힙색</router-link>
              <router-link to="/look/eco-bag">에코백</router-link>
              <router-link to="/look/clutch">클러치</router-link>
              <router-link to="/look/etc-bag">기타</router-link>
            </div>
            <div class="category-column">
              <h3>악세서리</h3>
              <router-link to="/look/earrings">귀걸이</router-link>
              <router-link to="/look/necklace">목걸이</router-link>
              <router-link to="/look/ring">팔찌</router-link>
              <router-link to="/look/bracelet">네일팁</router-link>
              <router-link to="/look/watch">키링</router-link>
              <router-link to="/look/belt">벨트</router-link>
              <router-link to="/look/glasses">장갑</router-link>
              <router-link to="/look/etc-acc">기타</router-link>
            </div>
          </div>
        </div>
      </div>
      <router-link to="/tag"># TAG</router-link>
      <router-link to="/style-share">STYLE SHARE</router-link>
    </nav>
    <!-- 오른쪽 섹션: 검색창과 프로필 -->
    <div class="right-section">
      <div class="search-bar">
        <input type="text" placeholder="Search..." />
        <button class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
      <!-- 로그인된 경우 프로필 표시 -->
      <div v-if="isLoggedIn" class="profile-container" @click="toggleDropdown" ref="profileContainer">
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
            <div class="dropdown-item" @click="goToActivityHistory">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>나의 활동 기록</span>
            </div>
            <div class="dropdown-item" @click="logout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>로그아웃</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 로그인되지 않은 경우 로그인 버튼 표시 -->
      <div v-else class="login-button" @click="goToLogin">
        <img :src="defaultProfileImageUrl" alt="Default Profile" class="default-profile-image" />
        <span>로그인이 필요합니다</span>
      </div>
    </div>
    <!-- 로그아웃 확인 모달 -->
    <div v-if="showLogoutModal" class="logout-modal-overlay">
      <div class="logout-modal">
        <h3>로그아웃</h3>
        <p>정말 로그아웃 하시겠습니까?</p>
        <div class="modal-buttons">
          <button class="cancel-btn" @click="closeLogoutModal">취소</button>
          <button class="confirm-btn" @click="confirmLogout">확인</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import profileImage from '../icons/profile-mando.jpg'
import defaultProfileImage from '../icons/profile-default.png'

export default {
  name: 'Header',
  setup() {
    const router = useRouter()
    const username = ref('')
    const userProfileImage = ref(defaultProfileImage)
    const defaultProfileImageUrl = ref(defaultProfileImage)
    const isDropdownOpen = ref(false)
    const showLookMenu = ref(false)
    const showHairMenu = ref(false)
    const showMakeupMenu = ref(false)
    const isLoggedIn = ref(false)
    const showLogoutModal = ref(false)

    // 로컬 스토리지에서 프로필 데이터 불러오기
    const loadProfileData = () => {
      const accessToken = localStorage.getItem('accessToken')
      
      if (accessToken) {
        isLoggedIn.value = true
        
        // 목업 데이터로 초기화
        username.value = 'michalamet'
        userProfileImage.value = profileImage

        // localStorage에 목업 데이터 저장
        localStorage.setItem('userNickname', 'michalamet')
        localStorage.setItem('userProfileImageUrl', profileImage)
        localStorage.setItem('userHeight', '165')
        localStorage.setItem('userWeight', '45')
        localStorage.setItem('userBio', '귀여운 게 최고야')

        // 저장된 프로필 데이터가 있으면 그것을 사용
        const storedNickname = localStorage.getItem('userNickname')
        const storedProfileImage = localStorage.getItem('userProfileImageUrl')
        
        if (storedNickname && storedNickname !== 'michalamet') {
          username.value = storedNickname
        }
        if (storedProfileImage && storedProfileImage !== profileImage) {
          userProfileImage.value = storedProfileImage
        }
      } else {
        isLoggedIn.value = false
        username.value = ''
        userProfileImage.value = defaultProfileImage
      }
    }

    const handleClickOutside = (event) => {
      const lookDropdown = document.querySelector('.look-dropdown')
      const hairDropdown = document.querySelector('.nav-dropdown')
      const makeupDropdown = document.querySelector('.nav-dropdown:nth-child(2)')
      const profileContainer = document.querySelector('.profile-container')

      if (profileContainer && !profileContainer.contains(event.target)) {
        isDropdownOpen.value = false
      }

      if (lookDropdown && !lookDropdown.contains(event.target)) {
        showLookMenu.value = false
      }

      if (hairDropdown && !hairDropdown.contains(event.target)) {
        showHairMenu.value = false
      }

      if (makeupDropdown && !makeupDropdown.contains(event.target)) {
        showMakeupMenu.value = false
      }
    }

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const editProfile = () => {
      router.push({ name: 'ProfileEdit' })
      isDropdownOpen.value = false
    }

    const goToMyProfile = () => {
      router.push({ name: 'MyPage' })
      isDropdownOpen.value = false
    }

    const toggleHairMenu = () => {
      showHairMenu.value = !showHairMenu.value
      showMakeupMenu.value = false
      showLookMenu.value = false
    }

    const toggleMakeupMenu = () => {
      showMakeupMenu.value = !showMakeupMenu.value
      showHairMenu.value = false
      showLookMenu.value = false
    }

    const toggleLookMenu = () => {
      showLookMenu.value = !showLookMenu.value
      showHairMenu.value = false
      showMakeupMenu.value = false
    }

    const closeHairMenu = () => {
      showHairMenu.value = false
    }

    const closeMakeupMenu = () => {
      showMakeupMenu.value = false
    }

    const closeLookMenu = () => {
      showLookMenu.value = false
    }

    const goToActivityHistory = () => {
      router.push('/myactivity')
      isDropdownOpen.value = false
    }

    const logout = () => {
      showLogoutModal.value = true
      isDropdownOpen.value = false
    }

    const confirmLogout = () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userNickname')
      localStorage.removeItem('userProfileImageUrl')
      localStorage.removeItem('userHeight')
      localStorage.removeItem('userWeight')
      localStorage.removeItem('userBio')
      isLoggedIn.value = false
      username.value = ''
      userProfileImage.value = defaultProfileImage
      showLogoutModal.value = false
      router.push('/')
    }

    const goToLogin = () => {
      router.push('/login')
    }

    const closeLogoutModal = () => {
      showLogoutModal.value = false
    }

    onMounted(() => {
      loadProfileData()
      
      // localStorage 변경 감지
      window.addEventListener('storage', loadProfileData)
      
      // 프로필 데이터 변경을 감지하기 위한 이벤트 리스너 추가
      window.addEventListener('profileUpdated', (event) => {
        const profileData = event.detail
        username.value = profileData.username
        userProfileImage.value = profileData.profileImage
      })

      // 주기적으로 로그인 상태와 프로필 데이터 체크 (1초마다)
      const intervalId = setInterval(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken && !isLoggedIn.value) {
          loadProfileData()
        }
      }, 1000)

      document.addEventListener('click', handleClickOutside)

      // cleanup
      onUnmounted(() => {
        clearInterval(intervalId)
        window.removeEventListener('storage', loadProfileData)
        window.removeEventListener('profileUpdated', loadProfileData)
        document.removeEventListener('click', handleClickOutside)
      })
    })

    return {
      username,
      userProfileImage,
      defaultProfileImageUrl,
      isDropdownOpen,
      showLookMenu,
      showHairMenu,
      showMakeupMenu,
      isLoggedIn,
      showLogoutModal,
      toggleDropdown,
      editProfile,
      goToMyProfile,
      toggleHairMenu,
      toggleMakeupMenu,
      toggleLookMenu,
      goToActivityHistory,
      closeHairMenu,
      closeMakeupMenu,
      closeLookMenu,
      logout,
      goToLogin,
      closeLogoutModal,
      confirmLogout
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  background-color: black;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;                       /* 60px -> 80px 헤더 높이 키우기 */
}

.logo-section {
  margin-left: 3rem;
  min-width: 200px;
}

.logo {
  font-size: 2rem;                  /* 1.8rem -> 2rem 로고 크기 키우기 */
  font-family: 'Abril Fatface', cursive;
  color: white;
  text-decoration: none;
  font-weight: bold;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-left: -80px;
  position: relative;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1rem;                    /* 상단 카테고리(HAIR, MAKEUP ...) 0.9 -> 1rem */
  white-space: nowrap;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #888;
}

.nav-links a.router-link-active {
  color: #ffffff;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-right: 2rem;
  min-width: 200px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 0.3rem 1rem;
  width: 250px;
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
  width: 33px;      /* 20px 이였는데 작아서 33px 으로 변경 */
  height: 33px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  color: white;
  font-size: 1rem;    /* 0.8rem -> 1으로 변경 */
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

.look-dropdown {
  position: static;
  display: inline-block;
}

.look-link-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.look-link-wrapper:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown-icon {
  transition: transform 0.3s ease;
}

.dropdown-icon.rotated {
  transform: rotate(180deg);
}

.look-dropdown-content {
  position: absolute;
  top: 100%;
  left: 70%;
  transform: translateX(-50%);
  background-color: #1a1a1a;
  width: 1000px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 1000;
  padding: 20px;
  border-radius: 8px;
  margin-top: 10px;
  min-width: unset;
}

.look-categories {
  display: flex;
  gap: 30px;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.category-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-column h3 {
  color: #ffffff;
  font-size: 0.9rem;
  margin: 0 0 10px 0;
  font-weight: 500;
}

.category-column a {
  color: #fff;
  text-decoration: none;
  font-size: 0.8rem;
  transition: color 0.2s;
}

.category-column a:hover {
  color: #F05EC9;
}

.look-dropdown-content::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 8px 8px 8px;
  border-style: solid;
  border-color: transparent transparent #1a1a1a transparent;
}

.nav-dropdown {
  position: static;
  display: inline-block;
}

.nav-link-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link-wrapper:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.nav-dropdown-content {
  position: absolute;
  top: 100%;
  left: 70%;
  transform: translateX(-50%);
  background-color: #1a1a1a;
  width: 1000px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 1000;
  padding: 20px;
  border-radius: 8px;
  margin-top: 10px;
}

.nav-categories {
  display: flex;
  gap: 30px;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.nav-dropdown:nth-child(1) .nav-dropdown-content::before {
  left: 12%;
}

.nav-dropdown:nth-child(2) .nav-dropdown-content::before {
  left: 28%;
}

.look-dropdown .look-dropdown-content::before {
  left: 44%;
}

.login-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: #1a1a1a;
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.login-button:hover {
  background-color: #2a2a2a;
}

.default-profile-image {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #333;
}

.logout-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.logout-modal {
  background-color: #1a1a1a;
  padding: 24px;
  border-radius: 12px;
  width: 300px;
  text-align: center;
}

.logout-modal h3 {
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  color: white;
}

.logout-modal p {
  margin: 0 0 24px 0;
  color: #cccccc;
  font-size: 0.95rem;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.modal-buttons button {
  padding: 8px 24px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background-color: transparent;
  border: 1px solid #666;
  color: #fff;
}

.cancel-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.confirm-btn {
  background-color: #F05EC9;
  border: none;
  color: white;
}

.confirm-btn:hover {
  background-color: #F05EC9;
}
</style> 