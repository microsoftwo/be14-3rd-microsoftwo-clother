import { createRouter, createWebHistory } from "vue-router";
import SignupForm from "../components/SignupForm.vue";
import MainPage from "../views/MainPage.vue";
import LikesGrid from "../components/LikesGrid.vue";
import NewestGrid from "../components/NewestGrid.vue";
import StyleShareCreate from "../views/StyleShareCreate.vue";
import MyPage from "../views/MyPage.vue";
import MyPostsView from "../views/MyPostsView.vue";
import ProfileEdit from "../views/ProfileEdit.vue";
import MyActivity from "../views/MyActivity.vue";
import Terms from "../views/Terms.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: SignupForm
  },
  {
    path: '/styleshare/create',
    name: 'StyleShareCreate',
    component: StyleShareCreate
  },
  {
    path: '/',
    component: MainPage,
    children: [
      {
        path: '',
        redirect: 'likes'
      },
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
    path: '/profile/edit',
    name: 'ProfileEdit',
    component: ProfileEdit
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
  routes
});

export default router;
