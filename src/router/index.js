import { createRouter, createWebHistory } from "vue-router";
import MyPage from "../views/MyPage.vue";
import MyPostsView from "../views/MyPostsView.vue";
import StyleShareCreate from "../views/StyleShareCreate.vue";
import ProfileEdit from "../views/ProfileEdit.vue";
import MainPage from "../views/MainPage.vue";
import LikesGrid from "../components/LikesGrid.vue";
import NewestGrid from "../components/NewestGrid.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
