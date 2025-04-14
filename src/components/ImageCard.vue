<template>
    <div class="image-card" :style="{ height: cardHeight }">
      <div v-if="showIndex" class="number-box">{{ index }}</div>
      <img :src="imageUrl" :alt="'Image ' + index" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'ImageCard',
    props: {
      imageUrl: {
        type: String,
        required: true
      },
      index: {
        type: Number,
        required: false,
        default: 0
      },
      showIndex: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {
        heights: ['315px', '340px', '360px'],
        cardHeight: '315px'
      }
    },
    mounted() {
      this.cardHeight = this.heights[Math.floor(Math.random() * this.heights.length)]
    }
  }
  </script>
  
  <style scoped>
  .image-card {
    border-radius: 50px;
    overflow: hidden;
    background-color: #f5f5f5;
    position: relative;
    transition: all 0.3s ease;
    width: 100%;
  }
  
  .image-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .image-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 숫자 박스 */
  .number-box {
    position: absolute;
    top: 15px;
    left: 17px;
    width: 30px;
    height: 30px;
    background-color: black;
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight:400;
    font-size: 13px;
    z-index: 1;
  }
  </style> 