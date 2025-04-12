<template>
  <div class="content-container">
    <div class="header-section">
      <button class="back-button" @click="goBack">
        <span class="back-arrow">‹</span>
      </button>
      <button class="submit-btn" @click="handleSubmit" :disabled="!isFormValid">등록</button>
    </div>
    
    <div class="upload-section">
      <div class="image-upload" 
           @dragover.prevent 
           @drop.prevent="handleDrop"
           :class="{ 'drag-over': isDragging }">
        <div class="main-image">
          <div v-if="uploadedImages.length > 0" class="selected-image">
            <img :src="uploadedImages[selectedImageIndex].url" :alt="'Selected image'" />
            <button class="remove-image" @click.stop="removeImage(selectedImageIndex)">×</button>
          </div>
          <div v-else class="upload-placeholder">
            <span class="upload-icon">+</span>
          </div>
        </div>
        
        <div v-if="uploadedImages.length > 0" class="thumbnail-container">
          <div v-for="(image, index) in uploadedImages.filter((_, i) => i !== selectedImageIndex)" 
               :key="index" 
               class="thumbnail"
               @click="selectImage(index)">
            <img :src="image.url" :alt="'Thumbnail ' + (index + 1)" />
            <button class="remove-image" @click.stop="removeImage(index)">×</button>
          </div>
          <div v-if="uploadedImages.length < 5" 
               class="add-more-images"
               @click="$refs.fileInput.click()">
            <span class="plus-icon">+</span>
          </div>
        </div>
        
        <div class="upload-text">
          {{ uploadedImages.length > 0 
             ? `${uploadedImages.length}/5 이미지 업로드됨` 
             : '사진은 최대 5장까지 등록 가능합니다' }}
        </div>
        
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          class="file-input"
          @change="handleFileSelect"
          ref="fileInput" 
        />
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
      uploadedImages: [],
      isDragging: false,
      isSubmitting: false,
      selectedImageIndex: 0
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
    },

    handleDrop(event) {
      this.isDragging = false
      const files = Array.from(event.dataTransfer.files)
      this.addFiles(files)
    },

    addFiles(files) {
      const imageFiles = files.filter(file => file.type.startsWith('image/'))
      const remainingSlots = 5 - this.uploadedImages.length

      if (remainingSlots <= 0) {
        alert('최대 5장까지만 업로드할 수 있습니다.')
        return
      }

      const filesToAdd = imageFiles.slice(0, remainingSlots)

      filesToAdd.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.uploadedImages.push({
            file: file,
            url: e.target.result
          })
        }
        reader.readAsDataURL(file)
      })
    },

    selectImage(index) {
      this.selectedImageIndex = index
    },
    
    removeImage(index) {
      this.uploadedImages = this.uploadedImages.filter((_, i) => i !== index)
      
      if (this.uploadedImages.length === 0) {
        if (this.$refs.fileInput) {
          this.$refs.fileInput.value = ''
        }
        this.selectedImageIndex = 0
      } else if (index <= this.selectedImageIndex && this.selectedImageIndex > 0) {
        this.selectedImageIndex--
      }
    },

    async handleSubmit() {
      if (!this.isFormValid) return

      this.isSubmitting = true

      try {
        const formData = new FormData()
        formData.append('title', this.title)
        formData.append('content', this.content)
        this.uploadedImages.forEach((image, index) => {
          formData.append(`image${index}`, image.file)
        })

        // API 호출은 Vuex action으로 이동
        await this.$store.dispatch('styleshare/createPost', formData)
        
        this.resetForm()
        this.$router.push('/style-share') // 스타일 쉐어 목록 페이지로 이동
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('업로드 중 오류가 발생했습니다. 다시 시도해주세요.')
      } finally {
        this.isSubmitting = false
      }
    },

    resetForm() {
      this.title = ''
      this.content = ''
      this.uploadedImages = []
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    }
  }
}
</script>

<style scoped>
.content-container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 20px;
  padding: 2rem;
  position: relative;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-button {
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  display: flex;
  align-items: center;
}

.back-arrow {
  line-height: 1;
}

.submit-btn {
  padding: 0.5rem 1.5rem;
  background-color: #e9e9e9;
  color: #000;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.upload-section {
  display: flex;
  gap: 2rem;
}

.image-upload {
  flex: 1;
  aspect-ratio: 1;
  background-color: #f8f8f8;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem;
}

.main-image {
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 1rem;
  border-radius: 20px;
  overflow: visible;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.selected-image {
  width: 100%;
  height: 100%;
  position: relative;
}

.selected-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.upload-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-icon {
  font-size: 3rem;
  color: #ccc;
}

.upload-text {
  text-align: center;
  color: #999;
  font-size: 0.9rem;
  padding: 0.5rem;
  background-color: #f8f8f8;
  border-radius: 10px;
  margin-top: auto;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.input-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title-input {
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  background-color: #f5f5f5;
  color: #333;
}

.content-input {
  padding: 1rem;
  border: none;
  border-radius: 10px;
  height: 300px;
  resize: none;
  font-size: 1rem;
  background-color: #f5f5f5;
  color: #333;
}

.title-input::placeholder,
.content-input::placeholder {
  color: #999;
}

.drag-over {
  border: 2px dashed #666 !important;
  background-color: #f0f0f0 !important;
}

.thumbnail-container {
  display: flex;
  gap: 10px;
  padding: 10px 0;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.thumbnail-container::-webkit-scrollbar {
  display: none;
}

.thumbnail {
  flex: 0 0 80px;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: visible;
  position: relative;
  cursor: pointer;
  border: 2px solid transparent;
}

.thumbnail.selected {
  border-color: #000;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.add-more-images {
  flex: 0 0 80px;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.plus-icon {
  font-size: 2rem;
  color: #ccc;
}

.remove-image {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #ff4444;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  padding: 0;
  line-height: 1;
}

.remove-image:hover {
  background-color: #ff0000;
  transform: scale(1.1);
  transition: all 0.2s ease;
}
</style> 