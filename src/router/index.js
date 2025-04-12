import { createRouter, createWebHistory } from 'vue-router'
import MyPage from '../views/MyPage.vue'
import MyPostsView from '../views/MyPostsView.vue'
import StyleShareCreate from '../views/StyleShareCreate.vue'

const routes = [
  {
    path: '/',
    redirect: '/mypage'
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/posts',
    name: 'MyPosts',
    component: MyPostsView
  },
  {
    path: '/style-share',
    name: 'StyleShare'
  },
  {
    path: '/style-share/create',
    name: 'StyleShareCreate',
    component: StyleShareCreate
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 