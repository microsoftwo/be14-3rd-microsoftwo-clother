<!-- 
  Footer.vue - 하단 푸터 컴포넌트
  로고, 링크, 회사 정보를 포함하는 푸터
-->
<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- 로고 -->
      <div class="footer-logo">clother</div>
      <!-- 링크 섹션 -->
      <div class="footer-links">
        <router-link to="/privacy-policy" class="footer-link">개인정보 처리방침</router-link>
        <router-link to="/terms" class="footer-link">이용약관</router-link>
      </div>
      <!-- 회사 소개 섹션 -->
      <div class="footer-info">
        <p>Discover styles that inspire you</p>
        <p>from outfits and hair to makeup and accessories</p>
        <p>style your own look with ease</p>
      </div>
      <!-- 연락처 정보 섹션 -->
      <div class="footer-contact">
        <p class="footer-contact-email">help@clother.io</p>
        <p class="footer-contact-location">서울특별시 동작구 보라매로 87 3층</p>
        <p class="footer-contact-copyright">clother © 2025, All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: black;
  color: white;
  padding: 2rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-logo {
  font-family: 'Abril Fatface', cursive;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.footer-links {
  margin-bottom: 1.5rem;
}

.footer-link {
  margin-right: 1.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #ccc;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #F05EC9;
}

.footer-info {
  margin-bottom: 1.5rem;
  font-family: 'Adamina', serif;
  color: #ccc;
}

.footer-info p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.footer-contact {
  color: #888;
}

.footer-contact p {
  margin: 0.3rem 0;
  font-size: 0.85rem;
}

.footer-contact-email {
  font-family: 'Adamina', serif;
}
    
.footer-contact-copyright {
  font-family: 'Adamina', serif;
  margin-top: 1rem !important;
}
</style>