<template>
  <div class="app">
    <Header @toggle-activity="handleToggleActivity" />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <Footer />
    
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  methods: {
    handleToggleActivity() {
      const myPageComponent = this.$refs.myPage
      if (myPageComponent && myPageComponent.toggleActivity) {
        myPageComponent.toggleActivity()
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: black;
  color: white;
}

* {
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: black;
  height: 60px;
}

.main-content {
  flex: 1;
  margin-top: 60px; /* 헤더 높이만큼 여백 */
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  position: relative;
}

.footer {
  background-color: black;
  color: white;
  padding: 20px;
  width: 100%;
  position: relative; /* 상대 위치로 변경 */
}
</style>