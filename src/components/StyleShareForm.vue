<template>
  <div class="content-container">
    <div class="header-section">
      <button class="back-button" @click="goBack">
        <span class="back-arrow">‹</span>
      </button>
      <button class="submit-btn" @click="handleSubmit" :disabled="!isFormValid">등록</button>
    </div>

    <div class="form-container">
      <div class="upload-section">
        <div class="image-upload" 
             @click="$refs.fileInput.click()"
             @dragover.prevent="isDragging = true"
             @dragleave.prevent="isDragging = false"
             @drop.prevent="handleDrop"
             :class="{ 'drag-over': isDragging }">
          <div class="upload-area">
            <div v-if="uploadedImages.length > 0" class="preview-image">
              <img :src="uploadedImages[0].previewUrl" />
            </div>
            <span v-else class="plus-icon">+</span>
          </div>
          <div class="upload-text">사진은 최대 5장까지 등록 가능합니다</div>
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            class="file-input"
            @change="handleFileSelect"
            ref="fileInput" 
          />
        </div>

        <div v-if="uploadedImages.length > 0" class="thumbnail-container">
          <div v-for="(image, index) in uploadedImages" 
               :key="index" 
               class="thumbnail">
            <img :src="image.previewUrl" />
            <button class="remove-image" @click.stop="removeImage(index)">×</button>
          </div>
          <div v-if="uploadedImages.length < 5" 
               class="add-more-images"
               @click="$refs.fileInput.click()">
            <span class="plus-icon">+</span>
          </div>
        </div>
      </div>

      <div class="input-section">
        <input 
          type="text" 
          v-model="title" 
          placeholder="제목을 입력해주세요" 
          class="title-input" 
        />
        <textarea 
          v-model="content" 
          placeholder="내용을 입력해주세요" 
          class="content-input"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StyleShareForm',
  data() {
    return {
      title: '',
      content: '',
      uploadedImages: [], // { file, previewUrl }
      isDragging: false,
      isSubmitting: false
    }
  },
  computed: {
    isFormValid() {
      return this.title.trim() &&
             this.content.trim() &&
             this.uploadedImages.length > 0 &&
             !this.isSubmitting
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },

    handleFileSelect(event) {
      this.addFiles(Array.from(event.target.files))
      event.target.value = '' // Reset file input
    },

    handleDrop(event) {
      this.isDragging = false
      const files = Array.from(event.dataTransfer.files)
      this.addFiles(files)
    },

    addFiles(files) {
      const imageFiles = files.filter(file => file.type.startsWith('image/'))
      const remainingSlots = 5 - this.uploadedImages.length
      const filesToAdd = imageFiles.slice(0, remainingSlots)

      filesToAdd.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.uploadedImages.push({
            file,
            previewUrl: e.target.result
          })
        }
        reader.readAsDataURL(file)
      })
    },

    removeImage(index) {
      this.uploadedImages.splice(index, 1)
    },

    async handleSubmit() {
      if (!this.isFormValid) return
      this.isSubmitting = true

      try {
        const token = localStorage.getItem('accessToken')
        if (!token) {
          throw new Error('로그인이 필요합니다.')
        }

        // 이미지 업로드 처리
        const imageUrls = []
        if (this.uploadedImages.length > 0) {
          for (let i = 0; i < this.uploadedImages.length; i++) {
            const file = this.uploadedImages[i].file
            
            // 1. Presigned URL 요청
            const presignedUrlResponse = await axios.get(`http://localhost:8000/image-service/images/url`, {
              params: {
                fileName: file.name
              },
              headers: {
                'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
              }
            })
            
            const presignedUrl = presignedUrlResponse.data

            // 2. Presigned URL을 사용하여 S3에 직접 업로드
            await axios.put(presignedUrl, file, {
              headers: {
                'Content-Type': file.type
              }
            })

            // 3. 이미지 URL 저장
            const imageUrl = presignedUrl.split('?')[0]  // URL에서 query parameter 제거
            imageUrls.push({
              imageUrl: imageUrl,
              order: i + 1
            })
          }
        }

        // 게시글 데이터 구성
        const requestData = {
          title: this.title,
          content: this.content,
          images: imageUrls
        }

        // 게시글 등록 요청
        const response = await axios.post('http://localhost:8000/core-service/boards/board', requestData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
          },
          timeout: 5000
        })

        if (response.status === 200 || response.status === 201) {
          // 스타일쉐어 목록 페이지로 이동
          this.$router.push('/style-share')
        } else {
          throw new Error('게시글 등록에 실패했습니다.')
        }
      } catch (error) {
        console.error('게시글 등록 실패:', error)
        if (error.response) {
          console.error('Error response:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
          })
          
          if (error.response.status === 401) {
            alert('로그인이 필요하거나 인증이 만료되었습니다. 다시 로그인해주세요.')
            this.$router.push('/login')
          } else if (error.response.status === 404) {
            alert('요청한 리소스를 찾을 수 없습니다. 서버 엔드포인트를 확인해주세요.')
          } else {
            alert(`게시글 등록 실패: ${error.response.data.message || '서버 오류가 발생했습니다.'}`)
          }
        } else if (error.request) {
          alert('서버로부터 응답이 없습니다. 서버 상태를 확인해주세요.')
        } else {
          alert(error.message || '게시글 등록 중 오류가 발생했습니다.')
        }
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
.content-container {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
}

.header-section {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  z-index: 100;
}

.back-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #333;
}

.back-arrow {
  font-size: 1.8rem;
}

.submit-btn {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #333;
  padding: 0.5rem 1rem;
}

.submit-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.form-container {
  display: flex;
  gap: 24px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.upload-section {
  flex: 1;
  min-width: 400px;
}

.input-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.image-upload {
  width: 100%;
  border: 2px dashed #ddd;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.image-upload.drag-over {
  border-color: #1976d2;
  background-color: #f0f0f0;
}

.upload-area {
  width: 100%;
  height: 400px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  background-color: #fff;
}

.upload-area:hover {
  border-color: #1976d2;
}

.upload-icon {
  font-size: 48px;
  color: #666;
}

.preview-image {
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.title-input, .content-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.content-input {
  min-height: 300px;
  resize: vertical;
}

.submit-button {
  padding: 12px 24px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  align-self: flex-end;
}

.submit-button:hover {
  background-color: #1565c0;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.upload-text {
  width: 100%;
  padding: 0.75rem;
  color: #666;
  font-size: 0.9rem;
  text-align: left;
  border-top: 1px solid #eee;
  background-color: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.file-input {
  display: none;
}

.thumbnail-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.thumbnail {
  width: 80px;
  height: 80px;
  position: relative;
  flex-shrink: 0;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.add-more-images {
  width: 80px;
  height: 80px;
  border: 2px dashed #eee;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  background-color: #f8f8f8;
}

.remove-image {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.thumbnail-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.thumbnail-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.plus-icon {
  font-size: 2rem;
  color: #666;
  font-weight: 300;
}
</style>
