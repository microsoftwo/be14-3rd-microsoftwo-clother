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
          <button 
            type="button" 
            class="verify-button"
            @click="verifyEmail"
            :disabled="!isEmailValid || isEmailVerified"
          >
            메일 전송
          </button>
        </div>
        <p class="error-message" v-if="errors.email">{{ errors.email }}</p>
        <p class="success-message" v-if="formData.email && !errors.email && isEmailValid">
          인증 코드가 이메일로 발송되었습니다
        </p>
      </div>

      <!-- 인증번호 입력 -->
      <div class="form-group" v-if="isEmailSent">
        <label for="verificationCode">인증번호</label>
        <div class="input-with-button">
          <input 
            type="text" 
            id="verificationCode" 
            v-model="formData.verificationCode"
            :class="{ 'error': errors.verificationCode }"
            placeholder="인증 번호를 입력해 주세요"
          />
          <button 
            type="button" 
            class="verify-button"
            @click="verifyCode"
            :disabled="!formData.verificationCode"
          >
            인증
          </button>
        </div>
        <p class="error-message" v-if="errors.verificationCode">{{ errors.verificationCode }}</p>
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
        />
        <p class="error-message" v-if="errors.password">{{ errors.password }}</p>
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
        <label for="height">키</label>
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
        <label for="weight">몸무게</label>
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
export default {
  name: 'SignupForm',
  data() {
    return {
      formData: {
        email: '',
        verificationCode: '',
        password: '',
        nickname: '',
        gender: '',
        height: '',
        weight: ''
      },
      errors: {
        email: '',
        verificationCode: '',
        password: '',
        nickname: '',
        gender: '',
        height: '',
        weight: ''
      },
      isEmailSent: false,
      isEmailVerified: false,
      verificationTimer: null,
      remainingTime: 300 // 5분
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
        this.formData.height &&
        this.formData.weight &&
        !Object.values(this.errors).some(error => error)
      )
    }
  },
  methods: {
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
      if (!this.formData.height) {
        this.errors.height = '키를 입력해주세요'
        return false
      }
      const height = Number(this.formData.height)
      if (isNaN(height) || height < 100 || height > 250) {
        this.errors.height = '유효한 키를 입력해주세요'
        return false
      }
      this.errors.height = ''
      return true
    },

    validateWeight() {
      if (!this.formData.weight) {
        this.errors.weight = '몸무게를 입력해주세요'
        return false
      }
      const weight = Number(this.formData.weight)
      if (isNaN(weight) || weight < 30 || weight > 200) {
        this.errors.weight = '유효한 몸무게를 입력해주세요'
        return false
      }
      this.errors.weight = ''
      return true
    },

    async verifyEmail() {
      if (!this.validateEmail()) return

      try {
        // API 호출로 변경 예정
        this.isEmailSent = true
        this.startVerificationTimer()
      } catch (error) {
        this.errors.email = '이메일 전송에 실패했습니다'
      }
    },

    startVerificationTimer() {
      this.remainingTime = 300
      if (this.verificationTimer) {
        clearInterval(this.verificationTimer)
      }
      this.verificationTimer = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--
        } else {
          clearInterval(this.verificationTimer)
          this.isEmailSent = false
        }
      }, 1000)
    },

    async verifyCode() {
      if (!this.formData.verificationCode) {
        this.errors.verificationCode = '인증번호를 입력해주세요'
        return
      }

      try {
        // API 호출로 변경 예정
        if (this.formData.verificationCode.length === 6) {
          this.isEmailVerified = true
          this.errors.verificationCode = ''
          clearInterval(this.verificationTimer)
        } else {
          this.errors.verificationCode = '인증번호가 일치하지 않습니다'
        }
      } catch (error) {
        this.errors.verificationCode = '인증에 실패했습니다'
      }
    },

    selectGender(gender) {
      this.formData.gender = gender
      this.errors.gender = ''
    },

    validateForm() {
      let isValid = true

      if (!this.isEmailVerified) {
        this.errors.email = '이메일 인증이 필요합니다'
        isValid = false
      }

      if (!this.validatePassword()) isValid = false
      if (!this.validateNickname()) isValid = false
      
      if (!this.formData.gender) {
        this.errors.gender = '성별을 선택해주세요'
        isValid = false
      }

      if (!this.validateHeight()) isValid = false
      if (!this.validateWeight()) isValid = false

      return isValid
    },

    async handleSubmit() {
      if (!this.validateForm()) return

      try {
        // API 호출로 변경 예정
        console.log('회원가입 성공:', this.formData)
        this.$emit('signup-success')
      } catch (error) {
        console.error('회원가입 실패:', error)
      }
    }
  },
  beforeUnmount() {
    if (this.verificationTimer) {
      clearInterval(this.verificationTimer)
    }
  }
}
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
}

.signup-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: bold;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9rem;
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
  border-radius: 4px;
  font-size: 0.9rem;
}

input.error {
  border-color: #ff4444;
}

input:focus {
  outline: none;
  border-color: #000;
}

.verify-button {
  padding: 0 1rem;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.verify-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.gender-buttons {
  display: flex;
  gap: 0.5rem;
}

.gender-button {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

.gender-button.active {
  background-color: #000;
  color: #fff;
  border-color: #000;
}

.error-message {
  font-size: 0.8rem;
  color: #ff4444;
  margin-top: 0.25rem;
}

.success-message {
  font-size: 0.8rem;
  color: #4CAF50;
  margin-top: 0.25rem;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.submit-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
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