<template>
  <div class="style-share-create">
    <style-share-form />
  </div>
</template>

<script>
import StyleShareForm from '../components/style-share/StyleShareForm.vue'

export default {
  name: 'StyleShareCreate',
  components: {
    StyleShareForm
  }
}
</script>

<style scoped>
.style-share-create {
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: calc(100vh - 64px);
}
</style> 