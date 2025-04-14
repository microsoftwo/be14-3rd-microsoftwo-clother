<template>
    <div v-if="postData" class="post-detail-card">
        <!-- Back button -->
        <div class="back-button">
            <i class="fas fa-chevron-left"></i>
        </div>

        <div class="post-container">
            <!-- Left: Image section -->
            <div class="image-section">
                <div class="image-slider">
                    <div
                        class="images"
                        :style="{
                            transform:
                                'translateX(' + -currentImageIndex * 100 + '%)',
                        }"
                    >
                        <div
                            v-for="(image, imageIndex) in postData.imagesData"
                            :key="image.id"
                            class="image-container"
                            @click="toggleTags"
                        >
                            <img
                                :src="image.imageUrl"
                                :alt="'Post image ' + image.order"
                                class="post-image"
                            />
                            <!-- Product tag markers -->
                            <div
                                v-for="tag in postData.productTags"
                                :key="tag.productId"
                                class="tag"
                                :style="getTagPosition(tag)"
                            >
                                <div class="tag-content">
                                    <div class="tag-info">
                                        <div class="tag-brand">
                                            {{ tag.productBrandName }}
                                        </div>
                                        <div class="tag-name">
                                            {{ tag.productName }}
                                        </div>
                                        <div class="tag-price">
                                            ₩{{ formatPrice(tag.productPrice) }}
                                        </div>
                                        <a
                                            :href="tag.productLink"
                                            target="_blank"
                                            class="shop-link"
                                            @click.stop
                                        >
                                            상품 보기
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <!-- Hair tag marker -->
                            <div
                                v-if="
                                    postData.hairTag &&
                                    postData.hairTag.hairTagPositionX &&
                                    postData.hairTag.hairTagPositionY &&
                                    currentImageIndex === 0
                                "
                                v-show="showTags"
                                class="hair-tag-marker"
                                :style="getHairTagPosition(postData.hairTag)"
                            >
                                <div class="tag">
                                    <div class="tag-content">
                                        <div class="tag-brand">헤어샵</div>
                                        <div class="tag-name">
                                            {{ postData.hairTag.hairShopName }}
                                        </div>
                                        <a
                                            :href="
                                                postData.hairTag.hairShopLink
                                            "
                                            target="_blank"
                                            class="shop-link"
                                            @click.stop
                                        >
                                            <i class="fab fa-instagram"></i> 샵
                                            방문하기
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <!-- Tag toggle hint -->
                            <div
                                v-if="!showTags && currentImageIndex === 0"
                                class="tag-hint"
                            >
                                이미지를 클릭하여 태그 보기
                            </div>
                        </div>
                    </div>
                    <div class="image-navigation">
                        <div class="nav-button" @click="prevImage">
                            <i class="fas fa-chevron-left"></i>
                        </div>
                        <div class="image-counter">
                            <div
                                v-for="(_, index) in postData.imagesData"
                                :key="index"
                                class="dot"
                                :class="{ active: index === currentImageIndex }"
                            ></div>
                        </div>
                        <div class="nav-button" @click="nextImage">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right: Info section -->
            <div class="info-section">
                <!-- User info -->
                <div class="user-info">
                    <div class="user-profile">
                        <div
                            v-if="!postData.userProfileImageUrl"
                            class="default-profile"
                        >
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="user-details">
                            <div class="user-name">
                                {{ postData.userNickname }}
                            </div>
                            <div class="post-date">
                                {{ formatDate(postData.createdAt) }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="post-content">
                    <p>{{ postData.content }}</p>
                    <div class="look-tags">
                        <span
                            v-for="tagId in postData.lookTagIds"
                            :key="tagId"
                            class="look-tag"
                        >
                            {{ getLookTagName(tagId) }}
                        </span>
                    </div>
                </div>

                <!-- Action tabs -->
                <div class="action-tabs">
                    <button
                        class="tab-button"
                        :class="{ active: currentTab === 'comments' }"
                        @click="currentTab = 'comments'"
                    >
                        댓글
                    </button>
                    <button
                        class="tab-button"
                        :class="{ active: currentTab === 'products' }"
                        @click="currentTab = 'products'"
                    >
                        상품
                    </button>
                    <button
                        class="tab-button"
                        :class="{ active: currentTab === 'hair' }"
                        @click="currentTab = 'hair'"
                    >
                        헤어
                    </button>
                </div>

                <!-- Tab contents -->
                <div class="tab-content">
                    <!-- Comments tab -->
                    <div
                        v-if="currentTab === 'comments'"
                        class="comments-section"
                    >
                        <!-- Comment input -->
                        <div class="comment-input">
                            <div v-if="!myProfileImage" class="default-profile">
                                <i class="fas fa-user"></i>
                            </div>
                            <img
                                v-else
                                :src="myProfileImage"
                                alt="내 프로필"
                                class="comment-profile-image"
                            />
                            <div class="comment-form">
                                <input
                                    v-model="newComment"
                                    type="text"
                                    placeholder="댓글을 입력하세요..."
                                    @keyup.enter="addComment"
                                    class="comment-text-input"
                                />
                                <button
                                    @click="addComment"
                                    :disabled="!newComment.trim()"
                                    class="comment-submit-button"
                                >
                                    게시
                                </button>
                            </div>
                        </div>

                        <!-- Comments list -->
                        <div v-if="comments.length > 0" class="comments-list">
                            <div
                                v-for="comment in comments"
                                :key="comment.id"
                                class="comment-item"
                            >
                                <div
                                    v-if="!comment.profileImage"
                                    class="default-profile"
                                >
                                    <i class="fas fa-user"></i>
                                </div>
                                <img
                                    v-else
                                    :src="comment.profileImage"
                                    alt="Profile"
                                    class="comment-profile-image"
                                />
                                <div class="comment-content">
                                    <div class="comment-header">
                                        <span class="comment-username">{{
                                            comment.username
                                        }}</span>
                                        <span class="comment-time">{{
                                            comment.time
                                        }}</span>
                                    </div>
                                    <p class="comment-text">
                                        {{ comment.text }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="no-comments">
                            <i class="far fa-comment"></i>
                            <span
                                >댓글이 아직 없습니다. 첫 댓글을 작성해
                                보세요!</span
                            >
                        </div>
                    </div>

                    <!-- Products tab -->
                    <div v-if="currentTab === 'products'" class="product-tags">
                        <div
                            v-if="
                                postData.productTags &&
                                postData.productTags.length > 0
                            "
                        >
                            <a
                                v-for="product in postData.productTags"
                                :key="product.id"
                                :href="product.productLink"
                                target="_blank"
                                class="product-card"
                            >
                                <img
                                    :src="product.productImageUrl"
                                    alt="Product"
                                    class="product-thumbnail"
                                />
                                <div class="product-info">
                                    <div class="product-brand">
                                        {{ product.productBrandName }}
                                    </div>
                                    <div class="product-name">
                                        {{ product.productName }}
                                    </div>
                                    <div class="product-price">
                                        ₩{{ formatPrice(product.productPrice) }}
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div v-else class="no-content">
                            등록된 상품이 없습니다.
                        </div>
                    </div>

                    <!-- Hair tab -->
                    <div v-if="currentTab === 'hair'" class="hair-section">
                        <div v-if="postData.hairTag" class="hair-card">
                            <div class="hair-shop-image">
                                <i class="fas fa-cut"></i>
                            </div>
                            <div class="hair-info-container">
                                <div class="hair-shop-name">
                                    {{ postData.hairTag.hairShopName }}
                                </div>
                                <a
                                    :href="postData.hairTag.hairShopLink"
                                    target="_blank"
                                    class="hair-shop-link"
                                >
                                    <i class="fab fa-instagram"></i>
                                    인스타그램 방문하기
                                </a>
                            </div>
                        </div>
                        <div v-else class="no-content">
                            <i class="fas fa-cut no-content-icon"></i>
                            <p>등록된 헤어샵 정보가 없습니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Social actions -->
                <div class="social-actions">
                    <div class="action-item likes" @click="handleLikeToggle">
                        <i
                            :class="[
                                postData.liked ? 'fas' : 'far',
                                'fa-heart',
                                { liked: postData.liked },
                            ]"
                        ></i>
                        {{ postData.likeCount }}
                    </div>
                    <div class="action-item comments">
                        <i class="far fa-comment"></i>
                        {{ postData.commentCount }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="loading">Loading...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { LookTags } from "../constants/lookTag";

const props = defineProps({
    postId: {
        type: [Number, String],
        required: true,
    },
});

const postData = ref(null);
const currentImageIndex = ref(0);
const error = ref(null);
const currentTab = ref("comments");
const showTags = ref(false);
const comments = ref([
    {
        id: 1,
        username: "jane_style",
        profileImage:
            "https://microsoftwo-clother.s3.ap-northeast-2.amazonaws.com/2025040317282302cf6d988e3047d5a442344b77c1bf60",
        text: "너무 잘 어울려요!",
        time: "2시간 전",
    },
    {
        id: 2,
        username: "fashion_lover",
        profileImage:
            "https://microsoftwo-clother.s3.ap-northeast-2.amazonaws.com/20250403172838517d6bad97fe468993c7e3325f227d99",
        text: "멋있네요",
        time: "3시간 전",
    },
    {
        id: 3,
        username: "style_queen",
        profileImage:
            "https://microsoftwo-clother.s3.ap-northeast-2.amazonaws.com/202504031730245a815f02082a471f8ce2f34e24565f6e",
        text: "좋아요 누르고 갑니다",
        time: "5시간 전",
    },
]);
const newComment = ref("");
const myNickname = ref(localStorage.getItem("userNickname") || "알 수 없음");
const myProfileImage = ref(localStorage.getItem("userProfileImageUrl") || null);

const getHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    };
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    // 1분 미만
    if (diff < 60000) {
        return "방금 전";
    }
    // 1시간 미만
    if (diff < 3600000) {
        return `${Math.floor(diff / 60000)}분 전`;
    }
    // 24시간 미만
    if (diff < 86400000) {
        return `${Math.floor(diff / 3600000)}시간 전`;
    }
    // 7일 미만
    if (diff < 604800000) {
        return `${Math.floor(diff / 86400000)}일 전`;
    }
    // 그 외
    return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const fetchPostData = async () => {
    try {
        const response = await fetch(
            `http://localhost:8000/core-service/post/${props.postId}`,
            {
                headers: getHeaders(),
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        postData.value = await response.json();
        postData.value.commentCount = 3;
    } catch (err) {
        error.value = err.message;
        console.error("Error fetching post data:", err);
    }
};

const handleLikeToggle = () => {
    postData.value.liked = !postData.value.liked;
    postData.value.likeCount += postData.value.liked ? 1 : -1;
};

const formatPrice = (price) => {
    return price.toLocaleString();
};

const getLookTagName = (tagId) => {
    return LookTags[tagId]?.name || "";
};

const toggleTags = () => {
    showTags.value = !showTags.value;
};

const getTagPosition = (tag) => {
    if (!tag) return {};
    const x = (tag.productTagPositionX / 430) * 100;
    const y = (tag.productTagPositionY / 460) * 100;
    return {
        left: `${x}%`,
        top: `${y}%`,
    };
};

const getHairTagPosition = (tag) => {
    if (!tag) return {};
    const x = (tag.hairTagPositionX / 430) * 100;
    const y = (tag.hairTagPositionY / 460) * 100;
    return {
        left: `${x}%`,
        top: `${y}%`,
    };
};

const addComment = () => {
    if (!newComment.value.trim()) return;

    const comment = {
        id: Date.now(),
        username: myNickname.value,
        profileImage: myProfileImage.value,
        text: newComment.value,
        time: "방금 전",
    };

    comments.value.unshift(comment);
    postData.value.commentCount++;
    newComment.value = "";
};

const prevImage = () => {
    currentImageIndex.value =
        (currentImageIndex.value - 1 + postData.value.imagesData.length) %
        postData.value.imagesData.length;
};

const nextImage = () => {
    currentImageIndex.value =
        (currentImageIndex.value + 1) % postData.value.imagesData.length;
};

onMounted(() => {
    fetchPostData();
});
</script>

<style scoped>
.post-detail-card {
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
    overflow: hidden;
}

.image-section {
    width: 500px;
    height: 500px;
    background: #000;
    position: relative;
    flex-shrink: 0;
    overflow: hidden;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.image-slider {
    width: 500px;
    height: 500px;
    position: relative;
    overflow: hidden;
}

.images {
    display: flex;
    height: 100%;
    transition: transform 0.3s ease-in-out;
}

.image-container {
    position: relative;
    width: 500px;
    height: 500px;
    flex-shrink: 0;
    cursor: pointer;
}

.post-image {
    width: 500px;
    height: 500px;
    object-fit: cover;
    flex-shrink: 0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.info-section {
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.user-info {
    padding: 14px 16px;
    border-bottom: 1px solid #efefef;
}

.user-profile {
    display: flex;
    align-items: center;
    gap: 12px;
}

.profile-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
}

.user-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.user-name {
    font-weight: 600;
    font-size: 14px;
    color: #000;
    text-align: left;
}

.post-date {
    font-size: 12px;
    color: #8e8e8e;
    text-align: left;
}

.post-content {
    padding: 14px 16px;
    font-size: 14px;
    line-height: 1.4;
    border-bottom: 1px solid #efefef;
    text-align: left;
    color: #000;
}

.look-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
}

.look-tag {
    background-color: #e3f2fd;
    color: #1976d2;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
}

.action-tabs {
    display: flex;
    padding: 8px;
    gap: 16px;
    border-bottom: 1px solid #efefef;
}

.tab-button {
    background: none;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    color: #000;
    cursor: pointer;
}

.tab-button.active {
    color: #000;
    font-weight: 600;
    position: relative;
}

.tab-button.active::after {
    content: "";
    position: absolute;
    bottom: -9px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #000;
}

.tab-content {
    flex: 1;
    overflow-y: auto;
}

.comments-section,
.hair-section {
    padding: 16px;
}

.coming-soon {
    text-align: center;
    color: #666;
    padding: 20px;
}

.no-content {
    text-align: center;
    color: #666;
    padding: 20px;
}

.hair-section {
    padding: 20px;
}

.hair-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hair-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.hair-shop-image {
    width: 60px;
    height: 60px;
    background: #ff4e78;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.hair-shop-image i {
    font-size: 24px;
    color: white;
}

.hair-info-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.hair-shop-name {
    font-weight: 600;
    font-size: 16px;
    color: #000;
}

.hair-shop-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #ff4e78;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
    background: #fff0f3;
    border-radius: 8px;
    transition: background 0.2s ease;
    width: fit-content;
}

.hair-shop-link:hover {
    background: #ffe4e9;
    text-decoration: none;
}

.hair-shop-link i {
    font-size: 16px;
}

.no-content {
    text-align: center;
    color: #666;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.no-content-icon {
    font-size: 32px;
    color: #ddd;
}

.no-content p {
    margin: 0;
    color: #999;
}

.product-tags {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
}

.product-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #f8f8f8;
    border-radius: 8px;
    margin-bottom: 16px;
    text-decoration: none;
    transition: all 0.2s ease;
}

.product-card:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card:last-child {
    margin-bottom: 0;
}

.product-thumbnail {
    width: 48px;
    height: 48px;
    border-radius: 4px;
    object-fit: cover;
}

.product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.product-brand {
    font-size: 12px;
    color: #000;
    text-align: left;
    width: 100%;
}

.product-name {
    font-size: 14px;
    margin: 2px 0;
    color: #000;
    text-align: left;
    width: 100%;
}

.product-price {
    font-weight: 600;
    font-size: 14px;
    color: #000;
    text-align: left;
    width: 100%;
}

.social-actions {
    display: flex;
    gap: 20px;
    padding: 16px;
    border-top: 1px solid #efefef;
    color: #000;
}

.action-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #000;
    cursor: pointer;
}

.action-item i {
    font-size: 24px;
}

.likes i {
    transition: color 0.2s ease;
}

.likes i.liked {
    color: #ed4956;
}

.likes:hover i:not(.liked) {
    color: #ed4956;
    opacity: 0.7;
}

.comments:hover {
    opacity: 0.7;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 16px;
    color: #666;
    background: transparent;
}

.product-tag-marker,
.hair-tag-marker {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 2;
    pointer-events: auto;
}

.tag {
    position: absolute;
    background: white;
    padding: 4px 6px;
    border-radius: 4px;
    font-size: 10px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    width: 70px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translate(-50%, -50%);
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

.tag-price {
    font-size: 10px;
    color: #000;
    font-weight: 500;
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
    padding: 2px 4px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.8);
}

.tag-hint {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    pointer-events: none;
    opacity: 0.8;
}

.product-tag-marker.bottom-right,
.hair-tag-marker.bottom-right {
    position: absolute;
    right: 16px;
    transform: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.product-tag-marker.bottom-right:nth-child(1) {
    bottom: 16px;
}

.product-tag-marker.bottom-right:nth-child(2) {
    bottom: 80px;
}

.product-tag-marker.bottom-right:nth-child(3) {
    bottom: 144px;
}

.product-tag-marker.bottom-right:nth-child(4) {
    bottom: 208px;
}

.product-tag-marker.bottom-right:nth-child(5) {
    bottom: 272px;
}

/* Hair tag should always be at the bottom */
.hair-tag-marker.bottom-right {
    bottom: 16px;
}

/* If there are product tags, move hair tag up */
.product-tag-marker.bottom-right + .hair-tag-marker.bottom-right {
    bottom: 80px;
}

.bottom-right .tag-info {
    width: 120px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(4px);
}

.bottom-right .tag-content {
    gap: 4px;
}

.bottom-right .tag-brand {
    font-size: 10px;
}

.bottom-right .tag-name {
    font-size: 12px;
}

.bottom-right .tag-price {
    font-size: 11px;
}

.bottom-right .shop-link {
    font-size: 11px;
    background: rgba(255, 255, 255, 0.8);
    padding: 4px 8px;
    border-radius: 4px;
}

.bottom-right .shop-link i {
    font-size: 12px;
}

.no-comments {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: #666;
    padding: 40px 20px;
}

.no-comments i {
    font-size: 32px;
    color: #ddd;
}

.no-comments span {
    font-size: 14px;
    color: #999;
}

.comment-input {
    display: flex;
    gap: 12px;
    padding: 16px;
    border-bottom: 1px solid #efefef;
}

.comment-profile-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
}

.comment-form {
    flex: 1;
    display: flex;
    gap: 8px;
}

.comment-text-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    padding: 8px 12px;
    background: #f8f8f8;
    border-radius: 8px;
    color: #000;
}

.comment-text-input::placeholder {
    color: #8e8e8e;
}

.comment-submit-button {
    background: none;
    border: none;
    color: #0095f6;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
}

.comment-submit-button:hover {
    background-color: #f0f0f0;
}

.comment-submit-button:disabled {
    color: #b2dffc;
    cursor: default;
    background-color: transparent;
}

.comments-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
}

.comment-item {
    display: flex;
    gap: 12px;
}

.comment-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
}

.comment-header {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: flex-start;
}

.comment-username {
    font-weight: 600;
    font-size: 14px;
    color: #000;
    text-align: left;
}

.comment-time {
    font-size: 12px;
    color: #8e8e8e;
    text-align: left;
}

.comment-text {
    font-size: 14px;
    color: #000;
    line-height: 1.4;
    margin: 0;
    text-align: left;
}

.image-navigation {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    z-index: 3;
    visibility: v-bind(postData?.imagesData?.length > 1 ? "visible": "hidden");
}

.nav-button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #000;
    font-size: 16px;
    transition: background 0.2s ease;
    position: relative;
    z-index: 3;
}

.nav-button:last-child {
    margin-right: 32px;
}

.nav-button:hover {
    background: rgba(255, 255, 255, 0.9);
}

.image-counter {
    position: absolute;
    top: 16px;
    left: 46%;
    transform: translateY(-1700%);
    display: flex;
    gap: 6px;
    z-index: 3;
    background: rgba(0, 0, 0, 0.3);
    padding: 4px 8px;
    border-radius: 12px;
}

.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transition: background 0.2s ease;
}

.dot.active {
    background: rgba(255, 255, 255, 1);
}

.default-profile {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 14px;
    border: 1px solid #e0e0e0;
}

.default-profile i {
    color: #666;
    font-size: 14px;
}
</style>
