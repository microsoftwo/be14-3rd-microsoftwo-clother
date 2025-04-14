<template>
    <div class="login-container">
        <div class="form-wrapper">
            <div class="logo">clother</div>

            <div class="form-group">
                <label for="email">이메일</label>
                <input type="email" id="email" v-model="form.email" />
                <div class="error" v-if="errors.email">{{ errors.email }}</div>
            </div>

            <div class="form-group">
                <label for="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    v-model="form.password"
                    @keyup.enter="login"
                />
                <div class="error" v-if="errors.password">
                    {{ errors.password }}
                </div>
            </div>

            <div class="error login-error" v-if="errors.login">
                {{ errors.login }}
            </div>

            <button class="login-btn" @click="login">로그인</button>

            <div class="options">
                <a href="#">비밀번호 찾기</a>
                <a href="#">회원가입</a>
            </div>

            <div class="divider">
                <hr />
                <span>또는</span>
                <hr />
            </div>

            <div class="social-login">
                <img src="/kakao-icon.png" alt="Kakao" class="icon" />
                <img src="/naver-icon.png" alt="Naver" class="icon" />
                <img src="/google-icon.png" alt="Google" class="icon" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 입력 폼 상태
const form = reactive({
    email: "",
    password: "",
});

// 에러 메시지 상태
const errors = reactive({
    email: "",
    password: "",
    login: "",
});

// 로그인 함수
const login = async () => {
    // 에러 초기화
    errors.email = "";
    errors.password = "";
    errors.login = "";

    let valid = true;

    // 유효성 검사
    if (!form.email) {
        errors.email = "이메일을 입력해주세요.";
        valid = false;
    }
    if (!form.password) {
        errors.password = "비밀번호를 입력해주세요.";
        valid = false;
    }

    if (!valid) return;

    try {
        const response = await fetch(
            "http://localhost:8000/user-service/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                }),
            }
        );

        if (response.status === 401) {
            errors.login = "아이디 또는 비밀번호를 확인해주세요.";
            return;
        }

        if (!response.ok) {
            throw new Error("로그인 실패");
        }

        const data = await response.json();

        // 토큰 저장
        localStorage.setItem("accessToken", data.accessToken);

        // 유저 닉네임 저장
        localStorage.setItem("userNickname", data.userNickname);

        // 유저 프로필 이미지 url 저장
        localStorage.setItem("userProfileImageUrl", data.userProfileImageUrl);

        // 성공 시 로직 필요
        router.push("/");
    } catch (error) {
        console.error("에러 발생:", error.message);
        errors.login = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    }
};
</script>

<style scoped>
.login-container {
    background-color: #f7f3f2;
    margin: 100px auto;
    padding: 40px 24px;
    border-radius: 16px;
    font-family: sans-serif;
    text-align: center;
    display: flex;
    justify-content: center;
    min-height: 600px;
    min-width: 600px;
    align-items: center;
}

.form-wrapper {
    width: 100%;
    max-width: 400px; /* ✅ 내부 최대 너비 제한 */
    text-align: center;
}

.logo {
    font-family: "Georgia", serif;
    font-size: 32px;
    margin-bottom: 24px;
    font-weight: bold;
    color: black;
}

.form-group {
    margin-bottom: 16px;
    text-align: left;
}

.form-group label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    color: #333;
}

.form-group input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    background-color: white;
    color: #222;
}

.error {
    color: #d33;
    font-size: 12px;
    margin-top: 4px;
}

.login-error {
    text-align: center;
    margin-bottom: 12px;
}

.login-btn {
    width: 100%;
    padding: 10px;
    background-color: #d5d0cd;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 16px;
}

.options {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    margin-bottom: 20px;
}

.options a {
    text-decoration: none;
    color: #444;
}

.divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    color: #aaa;
    font-size: 13px;
}

.divider hr {
    flex: 1;
    height: 1px;
    background-color: #ccc;
    border: none;
    margin: 0 8px;
}

/* 여기부터 소셜 로그인*/
.social-login {
    display: flex;
    justify-content: space-around;
    gap: 12px;
}

.social-btn {
    flex: 1;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    color: white;
}

.icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 8px;
    vertical-align: middle;
}
</style>
