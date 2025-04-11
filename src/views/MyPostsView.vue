<template>
  <div class="my-posts">
    <h2>My Posts</h2>
    <PostGrid :posts="posts" />
  </div>
</template>

<script>
import PostGrid from '../components/PostGrid.vue'
import { MY_POSTS } from '../constants/images.js'

export default {
  name: 'MyPostsView',
  components: {
    PostGrid
  },
  setup() {
    return {
      posts: MY_POSTS
    }
  }
}
</script>

<style scoped>
.my-posts {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}
</style> 