<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <h2>프로필 수정</h2>
      <div class="form-group">
        <label>프로필 이미지</label>
        <div class="profile-image-upload">
          <img :src="profileImage" alt="Profile" />
          <button @click="handleImageUpload">이미지 변경</button>
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            accept="image/*"
            @change="onImageSelected"
          />
        </div>
      </div>
      <div class="form-group">
        <label>닉네임</label>
        <input type="text" v-model="nickname" placeholder="닉네임을 입력하세요" />
      </div>
      <div class="form-group">
        <label>키</label>
        <input type="number" v-model="height" placeholder="키를 입력하세요" />
      </div>
      <div class="form-group">
        <label>몸무게</label>
        <input type="number" v-model="weight" placeholder="몸무게를 입력하세요" />
      </div>
      <div class="form-group">
        <label>소개</label>
        <textarea v-model="bio" placeholder="자기소개를 입력하세요"></textarea>
      </div>
      <div class="button-group">
        <button class="cancel" @click="$emit('close')">취소</button>
        <button class="save" @click="handleSave">저장</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ProfileEditModal',
  setup(props, { emit }) {
    const profileImage = ref('path-to-default-image')
    const nickname = ref('')
    const height = ref('')
    const weight = ref('')
    const bio = ref('')
    const fileInput = ref(null)

    const handleImageUpload = () => {
      fileInput.value.click()
    }

    const onImageSelected = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          profileImage.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const handleSave = () => {
      // TODO: Implement save logic
      emit('close')
    }

    return {
      profileImage,
      nickname,
      height,
      weight,
      bio,
      fileInput,
      handleImageUpload,
      onImageSelected,
      handleSave
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.profile-image-upload {
  display: flex;
  align-items: center;
  gap: 20px;
}

.profile-image-upload img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 100px;
  resize: vertical;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.cancel {
  background: #f5f5f5;
}

button.save {
  background: #000;
  color: white;
}

button:hover {
  opacity: 0.8;
}
</style> 