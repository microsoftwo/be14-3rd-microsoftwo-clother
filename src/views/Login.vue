<template>
  <!-- No changes to template section -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import profileImage from '../icons/profile-mando.jpg'

const router = useRouter()
const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    // 테스트를 위해 임시로 토큰 생성
    const mockToken = 'mock-token-' + Date.now()
    localStorage.setItem('accessToken', mockToken)

    // 목업 데이터 설정
    localStorage.setItem('userNickname', 'michalamet')
    localStorage.setItem('userProfileImageUrl', profileImage)
    localStorage.setItem('userHeight', '165')
    localStorage.setItem('userWeight', '45')
    localStorage.setItem('userBio', '귀여운 게 최고야')

    // storage 이벤트 발생시키기
    window.dispatchEvent(new Event('storage'))

    router.push('/')
  } catch (error) {
    console.error('로그인 중 오류 발생:', error)
    alert('로그인 중 오류가 발생했습니다.')
  } finally {
    loading.value = false
  }
}
</script> 