<template>
  <div class="signup-container">
    <h2 class="signup-title">회원가입</h2>
    <form @submit.prevent="handleSubmit" class="signup-form">
      <!-- 이메일 입력 -->
      <div class="form-group">
        <label for="email">이메일</label>
        <div class="input-with-button">
          <input 
            type="email" 
            id="email" 
            v-model="formData.email"
            :class="{ 'error': errors.email }"
            placeholder="clother@clother.com"
          />
          <div class="button-timer-container">
            <button 
              type="button" 
              class="verify-button"
              @click="verifyEmail"
              :disabled="!isEmailValid || isEmailVerified || isLoading"
            >
              {{ isLoading ? '전송 중...' : '메일 전송' }}
            </button>
            <span v-if="isEmailSent && !isEmailVerified" class="timer">
              {{ formatTime(remainingTime) }}
            </span>
          </div>
        </div>
        <p class="error-message" v-if="errors.email">{{ errors.email }}</p>
        <p class="success-message" v-if="isEmailSent">
          인증 코드가 이메일로 발송되었습니다
        </p>
      </div>

      <!-- 인증번호 입력 -->
      <div class="form-group" v-if="isEmailSent">
        <label for="authNum">인증번호</label>
        <div class="input-with-button">
          <input 
            type="text" 
            id="authNum" 
            v-model="formData.authNum"
            :class="{ 'error': errors.authNum }"
            placeholder="인증 번호를 입력해 주세요"
          />
          <button 
            type="button" 
            class="verify-button"
            @click="verifyCode"
            :disabled="!formData.authNum"
          >
            인증
          </button>
        </div>
        <p class="error-message" v-if="errors.authNum">{{ errors.authNum }}</p>
        <p class="success-message" v-if="isEmailVerified">메일 인증이 완료 되었습니다</p>
      </div>

      <!-- 비밀번호 입력 -->
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input 
          type="password" 
          id="password" 
          v-model="formData.password"
          :class="{ 'error': errors.password }"
          placeholder="영문, 숫자, 특수문자 포함 8자 이상"
          @input="validatePassword"
        />
        <p class="error-message" v-if="errors.password">{{ errors.password }}</p>
        <p class="success-message" v-if="formData.password && !errors.password">
          사용 가능한 비밀번호입니다
        </p>
      </div>

      <!-- 닉네임 입력 -->
      <div class="form-group">
        <label for="nickname">닉네임</label>
        <input 
          type="text" 
          id="nickname" 
          v-model="formData.nickname"
          :class="{ 'error': errors.nickname }"
          placeholder="특수문자 제외 8자 이하"
        />
        <p class="error-message" v-if="errors.nickname">{{ errors.nickname }}</p>
      </div>

      <!-- 성별 선택 -->
      <div class="form-group">
        <label>성별</label>
        <div class="gender-buttons">
          <button 
            type="button"
            :class="['gender-button', { active: formData.gender === '여성' }]"
            @click="selectGender('여성')"
          >
            여성
          </button>
          <button 
            type="button"
            :class="['gender-button', { active: formData.gender === '남성' }]"
            @click="selectGender('남성')"
          >
            남성
          </button>
        </div>
        <p class="error-message" v-if="errors.gender">{{ errors.gender }}</p>
      </div>

      <!-- 키 입력 -->
      <div class="form-group">
        <label for="height">키 (선택사항)</label>
        <input 
          type="number" 
          id="height" 
          v-model="formData.height"
          :class="{ 'error': errors.height }"
          placeholder="키를 입력해 주세요"
        />
        <p class="error-message" v-if="errors.height">{{ errors.height }}</p>
      </div>

      <!-- 몸무게 입력 -->
      <div class="form-group">
        <label for="weight">몸무게 (선택사항)</label>
        <input 
          type="number" 
          id="weight" 
          v-model="formData.weight"
          :class="{ 'error': errors.weight }"
          placeholder="몸무게를 입력해 주세요"
        />
        <p class="error-message" v-if="errors.weight">{{ errors.weight }}</p>
      </div>

      <!-- 가입 버튼 -->
      <button 
        type="submit" 
        class="submit-button"
        :disabled="!isFormValid"
      >
        가입
      </button>
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'SignupForm',
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      formData: {
        email: '',
        authNum: '',
        password: '',
        nickname: '',
        gender: '',
        height: '',
        weight: ''
      },
      errors: {
        email: '',
        authNum: '',
        password: '',
        nickname: '',
        gender: '',
        height: '',
        weight: ''
      },
      isEmailSent: false,
      isEmailVerified: false,
      verificationTimer: null,
      remainingTime: 300,
      isLoading: false,
      timerStopped: false
    }
  },
  computed: {
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(this.formData.email)
    },
    isFormValid() {
      return (
        this.isEmailVerified &&
        this.formData.password &&
        this.formData.nickname &&
        this.formData.gender &&
        !Object.values(this.errors).some(error => error)
      )
    }
  },
  methods: {
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    },
    startTimer() {
      if (this.verificationTimer) {
        clearInterval(this.verificationTimer)
      }
      this.remainingTime = 300
      this.timerStopped = false
      
      this.verificationTimer = setInterval(() => {
        if (this.timerStopped) {
          clearInterval(this.verificationTimer)
          this.verificationTimer = null
          return
        }

        if (this.remainingTime > 0) {
          this.remainingTime--
        } else {
          clearInterval(this.verificationTimer)
          this.verificationTimer = null
          if (!this.isEmailVerified) {
            this.isEmailSent = false
            this.formData.authNum = ''
            alert('인증 시간이 만료되었습니다. 다시 시도해주세요.')
          }
        }
      }, 1000)
    },
    async verifyEmail() {
      if (!this.validateEmail()) return
      
      this.isLoading = true
      try {
        const response = await fetch('http://localhost:8000/user-service/mails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: this.formData.email })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || '이메일 전송에 실패했습니다.')
        }

        this.isEmailSent = true
        this.startTimer()
      } catch (error) {
        console.error('이메일 전송 실패:', error)
        alert(error.message || '이메일 전송에 실패했습니다. 다시 시도해주세요.')
      } finally {
        this.isLoading = false
      }
    },
    async verifyCode() {
      if (!this.formData.authNum) {
        this.errors.authNum = '인증번호를 입력해주세요'
        return false
      }
      
      try {
        const response = await fetch('http://localhost:8000/user-service/mails/verification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.formData.email,
            authNum: parseInt(this.formData.authNum)
          })
        })

        const responseText = await response.text()
        
        if (response.ok && responseText.includes('인증 성공')) {
          this.isEmailVerified = true
          this.timerStopped = true
          clearInterval(this.verificationTimer)
          this.verificationTimer = null
          this.errors.authNum = ''
          return true
        } else {
          throw new Error('인증번호가 일치하지 않습니다.')
        }
      } catch (error) {
        console.error('인증 실패:', error)
        this.errors.authNum = '인증번호가 일치하지 않습니다.'
        return false
      }
    },
    validateEmail() {
      if (!this.formData.email) {
        this.errors.email = '이메일을 입력해주세요'
        return false
      }
      if (!this.isEmailValid) {
        this.errors.email = '유효한 이메일 주소를 입력해주세요'
        return false
      }
      this.errors.email = ''
      return true
    },
    validatePassword() {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      if (!this.formData.password) {
        this.errors.password = '비밀번호를 입력해주세요'
        return false
      }
      if (!passwordRegex.test(this.formData.password)) {
        this.errors.password = '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상으로 입력해주세요'
        return false
      }
      this.errors.password = ''
      return true
    },
    validateNickname() {
      const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,8}$/
      if (!this.formData.nickname) {
        this.errors.nickname = '닉네임을 입력해주세요'
        return false
      }
      if (!nicknameRegex.test(this.formData.nickname)) {
        this.errors.nickname = '닉네임은 특수문자를 제외한 8자 이하로 입력해주세요'
        return false
      }
      this.errors.nickname = ''
      return true
    },
    validateHeight() {
      if (!this.formData.height) return true
      const height = Number(this.formData.height)
      if (isNaN(height) || height < 100 || height > 250) {
        this.errors.height = '유효한 키를 입력해주세요'
        return false
      }
      this.errors.height = ''
      return true
    },
    validateWeight() {
      if (!this.formData.weight) return true
      const weight = Number(this.formData.weight)
      if (isNaN(weight) || weight < 30 || weight > 200) {
        this.errors.weight = '유효한 몸무게를 입력해주세요'
        return false
      }
      this.errors.weight = ''
      return true
    },
    selectGender(gender) {
      this.formData.gender = gender
      this.errors.gender = ''
    },
    async handleSubmit() {
      // Validate all fields
      const isValid = 
        this.validateEmail() &&
        this.validatePassword() &&
        this.validateNickname() &&
        this.validateHeight() &&
        this.validateWeight()

      if (!isValid) {
        return
      }

      try {
        // API 연동 시 사용할 코드
        // const response = await axios.post('/api/signup', this.formData)

        // 임시로 성공 처리
        console.log('회원가입 성공')
        alert('회원가입이 완료되었습니다.')
        
        // 로그인 페이지로 이동
        this.router.push('/login')
      } catch (error) {
        console.error('회원가입 실패:', error)
        alert('회원가입에 실패했습니다. 다시 시도해주세요.')
      }
    }
  }
}
</script>

<style scoped>
.signup-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.signup-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.85rem;
  color: #333;
}

.input-with-button {
  display: flex;
  gap: 0.5rem;
}

.input-with-button input {
  flex: 1;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

input.error {
  border-color: #ff4444;
}

input:focus {
  outline: none;
  border-color: #000;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.button-timer-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 160px;
  justify-content: flex-end;
}

.verify-button {
  padding: 0.75rem 1.5rem;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  min-width: 100px;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.verify-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.verify-button:hover:not(:disabled) {
  background-color: #333;
}

.timer {
  color: #ff4444;
  font-weight: bold;
  min-width: 3rem;
  text-align: center;
  visibility: hidden;
}

.timer:not(:empty) {
  visibility: visible;
}

.gender-buttons {
  display: flex;
  gap: 0.5rem;
}

.gender-button {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.gender-button:hover {
  background-color: #f5f5f5;
}

.gender-button.active {
  background-color: #000;
  color: #fff;
  border-color: #000;
}

.error-message {
  font-size: 0.75rem;
  color: #ff4444;
  margin-top: 0.25rem;
}

.success-message {
  font-size: 0.75rem;
  color: #4CAF50;
  margin-top: 0.25rem;
}

.submit-button {
  width: 100%;
  padding: 0.875rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: all 0.2s ease;
}

.submit-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
  background-color: #333;
}

/* 숫자 입력 필드의 화살표 제거 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style> 