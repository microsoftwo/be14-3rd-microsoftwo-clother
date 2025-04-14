<template>
  <div class="content-container">
    <div class="header-section">
      <button class="back-button" @click="goBack">
        <span class="back-arrow">‹</span>
      </button>
      <button class="submit-btn" @click="handleSubmit" :disabled="!isFormValid">등록</button>
    </div>

    <div class="main-content">
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
        const formData = new FormData()
        formData.append('title', this.title)
        formData.append('content', this.content)
        this.uploadedImages.forEach((img, index) => {
          formData.append(`images`, img.file)
        })

        await this.$axios.post('/boards/board', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        })

        this.$router.push('/styleshare')
      } catch (error) {
        console.error('게시글 등록 실패:', error)
        alert('게시글 등록에 실패했습니다.')
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

.main-content {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
}

.upload-section {
  width: 50%;
  flex-shrink: 0;
}

.image-upload {
  width: 100%;
  border: 2px dashed #eee;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1rem;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.image-upload.drag-over {
  border-color: #666;
  background-color: #f0f0f0;
}

.upload-area {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plus-icon {
  font-size: 2rem;
  color: #666;
  font-weight: 300;
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

.input-section {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title-input {
  width: 100%;
  padding: 1rem;
  border: none;
  font-size: 1rem;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.content-input {
  width: 100%;
  flex: 1;
  min-height: 400px;
  padding: 1rem;
  border: none;
  font-size: 1rem;
  resize: none;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.title-input:focus,
.content-input:focus {
  outline: none;
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

.file-input {
  display: none;
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

.preview-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
