import { createRouter, createWebHistory } from "vue-router";
import PostCreateCard from "../views/PostCreateCard.vue/";
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
import { getCategoryId } from "../constants/categoryMap";
import MyActivity from "../views/MyActivity.vue";
import Terms from "../views/Terms.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import LoginForm from "../views/LoginForm.vue";
import SignupForm from "../views/SignupForm.vue";
import StyleShare from "../views/StyleShare.vue";
import PostDetailView from "../views/PostDetailView.vue";
import PostCommentView from "../views/PostCommentView.vue";

const routes = [
  {
    path: "/post",
    name: "Posting",
    component: PostCreateCard,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupForm,
  },
  {
    path: "/",
    component: MainPage,
    children: [
      {
        path: "",
        redirect: "/likes",
      },
      {
        path: "likes",
        name: "Likes",
        component: LikesGrid,
      },
      {
        path: "newest",
        name: "Newest",
        component: NewestGrid,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/look/:category",
    component: MainPage,
    children: [
      {
        path: "",
        redirect: (to) => `/look/${to.params.category}/likes`,
      },
      {
        path: "likes",
        name: "CategoryLikes",
        component: CategoryLikesGrid,
        props: (route) => ({
          categoryId: getCategoryId(route.params.category),
        }),
      },
      {
        path: "latest",
        name: "CategoryNewest",
        component: CategoryNewestGrid,
        props: (route) => ({
          categoryId: getCategoryId(route.params.category),
        }),
      },
    ],
  },
  {
    path: "/hair/:category",
    component: MainPage,
    children: [
      {
        path: "",
        redirect: (to) => `/hair/${to.params.category}/likes`,
      },
      {
        path: "likes",
        name: "HairLikes",
        component: CategoryLikesGrid,
        props: (route) => ({
          categoryId: getCategoryId(route.params.category),
        }),
      },
      {
        path: "latest",
        name: "HairNewest",
        component: CategoryNewestGrid,
        props: (route) => ({
          categoryId: getCategoryId(route.params.category),
        }),
      },
    ],
  },
  {
    path: "/makeup/:category",
    component: MainPage,
    children: [
      {
        path: "",
        redirect: (to) => `/makeup/${to.params.category}/likes`,
      },
      {
        path: "likes",
        name: "MakeupLikes",
        component: CategoryLikesGrid,
        props: (route) => ({
          categoryId: getCategoryId(route.params.category),
        }),
      },
      {
        path: "latest",
        name: "MakeupNewest",
        component: CategoryNewestGrid,
        props: (route) => ({
          categoryId: getCategoryId(route.params.category),
        }),
      },
    ],
  },
  {
    path: "/category/:mainCategory/:subCategory",
    name: "Category",
    component: CategoryGrid,
    props: true,
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
    component: StyleShare,
  },
  {
    path: "/boards/:id",
    name: "PostDetailView",
    component: PostDetailView,
    props: true, // 컴포넌트에서 props로 id를 받을 수 있음
  },
  {
    path: "/boards/:id/comments",
    name: "PostCommentView",
    component: PostCommentView,
    props: true,
  },
  {
    path: "/style-share/create",
    name: "StyleShareCreate",
    component: StyleShareCreate,
  },
  {
    path: "/myactivity",
    name: "MyActivity",
    component: MyActivity,
  },
  {
    path: "/terms",
    name: "Terms",
    component: Terms,
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;