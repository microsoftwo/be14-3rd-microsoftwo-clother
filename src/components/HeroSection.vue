<template>
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">스타일 쉐어</h1>
      <h4 class="hero-subtitle">Show your style</h4>
    </div>
    <div class="hero-image">
      <img src="../icons/hero-section.jpg.png" alt="Hero image" />
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  background-color: #000;
  min-height: 280px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 40px;
  margin-top: 60px;
  overflow: hidden;
  /* margin: 10px; */
}

.hero-content {
  z-index: 1;
  text-align: left;
  color: white;
  position: relative;
  max-width: 60%;
  margin-left: 120px;
}

.hero-image {
  position: absolute;
  right: 16%;
  top: 60%;
  transform: translateY(-50%);
  width: 45%;
  height: 95%;
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: right center;
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

@media (max-width: 768px) {
  .hero-section {
    min-height: 300px;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-image {
    width: 70%;
    opacity: 0.7;
  }

  .hero-title {
    font-size: 2rem;
  }
}
</style>
