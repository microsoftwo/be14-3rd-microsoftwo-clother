<template>
  <div class="app">
    <Header @open-profile-edit="showProfileEditModal = true" />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <Footer />
    <ProfileEditModal 
      v-if="showProfileEditModal"
      @close="showProfileEditModal = false"
    />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ProfileEditModal from './components/ProfileEditModal.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    ProfileEditModal
  },
  data() {
    return {
      showProfileEditModal: false
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

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>