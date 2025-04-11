<template>
  <div class="profile-edit-container">
    <div class="profile-edit-card">
      <h1 class="edit-title">프로필 설정</h1>
      
      <div class="divider"></div>

      <div class="profile-image-section">
        <img :src="profileImage" alt="Profile" class="profile-image" />
      </div>

      <div class="form-section">
        <div class="form-group">
          <label>닉네임</label>
          <div class="input-container">
            <input 
              type="text" 
              v-model="nickname" 
              placeholder="michalamet"
            />
            <span class="char-count">10/12</span>
          </div>
        </div>

        <div class="form-group">
          <label>소개</label>
          <div class="input-container">
            <textarea 
              v-model="bio" 
              placeholder="귀여운게 최고야"
            ></textarea>
            <span class="char-count">9/50</span>
          </div>
        </div>

        <div class="form-group">
          <label>키</label>
          <input 
            type="text" 
            v-model="height"
            placeholder="165cm"
          />
        </div>

        <div class="form-group">
          <label>몸무게</label>
          <input 
            type="text" 
            v-model="weight"
            placeholder="45kg"
          />
        </div>

        <button class="save-button" @click="handleSave">
          프로필 저장
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import profileImage from '../icons/profile-mando.jpg'

export default {
  name: 'ProfileEdit',
  setup() {
    const router = useRouter()
    const nickname = ref('michalamet')
    const bio = ref('귀여운게 최고야')
    const height = ref('165cm')
    const weight = ref('45kg')

    const handleSave = () => {
      // TODO: API 호출하여 프로필 정보 저장
      router.push('/mypage')
    }

    return {
      profileImage,
      nickname,
      bio,
      height,
      weight,
      handleSave
    }
  }
}
</script>

<style scoped>
.profile-edit-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: black;
}

.profile-edit-card {
  background-color: #F2F0F1;
  border-radius: 30px;
  width: 100%;
  max-width: 400px;
  padding: 1.5rem;
}

.edit-title {
  text-align: center;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
}

.divider {
  height: 1px;
  background-color: #E0E0E0;
  margin: 0.8rem 0;
}

.profile-image-section {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.profile-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #FFE5EC;
}

.form-section {
  margin-top: 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  color: black;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
}

.input-container {
  position: relative;
}

.char-count {
  position: absolute;
  right: 0.5rem;
  top: -1.5rem;
  font-size: 0.8rem;
  color: #666;
}

input, textarea {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  background-color: white;
  color: black;
  font-size: 0.85rem;
}

textarea {
  height: 80px;
  resize: none;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #666;
}

.save-button {
  width: 100%;
  padding: 0.8rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 1rem;
}

.save-button:hover {
  opacity: 0.9;
}
</style> 