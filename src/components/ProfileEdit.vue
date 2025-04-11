<template>
  <div class="profile-edit-container">
    <div class="profile-edit-card">
      <h2 class="edit-title">프로필 설정</h2>
      
      <div class="profile-image-section">
        <div class="emoji-placeholder">
          <img :src="profileImage" alt="Profile" class="profile-image" />
        </div>
      </div>

      <div class="form-group">
        <label>닉네임</label>
        <input 
          type="text" 
          v-model="nickname" 
          :maxlength="12"
          placeholder="닉네임을 입력하세요"
        />
        <span class="char-count">{{ nickname.length }}/12</span>
      </div>

      <div class="form-group">
        <label>소개</label>
        <textarea 
          v-model="bio" 
          :maxlength="50"
          placeholder="자기소개 최고야"
        ></textarea>
        <span class="char-count">{{ bio.length }}/50</span>
      </div>

      <div class="form-group">
        <label>키</label>
        <input 
          type="number" 
          v-model="height"
          placeholder="165cm"
        />
      </div>

      <div class="form-group">
        <label>몸무게</label>
        <input 
          type="number" 
          v-model="weight"
          placeholder="45kg"
        />
      </div>

      <button class="save-button" @click="handleSave">프로필 저장</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ProfileEdit',
  setup() {
    const router = useRouter()
    const nickname = ref('')
    const height = ref('')
    const weight = ref('')
    const bio = ref('')

    const handleSave = () => {
      // TODO: API 호출하여 프로필 정보 저장
      router.push('/mypage') // 저장 후 마이페이지로 이동
    }

    return {
      nickname,
      height,
      weight,
      bio,
      handleSave
    }
  }
}
</script>

<style scoped>
.profile-edit-container {
  min-height: 100vh;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.profile-edit-card {
  background-color: #1a1a1a;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
}

.edit-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.profile-image-section {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.emoji-placeholder {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: #2a2a2a;
  color: white;
  font-size: 1rem;
}

.form-group textarea {
  height: 100px;
  resize: none;
}

.char-count {
  position: absolute;
  right: 0.5rem;
  top: 0;
  font-size: 0.8rem;
  color: #666;
}

.save-button {
  width: 100%;
  padding: 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #333;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style> 