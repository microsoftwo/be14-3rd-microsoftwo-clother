<template>
  <div class="post-create-card">
    <!-- Back button -->
    <div class="back-button">
      <i class="fas fa-chevron-left"></i>
    </div>

    <!-- Hidden file input moved outside -->
    <input
      type="file"
      ref="fileInput"
      @change="handleImageUpload"
      accept="image/*"
      multiple
      class="hidden-input"
    >

    <div class="post-container">
      <!-- Submit button -->
      <button 
        class="submit-button" 
        @click="handleSubmit"
        :disabled="!selectedImages.length"
      >
        등록하기
      </button>

      <!-- Left: Image section -->
      <div class="image-section">
        <div v-if="!selectedImages.length" class="image-upload-placeholder" @click="triggerImageUpload">
          <div class="upload-icon">
            <i class="fas fa-plus"></i>
          </div>
          <div class="upload-text">사진을 첨부해주세요</div>
        </div>
        
        <div v-else class="image-preview-container">
          <!-- Main Image -->
          <div class="main-image">
            <img :src="selectedImages[currentImageIndex]" alt="Main preview">
            <div v-if="currentImageIndex === 0" class="tags-container">
              <!-- Hair tags -->
              <div
                v-for="tag in hairTags"
                :key="'hair-' + tag.id"
                class="draggable-tag"
                :style="{ left: tag.x + 'px', top: tag.y + 'px' }"
                @mousedown="startDrag($event, tag, 'hair')"
              >
                <div class="tag-info">
                  <div class="tag-content">
                    <div class="tag-brand">헤어샵</div>
                    <div class="tag-name">{{ tag.shopName }}</div>
                    <a :href="tag.shopLink" target="_blank" class="shop-link" @click.stop>
                      <i class="fab fa-instagram"></i> 샵 방문하기
                    </a>
                  </div>
                </div>
                <button class="tag-delete" @click.stop="removeHairTag(tag)">×</button>
              </div>

              <!-- Product tags -->
              <div
                v-for="tag in productTags"
                :key="'product-' + tag.id"
                class="draggable-tag product-tag"
                :style="{ left: tag.x + 'px', top: tag.y + 'px' }"
                @mousedown="startDrag($event, tag, 'product')"
              >
                <div class="tag-info">
                  <div class="tag-content">
                    <div class="tag-brand">{{ tag.brandName }}</div>
                    <div class="tag-name">{{ tag.name }}</div>
                    <a :href="tag.link" target="_blank" class="shop-link" @click.stop>
                      <i class="fas fa-shopping-bag"></i> 상품 보기
                    </a>
                  </div>
                </div>
                <button class="tag-delete" @click.stop="removeProductTag(tag)">×</button>
              </div>
            </div>
          </div>
          
          <!-- Toggle Button -->
          <div class="thumbnail-toggle" @click="toggleThumbnails">
            <i :class="['fas', showThumbnails ? 'fa-chevron-down' : 'fa-chevron-up']"></i>
          </div>
          
          <!-- Thumbnail List -->
          <div class="thumbnail-list" :class="{ 'show-thumbnails': showThumbnails }">
            <div 
              v-for="(image, index) in selectedImages" 
              :key="index"
              class="thumbnail-item"
              :class="{ active: index === currentImageIndex }"
              @click="currentImageIndex = index"
            >
              <img :src="image" alt="Thumbnail">
              <button class="delete-button" @click.stop="deleteImage(index)">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <!-- Upload More Button -->
            <div 
              v-if="selectedImages.length < 5" 
              class="thumbnail-upload"
              @click="triggerImageUpload"
            >
              <i class="fas fa-plus"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Info section -->
      <div class="info-section">
        <div class="input-section">
          <textarea
            class="content-input"
            placeholder="내용을 입력해주세요"
            rows="1"
            v-model="postContent"
          ></textarea>
        </div>

        <!-- Style Tags Section -->
        <div class="style-tags-section">
          <!-- Look Tag -->
          <div class="tag-section">
            <div class="tag-label">LOOK-TAG</div>
            <div class="tag-input-container" @click="openLookTagModal">
              <div class="tag-select-box">
                <div v-if="selectedTags.length === 0" class="tag-placeholder">
                  스타일을 선택해주세요
                </div>
                <div v-else class="selected-tag-list">
                  <span v-for="tag in selectedTags" :key="tag.id" class="selected-tag">
                    {{ tag.name }}
                    <span class="remove-tag" @click.stop="removeTag(tag)">×</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Hair Tag -->
          <div class="tag-section">
            <div class="tag-label">HAIR</div>
            <div class="tag-input-container" @click="openHairModal">
              <div class="tag-select-box">
                <div v-if="hairTags.length === 0" class="tag-placeholder">
                  헤어샵을 추가해주세요
                </div>
                <div v-else class="selected-tag-list">
                  <span v-for="tag in hairTags" :key="tag.id" class="selected-tag">
                    {{ tag.shopName }}
                    <span class="remove-tag" @click.stop="removeHairTag(tag)">×</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Tag -->
          <div class="tag-section">
            <div class="tag-label">PRODUCT</div>
            <div class="tag-input-container" @click="openProductModal">
              <div class="tag-select-box">
                <div v-if="productTags.length === 0" class="tag-placeholder">
                  상품을 추가해주세요
                </div>
                <div v-else class="selected-tag-list">
                  <span v-for="tag in productTags" :key="tag.id" class="selected-tag">
                    {{ tag.name }}
                    <span class="remove-tag" @click.stop="removeProductTag(tag)">×</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Look Tag Modal -->
    <div v-if="showLookTagModal" class="modal-overlay" @click="closeLookTagModal">
      <div class="modal-content" @click.stop>
        <h3>룩태그 선택</h3>
        <div class="tag-categories">
          <div v-for="category in categories" :key="category.id" class="category">
            <h4>{{ category.name }}</h4>
            <div class="tag-options">
              <label v-for="tag in getTagsByParentId(category.id)" :key="tag.id" class="tag-option">
                <input
                  type="checkbox"
                  :value="tag"
                  v-model="tempSelectedTags"
                  :checked="isTagSelected(tag)"
                >
                <span class="custom-checkbox"></span>
                {{ tag.name }}
              </label>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="apply-button" @click="applyTags">적용</button>
        </div>
      </div>
    </div>

    <!-- Hair Tag Modal -->
    <div v-if="showHairModal" class="modal-overlay" @click="closeHairModal">
      <div class="modal-content" @click.stop>
        <h3>헤어샵 추가</h3>
        <div class="modal-input-group">
          <div class="input-field">
            <label>헤어샵 이름</label>
            <input v-model="newHairTag.shopName" type="text" placeholder="헤어샵 이름을 입력해주세요">
          </div>
          <div class="input-field">
            <label>헤어샵 링크</label>
            <input v-model="newHairTag.shopLink" type="text" placeholder="헤어샵 링크를 입력해주세요">
          </div>
        </div>
        <div class="modal-actions">
          <button class="cancel-button" @click="closeHairModal">취소</button>
          <button class="apply-button" @click="addHairTag">추가</button>
        </div>
      </div>
    </div>

    <!-- Product Tag Modal -->
    <div v-if="showProductModal" class="modal-overlay" @click="closeProductModal">
      <div class="modal-content product-modal" @click.stop>
        <h3>상품 추가</h3>
        <div class="search-section">
          <div class="search-input">
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="상품명을 입력해주세요"
              @keyup.enter="searchProducts"
            >
            <button class="search-button" @click="searchProducts">
              <i class="fas fa-search"></i>
            </button>
          </div>
          <div class="search-results">
            <div
              v-for="product in searchResults"
              :key="product.id"
              class="product-item"
              :class="{ selected: selectedProduct?.id === product.id }"
              @click="selectProduct(product)"
            >
              <img :src="product.imageUrl" :alt="product.name">
              <div class="product-info">
                <div class="product-brand">{{ product.brandName }}</div>
                <div class="product-name">{{ product.name }}</div>
                <div class="product-price">{{ product.price }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="cancel-button" @click="closeProductModal">취소</button>
          <button class="apply-button" @click="addProductTag">추가</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { LookTags } from '../constants/lookTag'
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedImages = ref([])
const fileInput = ref(null)
const currentImageIndex = ref(0)
const showThumbnails = ref(false)
const showLookTagModal = ref(false)
const selectedTags = ref([])
const tempSelectedTags = ref([])
const showHairModal = ref(false)
const hairTags = ref([])
const showProductModal = ref(false)
const productTags = ref([])
const newHairTag = ref({
  shopName: '',
  shopLink: '',
  x: 50,
  y: 50
})
const draggingTag = ref(null)
const dragOffset = ref({ x: 0, y: 0 })
const searchKeyword = ref('')
const searchResults = ref([])
const selectedProduct = ref(null)
const postContent = ref('')

const categories = computed(() => {
  return Object.entries(LookTags)
    .filter(([_, tag]) => tag.parent_id === null)
    .map(([id, tag]) => ({
      id: Number(id),
      name: tag.name
    }))
})

const getTagsByParentId = (parentId) => {
  return Object.entries(LookTags)
    .filter(([_, tag]) => tag.parent_id === parentId)
    .map(([id, tag]) => ({
      id: Number(id),
      name: tag.name
    }))
}

const triggerImageUpload = () => {
  if (selectedImages.value.length >= 5) {
    alert('최대 5장까지만 업로드할 수 있습니다.')
    return
  }
  fileInput.value.click()
}

const handleImageUpload = (event) => {
  let files = Array.from(event.target.files)
  
  // 현재 선택된 파일 수와 이미 업로드된 파일 수의 합이 5를 초과하면 처리하지 않음
  const totalCount = selectedImages.value.length + files.length
  if (totalCount > 5) {
    alert('이미지는 최대 5장까지만 업로드할 수 있습니다.')
    event.target.value = null
    return
  }

  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedImages.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
  
  event.target.value = null
}

const deleteImage = (index) => {
  selectedImages.value = selectedImages.value.filter((_, i) => i !== index)
  if (currentImageIndex.value >= selectedImages.value.length) {
    currentImageIndex.value = Math.max(0, selectedImages.value.length - 1)
  }
}

const toggleThumbnails = () => {
  showThumbnails.value = !showThumbnails.value
}

// Reset currentImageIndex when all images are deleted
watch(selectedImages, (newImages) => {
  if (newImages.length === 0) {
    currentImageIndex.value = 0
  }
})

const openLookTagModal = () => {
  tempSelectedTags.value = [...selectedTags.value]
  showLookTagModal.value = true
}

const closeLookTagModal = () => {
  showLookTagModal.value = false
}

const applyTags = () => {
  selectedTags.value = [...tempSelectedTags.value]
  closeLookTagModal()
}

const removeTag = (tag) => {
  selectedTags.value = selectedTags.value.filter(t => t.id !== tag.id)
}

const isTagSelected = (tag) => {
  return tempSelectedTags.value.some(t => t.id === tag.id)
}

const openHairModal = () => {
  if (hairTags.value.length > 0) {
    alert('헤어샵은 하나만 추가할 수 있습니다.')
    return
  }

  newHairTag.value = {
    shopName: '',
    shopLink: '',
    x: 50,
    y: 50
  }
  showHairModal.value = true
}

const closeHairModal = () => {
  showHairModal.value = false
}

const addHairTag = () => {
  if (!newHairTag.value.shopName || !newHairTag.value.shopLink) {
    alert('헤어샵 이름과 링크를 모두 입력해주세요.')
    return
  }

  if (hairTags.value.length > 0) {
    alert('헤어샵은 하나만 추가할 수 있습니다.')
    return
  }
  
  hairTags.value.push({
    id: Date.now(),
    ...newHairTag.value
  })
  closeHairModal()
}

const removeHairTag = (tag) => {
  hairTags.value = hairTags.value.filter(t => t.id !== tag.id)
}

const startDrag = (event, tag, type) => {
  if (currentImageIndex.value !== 0) return;

  draggingTag.value = { tag, type };
  const tagElement = event.target.closest('.draggable-tag');
  const parentElement = tagElement.closest('.main-image'); // 부모 요소를 기준으로 계산
  const parentRect = parentElement.getBoundingClientRect();

  // 마우스 클릭 지점과 태그의 좌상단 좌표 간의 차이를 계산
  dragOffset.value = {
    x: event.clientX - tagElement.getBoundingClientRect().left,
    y: event.clientY - tagElement.getBoundingClientRect().top,
  };

  // 부모 요소의 좌표 저장
  draggingTag.value.parentRect = parentRect;

  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
};

const handleDrag = (event) => {
  if (!draggingTag.value) return;

  const { tag, parentRect } = draggingTag.value;

  // 부모 요소의 좌표를 기준으로 태그의 새로운 위치를 계산
  tag.x = event.clientX - parentRect.left - dragOffset.value.x;
  tag.y = event.clientY - parentRect.top - dragOffset.value.y;
  console.log(`Updated tag position: x=${tag.x}, y=${tag.y}`); // 디버깅용
};

const stopDrag = () => {
  draggingTag.value = null;
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
};

const openProductModal = () => {
  showProductModal.value = true
}

const closeProductModal = () => {
  showProductModal.value = false
}

const searchProducts = async () => {
  if (!searchKeyword.value.trim()) return
  
  try {
    const response = await fetch(`http://localhost:8081/products/search?keyword=${encodeURIComponent(searchKeyword.value)}`)
    const data = await response.json()
    searchResults.value = data
  } catch (error) {
    console.error('상품 검색 중 오류 발생:', error)
  }
}

const selectProduct = (product) => {
  selectedProduct.value = {
    ...product,
    x: 50,
    y: 50
  }
}

const addProductTag = () => {
  if (!selectedProduct.value) {
    alert('상품을 선택해주세요.')
    return
  }
  
  productTags.value.push({
    id: Date.now(),
    ...selectedProduct.value
  })
  
  selectedProduct.value = null
  searchKeyword.value = ''
  searchResults.value = []
  closeProductModal()
}

const removeProductTag = (tag) => {
  productTags.value = productTags.value.filter(t => t.id !== tag.id)
}

// Function to convert base64 to File object
const base64ToFile = (base64String, filename) => {
  const arr = base64String.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// Get headers with authorization
const getHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    };
};

// Handle form submission
const handleSubmit = async () => {
    if (!selectedImages.value.length) {
        alert('이미지를 선택해주세요.');
        return;
    }

    try {
        // Upload images to S3
        const uploadedImages = await Promise.all(
      selectedImages.value.map(async (base64Image, index) => {
        const fileName = `post_image_${Date.now()}_${index}.jpg`;
        const file = base64ToFile(base64Image, fileName); // Base64 데이터를 File 객체로 변환

        // S3 업로드 URL 가져오기
        const response = await fetch(
          `http://localhost:8000/image-service/images/url?fileName=${fileName}`,
          {
            method: 'GET',
            mode: 'cors',
          }
        );
        const url = await response.text();

        // S3에 이미지 업로드
        await fetch(url, {
          method: 'PUT',
          mode: 'cors',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });

        // 업로드된 이미지의 URL 반환
        return { imageUrl: url.split('?')[0], order: index + 1 }; // URL에서 쿼리스트링 제거
      })
    );

        // Prepare request body
        const requestBody = {
            content: postContent.value,
            imageVOs: uploadedImages,
            lookTags: selectedTags.value.map(tag => tag.id),
            productTagVOs: productTags.value.map(tag => ({
                productId: tag.id,
                categoryId: tag.categoryId,
                productTagPositionX: tag.x,
                productTagPositionY: tag.y
            })),
            hairTagVO: hairTags.value.length > 0 ? {
                hairShopLink: hairTags.value[0].shopLink,
                hairShopName: hairTags.value[0].shopName,
                categoryId: 105,
                hairTagPositionX: hairTags.value[0].x,
                hairTagPositionY: hairTags.value[0].y
            } : null
        };

        console.log(JSON.stringify(requestBody));

        // Send POST request
        const response = await fetch('http://localhost:8000/core-service/post', {
            method: 'POST',
            headers: getHeaders(),
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        // Reset form
        postContent.value = '';
        selectedImages.value = [];
        selectedTags.value = [];
        productTags.value = [];
        hairTags.value = [];
        alert('게시글이 등록되었습니다.');
        router.replace('/newest');
    } catch (error) {
        console.error('Error creating post:', error);
        alert('게시글 등록 중 오류가 발생했습니다.');
    }
};
</script>

<style scoped>
.post-create-card {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-button {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
  color: #000;
  font-size: 24px;
  cursor: pointer;
}

.post-container {
  display: flex;
  width: 1000px;
  height: 500px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: visible;
  position: relative;
}

.submit-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #333;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  z-index: 10;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.image-section {
  width: 500px;
  height: 500px;
  background: #f8f8f8;
  position: relative;
  flex-shrink: 0;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.image-upload-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 16px;
}

.upload-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-icon i {
  font-size: 24px;
  color: #666;
}

.upload-text {
  color: #666;
  font-size: 14px;
}

.hidden-input {
  display: none;
}

.info-section {
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 60px 20px 20px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.input-section {
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
}

.content-input {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #f8f8f8;
  font-size: 14px;
  resize: none;
  outline: none;
  color: #000;
  box-sizing: border-box;
  font-family: inherit;
  line-height: 1.5;
}

.style-tags-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.style-tag-header {
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-bottom: 8px;
  text-align: left;
}

.tag-section {
  margin-bottom: 16px;
  text-align: left;
}

.tag-label {
  font-size: 12px;
  color: #000;
  text-align: left;
  margin-bottom: 8px;
}

.tag-input-container {
  display: flex;
  gap: 8px;
  text-align: left;
}

.tag-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  outline: none;
  text-align: left;
}

.tag-add-button {
  width: 32px;
  height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  color: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.tag-add-button:hover {
  background: #f8f8f8;
}

.image-preview-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.main-image {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
}

.thumbnail-toggle {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.2s ease;
}

.thumbnail-toggle:hover {
  background: rgba(0, 0, 0, 0.7);
}

.thumbnail-list {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 500px;
  height: 80px;
  display: flex;
  gap: 8px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.5);
  transform: translateY(100%);
  transition: transform 0.3s ease;
  opacity: 0;
}

.thumbnail-list.show-thumbnails {
  transform: translateY(0);
  opacity: 1;
}

.thumbnail-item {
  width: 64px;
  height: 64px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
}

.thumbnail-item.active {
  border-color: white;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-button {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s ease;
}

.delete-button:hover {
  background: rgba(0, 0, 0, 0.7);
}

.thumbnail-upload {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  transition: background-color 0.2s ease;
}

.thumbnail-upload:hover {
  background: #e0e0e0;
}

.look-tag-section {
  margin: 15px 0;
}

.selected-tags {
  min-height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
}

.tag-placeholder {
  color: #666;
  text-align: left;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #f8f8f8;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  color: #000;
  border: 1px solid #e0e0e0;
}

.remove-tag {
  margin-left: 6px;
  font-size: 16px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #000;
}

.tag-categories {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.category h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #000;
  font-weight: bold;
}

.tag-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-left: 12px;
}

.tag-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #000;
  padding: 6px 12px;
  border-radius: 16px;
  transition: background-color 0.2s ease;
  user-select: none;
}

.tag-option:hover {
  background-color: #f5f5f5;
}

.tag-option input[type="checkbox"] {
  display: none;
}

.custom-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background: white;
}

.tag-option input[type="checkbox"]:checked + .custom-checkbox {
  background: #333;
  border-color: #333;
}

.custom-checkbox::after {
  content: '\2714';
  color: white;
  font-size: 12px;
  display: none;
}

.tag-option input[type="checkbox"]:checked + .custom-checkbox::after {
  display: block;
}

.modal-actions {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.apply-button {
  background-color: #333;
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}

.apply-button:hover {
  background-color: #555;
}

.tag-select-box {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  min-height: 32px;
  cursor: pointer;
}

.selected-tag-list {
  display: flex;
  align-items: center;
  gap: 4px;
}

.selected-tag {
  display: inline-flex;
  align-items: center;
  background-color: #f8f8f8;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  color: #000;
  border: 1px solid #e0e0e0;
}

.selected-tag > span:first-child {
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.remove-tag {
  margin-left: 4px;
  font-size: 14px;
  cursor: pointer;
  color: #666;
}

.tags-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.draggable-tag {
  position: absolute;
  pointer-events: auto;
  cursor: move;
  padding: 4px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  z-index: 10;
}

.tag-info {
  background: white;
  color: #000;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: 70px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tag-content {
  font-weight: 500;
  width: 100%;
}

.tag-brand {
  font-size: 8px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag-name {
  font-weight: 500;
  color: #000;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.shop-link {
  color: #666;
  text-decoration: none;
  font-size: 8px;
  display: flex;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag-delete {
  position: absolute;
  top: -4px;
  right: -4px;
  background: white;
  border: 1px solid #e0e0e0;
  color: #666;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-field label {
  font-size: 14px;
  color: #000;
}

.input-field input {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: white;
  color: #000;
}

.input-field input::placeholder {
  color: #666;
}

.cancel-button {
  background-color: #e0e0e0;
  color: #000;
  border: none;
  padding: 8px 24px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
}

.cancel-button:hover {
  background-color: #d0d0d0;
}

.product-modal {
  max-width: 400px;
  background: white;
}

.search-section {
  margin-bottom: 20px;
}

.search-input {
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
}

.search-input input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: #f8f8f8;
  color: #000;
}

.search-input input::placeholder {
  color: #666;
}

.search-button {
  width: 40px;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.search-button:hover {
  background: #f8f8f8;
  color: #000;
}

.search-results {
  max-height: 400px;
  overflow-y: auto;
  background: white;
}

.product-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.product-item:hover {
  background-color: #f5f5f5;
}

.product-item.selected {
  background-color: #f0f0f0;
}

.product-item img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.product-brand {
  font-size: 12px;
  color: #666;
}

.product-name {
  font-size: 14px;
  color: #000;
}

.product-price {
  font-size: 14px;
  color: #000;
  font-weight: 500;
}

.draggable-tag.product-tag .tag-info {
  width: 70px;
}

.draggable-tag.product-tag .tag-content {
  width: 100%;
}

.shop-link i {
  font-size: 8px;
}
</style> 