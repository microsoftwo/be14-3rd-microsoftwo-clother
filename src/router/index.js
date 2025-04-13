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
    path: '/look/:category',
    component: MainPage,
    children: [
      {
        path: '',
        redirect: to => `/look/${to.params.category}/likes`
      },
      {
        path: 'likes',
        name: 'CategoryLikes',
        component: CategoryLikesGrid,
        props: route => ({ categoryId: getCategoryId(route.params.category) })
      },
      {
        path: 'latest',
        name: 'CategoryNewest',
        component: CategoryNewestGrid,
        props: route => ({ categoryId: getCategoryId(route.params.category) })
      }
    ]
  },
  {
    path: '/hair/:category',
    component: MainPage,
    children: [
      {
        path: '',
        redirect: to => `/hair/${to.params.category}/likes`
      },
      {
        path: 'likes',
        name: 'HairLikes',
        component: CategoryLikesGrid,
        props: route => ({ categoryId: getCategoryId(route.params.category) })
      },
      {
        path: 'latest',
        name: 'HairNewest',
        component: CategoryNewestGrid,
        props: route => ({ categoryId: getCategoryId(route.params.category) })
      }
    ]
  },
  {
    path: '/makeup/:category',
    component: MainPage,
    children: [
      {
        path: '',
        redirect: to => `/makeup/${to.params.category}/likes`
      },
      {
        path: 'likes',
        name: 'MakeupLikes',
        component: CategoryLikesGrid,
        props: route => ({ categoryId: getCategoryId(route.params.category) })
      },
      {
        path: 'latest',
        name: 'MakeupNewest',
        component: CategoryNewestGrid,
        props: route => ({ categoryId: getCategoryId(route.params.category) })
      }
    ]
  },
  {
    path: '/category/:mainCategory/:subCategory',
    name: 'Category',
    component: CategoryGrid,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
