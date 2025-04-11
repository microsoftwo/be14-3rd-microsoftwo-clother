<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">clother</div>
      <div class="footer-links">
        <span>개인정보 처리방침</span>
        <span>이용약관</span>
      </div>
      <div class="footer-info">
        <p>We have clothes that suits your style</p>
        <p>and which you're proud to wear.</p>
        <p>From women to men.</p>
      </div>
      <div class="footer-contact">
        <p>help@clother.io</p>
        <p>서울특시 동작구 보라매로 87 3층</p>
        <p>clother © 2025, All Rights Reserved.</p>
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
  margin-bottom: 1rem;
}

.footer-links {
  margin-bottom: 1rem;
}

.footer-links span {
  margin-right: 1rem;
  cursor: pointer;
}

.footer-info {
  margin-bottom: 1rem;
}

.footer-info p {
  margin: 0.2rem 0;
}

.footer-contact p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  color: #888;
}
</style> 