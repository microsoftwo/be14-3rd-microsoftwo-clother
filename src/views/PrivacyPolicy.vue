<template>
  <div class="privacy-policy">
    <div class="policy-container">
      <h1 class="policy-title">개인정보처리방침</h1>
      <p class="policy-subtitle">clother에 제공해 주신 소중한 정보는 안전하고 엄격하게 관리됩니다.</p>

      <div class="policy-content">
        <p class="policy-intro">
          (주)clother(이하 "clother"은 이용자의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고 이용자의 개인정보를 보호하며 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
        </p>

        <section class="policy-section">
          <h2>제1조 (개인정보의 수집,이용,제공에 대한 동의절차)</h2>
          <ol>
            <li>회원가입 등을 통한 개인정보의 수집, 이용, 제공과 관련해 귀하는 동의하신 내용을 언제든지 철회 하실 수 있습니다.</li>
            <li>동의철회는 홈페이지 프로필 버튼을 누른 후 마이페이지의 "회원탈퇴"를 클릭하면 개인정보보호 수집, 이용,제공에 대한 동의를 바로 철회할 수 있으며, 개인정보보호책임자에게 서면, 전화, 이메일 등으로 연락하시면 clother는 즉시 회원 탈퇴를 위해 필요한 조치를 취합니다. 동의를 철회하고자 개인정보보호 파기하는 등의 조치가 있더라도 그 사실을 귀하에게 통지하도록 하겠습니다.</li>
            <li>clother는 개인정보의 수집에 대한 동의철회(회원탈퇴)를 개인정보를 수집하는 방법보다 쉽게 할 수 있도록 필요한 조치를 취합니다.</li>
            <li>SNS 계정을 통해 인증(로그인)한 이용자는 회원정보 수정에서 SNS계정 연동해제를 할 수 있습니다. 또한 각 SNS 제공업체에서 SNS연동해제를 할 수 있습니다. 그러나 SNS 연동해제를 하더라도 이용했던 보관중인 이용자 정보가 삭제되는 것은 아니므로 회원탈퇴를 진행하시어 개인정보보호 파기합니다.</li>
          </ol>
        </section>

        <section class="policy-section">
          <h2>제2조 (개인정보 수집에 대한 동의)</h2>
          <p>
            clother는 이용자가 개인정보처리방침 또는 이용약관의 내용에 동의하여다 주는 것으로 동의하지 않는다 버튼을 클릭할 수 있는 절차를 마련하고 있으며, 동의하다 버튼을 클릭하면 개인정보 수집에 동의하는 것으로 봅니다.
          </p>
        </section>

        <section class="policy-section">
          <h2>제3조 (개인정보의 처리 목적)</h2>
          <ol>
            <li>clother는 다음의 목적을 위하여 개인정보를 처리합니다.</li>
            <li>개인정보 활용 업무개인정보 처리 목적일반 및 관리
              <ul>
                <li>회원제 서비스 이용에 따른 이용자 식별</li>
                <li>가입의사 확인, 가입 및 가입횟수 제한</li>
                <li>이용자 상담, 이용자 불만 접수 및 처리, 분쟁조정을 위한 기록보존</li>
                <li>부정한 이용 또는 이용약관에 반하는 비인가 사용방지</li>
                <li>고지사항 전달</li>
              </ul>
            </li>
            <li>처리하고 있는 개인정보는(제3조 1항) 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</li>
            <li>clother는 만 14세 미만 아동에 대하여 개인정보를 처리 하지 않습니다.</li>
          </ol>
        </section>

        <section class="policy-section">
          <h2>제4조 (개인정보의 처리 및 보유 기간)</h2>
          <ol>
            <li>이용자는 법령에 따른 개인정보 보유·이용기간 또는 이용자로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</li>
            <li>전자상거래 등에서의 소비자 보호에 관한 법률에 따른 표시·광고, 계약내용 및 이행 등 거래에 관한 기록
              <ul>
                <li>표시·광고: 6개월</li>
                <li>계약 또는 청약철회, 대금결제, 재화 등의 공급 기록: 5년</li>
                <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년</li>
              </ul>
            </li>
          </ol>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  mounted() {
    document.title = '개인정보처리방침 - Clother'
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: black;
  color: white;
}
</style>

<style scoped>
.privacy-policy {
  min-height: 100vh;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  padding-top: 80px;
}

.policy-container {
  max-width: 900px;
  margin: 0 auto;
  background-color: #ffffffe6;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.policy-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #000000;
}

.policy-subtitle {
  text-align: center;
  color: #9f9e9e;
  margin-bottom: 40px;
  font-size: 14px;
}

.policy-content {
  line-height: 1.6;
}

.policy-intro {
  margin-bottom: 30px;
  color: #000000;
  font-size: 14px;
}

.policy-section {
  margin-bottom: 40px;
}

.policy-section h2 {
  color: #000000;
  font-size: 18px;
  margin-bottom: 20px;
}

.policy-section p {
  color: #000000;
  font-size: 14px;
  margin-bottom: 15px;
}

.policy-section ol {
  padding-left: 20px;
  margin-bottom: 15px;
  list-style-type: decimal;
}

.policy-section ul {
  padding-left: 20px;
  margin: 10px 0;
  list-style-type: disc;
}

.policy-section li {
  color: #000000;
  font-size: 14px;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .privacy-policy {
    padding: 40px 10px;
  }

  .policy-container {
    padding: 20px;
  }

  .policy-title {
    font-size: 20px;
  }

  .policy-section h2 {
    font-size: 16px;
  }
}
</style>