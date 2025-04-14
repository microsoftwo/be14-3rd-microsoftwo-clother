const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: SignupForm
  },
  {
    path: '/',
    // redirect: '/likes' // 필요하다면 이 줄 살려도 됨. 현재는 MainPage에서 redirect 처리 중.
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
