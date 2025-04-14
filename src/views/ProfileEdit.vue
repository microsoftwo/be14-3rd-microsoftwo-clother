<template>
  <div class="profile-edit-container">
    <div class="profile-edit-card">
      <h2 class="edit-title">프로필 설정</h2>
      
      <div class="profile-image-section">
        <div class="profile-image-container">
          <img :src="previewImage || profile.profileImage" alt="Profile" class="profile-image" />
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
            v-model="formData.username" 
            :maxlength="12"
            placeholder="michalamet"
          />
          <span class="char-count" :class="{ 'error': formData.username.length > 12 }">
            {{ formData.username.length }}/12
          </span>
          <span class="error-message" v-if="formData.username.length > 12">
            글자수가 초과하였습니다
          </span>
        </div>
      </div>

      <div class="form-group">
        <label>소개</label>
        <div class="input-wrapper">
          <textarea 
            v-model="formData.bio" 
            :maxlength="50"
            placeholder="귀여운게 최고야"
          ></textarea>
          <span class="char-count" :class="{ 'error': formData.bio.length > 50 }">
            {{ formData.bio.length }}/50
          </span>
          <span class="error-message" v-if="formData.bio.length > 50">
            글자수가 초과하였습니다
          </span>
        </div>
      </div>

      <div class="form-group">
        <label>키</label>
        <input 
          type="number" 
          v-model="formData.height"
          placeholder="165cm"
        />
      </div>

      <div class="form-group">
        <label>몸무게</label>
        <input 
          type="number" 
          v-model="formData.weight"
          placeholder="45kg"
        />
      </div>

      <button class="save-button" @click="showConfirmModal" :disabled="loading">
        {{ loading ? '저장 중...' : '프로필 저장' }}
      </button>
    </div>

    <!-- 확인 모달 -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <p>{{ modalMessage }}</p>
        <div class="modal-buttons">
          <button v-if="!isSuccess" class="modal-button cancel" @click="closeModal">취소</button>
          <button 
            class="modal-button confirm" 
            @click="handleModalConfirm"
          >
            {{ isSuccess ? '확인' : '수정' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import profileImage from '../icons/profile-mando.jpg'

export default {
  name: 'ProfileEdit',
  setup() {
    const router = useRouter()
    const fileInput = ref(null)
    const previewImage = ref(null)
    const loading = ref(false)
    const showModal = ref(false)
    const isSuccess = ref(false)
    const modalMessage = ref('')

    // 로컬 스토리지에서 프로필 데이터 불러오기
    const profile = ref({
      username: 'michalamet',
      bio: '귀여운게 최고야',
      height: '165',
      weight: '45',
      profileImage: profileImage
    })

    // 폼 데이터 초기화
    const formData = ref({
      username: '',
      bio: '',
      height: '',
      weight: ''
    })

    onMounted(() => {
      // 로컬 스토리지에서 프로필 데이터 불러오기
      const savedProfile = localStorage.getItem('userProfile')
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile)
        profile.value = profileData
        // 폼 데이터에 현재 프로필 데이터 설정
        formData.value = {
          username: profileData.username,
          bio: profileData.bio,
          height: profileData.height,
          weight: profileData.weight
        }
      }
    })

    const showConfirmModal = () => {
      modalMessage.value = '프로필을 수정하시겠습니까?'
      isSuccess.value = false
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
      if (isSuccess.value) {
        router.push('/mypage')
      }
    }

    const goToMyPage = () => {
      router.push('/mypage')
    }

    // 파일 입력 트리거
    const triggerFileInput = () => {
      fileInput.value.click()
    }

    // 이미지 변경 처리
    const handleImageChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          previewImage.value = e.target.result
          profile.value.profileImage = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    // 저장 처리
    const handleSave = async () => {
      // 유효성 검사
      if (formData.value.username.length > 12 || formData.value.bio.length > 50) {
        alert('글자수를 확인해주세요')
        return
      }

      try {
        loading.value = true
        // profile 객체를 직접 업데이트 (화면 반영용)
        profile.value = {
          ...profile.value,
          username: formData.value.username,
          bio: formData.value.bio,
          height: formData.value.height,
          weight: formData.value.weight,
          // 이미지가 업로드된 경우 previewImage로 대체
          profileImage: previewImage.value || profile.value.profileImage
        }

        // 로컬 스토리지에 프로필 데이터 저장
        localStorage.setItem('userProfile', JSON.stringify(profile.value))

        // 프로필 업데이트 이벤트 발생
        window.dispatchEvent(new CustomEvent('profileUpdated', {
          detail: profile.value
        }))

        modalMessage.value = '프로필이 성공적으로 수정되었습니다.'
        isSuccess.value = true
        showModal.value = true
      } catch (error) {
        console.error('프로필 저장 중 오류 발생:', error)
        alert('프로필 저장 중 오류가 발생했습니다.')
      } finally {
        loading.value = false
      }
    }

    const handleModalConfirm = () => {
      if (isSuccess.value) {
        goToMyPage()
      } else {
        handleSave()
      }
    }

    return {
      fileInput,
      previewImage,
      formData,
      profile,
      loading,
      showModal,
      isSuccess,
      modalMessage,
      triggerFileInput,
      handleImageChange,
      handleSave,
      showConfirmModal,
      closeModal,
      goToMyPage,
      handleModalConfirm
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
  border-radius: 10px;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 0.6rem;
  margin-bottom: 0.5rem;
}

.save-button:hover {
  opacity: 0.9;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: rgb(0, 0, 0);
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 300px;
  text-align: center;
}

.modal-content p {
  margin: 0 0 20px 0;
  color: rgb(255, 255, 255);
  font-size: 16px;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.modal-button {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.modal-button.cancel {
  background-color: transparent;
  border: 1px solid #666;
  color: #fff;
}

.modal-button.confirm {
  background-color: #F05EC9;
  color: white;
}

.modal-button:hover {
  opacity: 0.8;
}
</style> 