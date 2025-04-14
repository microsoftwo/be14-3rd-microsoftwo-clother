<template>
  <div class="profile-edit-container">
    <div class="profile-edit-card">
      <h2 class="edit-title">프로필 설정</h2>
      
      <div class="profile-image-section">
        <div class="profile-image-container">
          <img :src="previewImage" alt="Profile" class="profile-image" />
          <div class="image-upload-overlay" @click="triggerFileInput">
            <span>이미지 변경</span>
          </div>
        </div>
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleImageChange" 
          accept="image/*"
          style="display: none"
        />
      </div>

      <div class="form-group">
        <label>닉네임</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="nickname" 
            :maxlength="12"
            placeholder="michalamet"
          />
          <span class="char-count" :class="{ 'error': nickname.length > 12 }">
            {{ nickname.length }}/12
          </span>
          <span class="error-message" v-if="nickname.length > 12">
            글자수가 초과하였습니다
          </span>
        </div>
      </div>

      <div class="form-group">
        <label>소개</label>
        <div class="input-wrapper">
          <textarea 
            v-model="bio" 
            :maxlength="50"
            placeholder="귀여운게 최고야"
          ></textarea>
          <span class="char-count" :class="{ 'error': bio.length > 50 }">
            {{ bio.length }}/50
          </span>
          <span class="error-message" v-if="bio.length > 50">
            글자수가 초과하였습니다
          </span>
        </div>
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
import profileImage from '../icons/profile-mando.jpg'

export default {
  name: 'ProfileEdit',
  setup() {
    const router = useRouter()
    const fileInput = ref(null)
    const previewImage = ref(profileImage)
    const nickname = ref('')
    const height = ref('')
    const weight = ref('')
    const bio = ref('')

    const triggerFileInput = () => {
      fileInput.value.click()
    }

    const handleImageChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          previewImage.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const handleSave = () => {
      if (nickname.value.length > 12 || bio.value.length > 50) {
        alert('글자수를 확인해주세요')
        return
      }
      // TODO: API 호출하여 프로필 정보 저장
      router.push('/mypage')
    }

    return {
      fileInput,
      previewImage,
      nickname,
      height,
      weight,
      bio,
      triggerFileInput,
      handleImageChange,
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
  align-items: center;
  padding: 2rem;
}

.profile-edit-card {
  background-color: #F2F0F1;
  border-radius: 30px;
  width: 100%;
  max-width: 350px;
  padding: 1rem;
  margin: 1rem 0;
}

.edit-title {
  text-align: center;
  color: black;
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0;
}

.profile-image-section {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.profile-image-container {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-upload-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-upload-overlay:hover {
  opacity: 1;
}

.image-upload-overlay span {
  color: white;
  font-size: 0.8rem;
}

.form-group {
  margin-bottom: 0.8rem;
}

.form-group:last-of-type {
  margin-bottom: 0.6rem;
}

.form-group label {
  display: block;
  color: black;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.input-wrapper {
  position: relative;
}

input, textarea {
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  background-color: white;
  color: black;
  font-size: 0.8rem;
}

textarea {
  height: 50px;
  resize: none;
}

.char-count {
  position: absolute;
  right: 0.5rem;
  top: -1.2rem;
  font-size: 0.7rem;
  color: #666;
}

.char-count.error {
  color: #ff4444;
}

.error-message {
  position: absolute;
  right: 0;
  bottom: -1rem;
  font-size: 0.7rem;
  color: #ff4444;
}

.save-button {
  width: 100%;
  padding: 0.6rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 0.6rem;
  margin-bottom: 0.5rem;
}

.save-button:hover {
  opacity: 0.9;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style> 