<template>
  <div class="myactivity">
    <div class="content">
      <Profile />
      <div class="activity-container">
        <h2 class="page-title">나의 활동 기록</h2>
        
        <div class="section">
          <h3 class="section-header">내가 좋아요 한 게시물</h3>
          <div class="section-content">
            <div class="post-categories">
              <div class="category">
                <h4 class="category-title">POST</h4>
                <div class="post-grid">
                  <PostGrid :posts="myPosts" />
                </div>
              </div>
              <div class="category">
                <h4 class="category-title">STYLE SHARE</h4>
                <div class="post-grid">
                  <PostGrid :posts="styleshareLikes" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-header">내가 댓글단 게시물</h3>
          <div class="section-content">
            <h4 class="category-title">COMMENT</h4>
            <div class="comments">
              <div v-for="(comment, index) in comments" :key="index" class="comment-box">
                <div class="comment-header">
                  <div class="comment-user">
                    <img :src="comment.userImage" alt="User" class="user-image" />
                    <div class="user-info">
                      <span class="username">{{ comment.username }}</span>
                      <span class="date">{{ comment.date }}</span>
                    </div>
                  </div>
                  <div class="arrow-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div class="comment-thread">
                  <div class="original-comment">
                    <p>{{ comment.content }}</p>
                  </div>
                  <div class="comment-reply">
                    <div class="reply-user">
                      <img :src="profileImage" alt="Profile" class="user-image" />
                      <div class="user-info">
                        <span class="username">minchalamet</span>
                        <span class="date">{{ comment.date }}</span>
                      </div>
                    </div>
                    <div class="reply-content">
                      <p>{{ comment.reply }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from '../components/Profile.vue'
import PostGrid from '../components/PostGrid.vue'
import {LIKES_POSTS } from '../constants/images.js'
import profileImage from '../icons/profile-mando.jpg'
import profileImage_1 from '../icons/profile_1.jpg'
import profileImage_2 from '../icons/profile_2.jpg'
import profileImage_3 from '../icons/profile_3.png'
import profileImage_4 from '../icons/profile_4.png'
import profileImage_5 from '../icons/profile_5.jpg'
import profileImage_6 from '../icons/profile_6.jpg'

export default {
  name: 'MyActivity',
  components: {
    Profile,
    PostGrid
  },
  data() {
    return {
      myPosts: LIKES_POSTS.slice(0, 5),
      styleshareLikes: LIKES_POSTS.slice(5, 10),
      profileImage: profileImage,
      comments: [
        {
          username: 'sungchan',
          userImage: profileImage_1,
          date: '5일',
          content: '이 모자 마음에 든당',
          reply: '모자 귀여워요 !'
        },
        {
          username: 'sumin_kr',
          userImage: profileImage_2,
          date: '5일',
          content: '3월 날씨 너무 좋다..',
          reply: '그러니까요 !'
        },
        {
          username: 'rrangeess',
          userImage: profileImage_6,
          date: '4일',
          content: '달디 단 밤양갱',
          reply: '밤양갱 맛있겠다'
        },
        {
          username: 'ye_mong',
          userImage: profileImage_4,
          date: '2일',
          content: '겨울룩',
          reply: '멋쟁인데요 ?'
        },
        {
          username: 'yodon_tae',
          userImage: profileImage_3,
          date: '1일',
          content: '광화문 ootd',
          reply: '이거 느좋'
        }
      ]
    }
  }
}
</script>

<style scoped>
.profile {
  padding: 20px;
  background: transparent;
  color: white;
  display: flex;
  flex-direction: column;
  margin-left: 0px;
}

.myactivity {
  width: 100%;
  min-height: 100vh;
  background-color: black;
  color: white;
  padding-top: 60px;
}

.content {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 15px;
}

.activity-container {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  padding: 15px 40px;
  width: 100%;
  margin: 0 auto;
}

.page-title {
  font-size: 16px;
  color: #000;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
}

.section {
  margin-bottom: 30px;
}

.section-header {
  font-size: 13px;
  color: #000;
  margin-bottom: 8px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0);
  padding-bottom: 4px;
  text-align: left;
}

.category-title {
  font-size: 11px;
  color: #000;
  margin-bottom: 12px;
  font-weight: bold;
  text-align: left;
}

.post-categories {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-grid {
  margin-top: 20px;
}

.comments {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  width: 100%;
}

.comment-box {
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 140px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 6px;
}

.comment-user {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
}

.username {
  font-size: 10px;
  font-weight: 600;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
}

.date {
  font-size: 9px;
  color: #666;
  white-space: nowrap;
  flex-shrink: 0;
}

.arrow-icon {
  margin-top: 4px;
}

.arrow-icon svg {
  width: 14px;
  height: 14px;
}

.comment-thread {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.original-comment {
  margin-bottom: 6px;
  color: #333;
  font-size: 10px;
  line-height: 1.2;
}

.original-comment p {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.comment-reply {
  padding-left: 6px;
  border-left: 2px solid #eee;
  margin-top: 6px;
}

.reply-user {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 3px;
  min-width: 0;
}

.reply-user .username {
  max-width: 70px;
}

.reply-user .date {
  flex-shrink: 0;
}

.reply-content {
  color: #333;
  font-size: 10px;
  line-height: 1.2;
}

.reply-content p {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.user-image {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

@media (max-width: 1200px) {
  .comments {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .comments {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .comments {
    grid-template-columns: 1fr;
  }
  .username {
    max-width: 200px;
  }
}
</style> 