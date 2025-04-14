<template>
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">스타일 쉐어</h1>
      <h4 class="hero-subtitle">Show your style</h4>
    </div>
    <div class="hero-image">
      <img src="./hero-section.jpg.png" alt="Hero image" />
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  background-color: #000;
  height: 300px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 40px;
}

.hero-content {
  z-index: 1;
  text-align: left;
  color: white;
  margin-top: 40px;
}

.hero-image {
  position: absolute;
  right: 0;
  top: 0;
  width: 400px;
  height: 100%;
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-title {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  font-size: 1.1rem;
  font-weight: normal;
}
</style>
