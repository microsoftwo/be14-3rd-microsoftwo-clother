import { createRouter, createWebHistory } from "vue-router";
import MyPage from "../views/MyPage.vue";
import MyPostsView from "../views/MyPostsView.vue";
import StyleShareCreate from "../views/StyleShareCreate.vue";
import ProfileEdit from "../views/ProfileEdit.vue";
import MainPage from "../views/MainPage.vue";
import LikesGrid from "../components/LikesGrid.vue";
import NewestGrid from "../components/NewestGrid.vue";
import CategoryLikesGrid from "../components/CategoryLikesGrid.vue";
import CategoryNewestGrid from "../components/CategoryNewestGrid.vue";
import CategoryGrid from "../components/CategoryGrid.vue";
import { getCategoryId } from '../constants/categoryMap'
import MyActivity from '../views/MyActivity.vue'
import Terms from '../views/Terms.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'

const routes = [
  {
    path: '/',
    redirect: '/likes'
  },
  {
    path: '/',
    component: MainPage,
    children: [
      {
        path: 'likes',
        name: 'Likes',
        component: LikesGrid
      },
      {
        path: 'newest',
        name: 'Newest',
        component: NewestGrid
      }
    ]
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
  },
  {
    path: "/posts",
    name: "MyPosts",
    component: MyPostsView,
  },
  {
    path: "/profile/edit",
    name: "ProfileEdit",
    component: ProfileEdit,
  },
  {
    path: "/style-share",
    name: "StyleShare",
  },
  {
    path: "/style-share/create",
    name: "StyleShareCreate",
    component: StyleShareCreate,
  },
  {
    path: '/myactivity',
    name: 'MyActivity',
    component: MyActivity
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
