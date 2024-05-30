<template>
  <div class="content">
    <div class="logo-container">
      <img src="../assets/images/logo2.png" alt="Reforme 로고" class="logo" />
      <p class="typing-animation">다시, 나를 위해.</p>
    </div>
    <div class="inner-content">
      <p>기초 캡스톤 디자인 프로젝트</p>
      <div class="link">
        <router-link to="/signup_page">회원가입</router-link>
        <router-link to="/signin_page">로그인</router-link>
        <router-link to="/chatbot_page">챗봇</router-link>
        <router-link to="/reforme_page">리포미</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    
    this.emitter.emit('updateButtons', { 
      menuButton: false, 
      searchButton: false, 
      backButton: false 
      
    }); 
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap");

.content {
  font-family: "Nanum Gothic", sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
}

.logo-container {
  position: relative;
  width: 430px;
  height: 430px;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.typing-animation {
  font-family: "Nanum Myeongjo", serif;
  font-size: 24px;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
  animation: typing 4s steps(40, end) 1, blink 0.75s step-end 3,
    removeBlink 1s forwards;
  animation-timing-function: ease;
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  0% {
    border-color: black;
  }
  100% {
    border-color: transparent;
  }
}

@keyframes removeBlink {
  0% {
    border-color: black;
  }
  100% {
    border-color: transparent;
  }
}

.inner-content {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: inline-block;
}

.link {
  margin-top: 20px;
}

.link > * {
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
  text-decoration: none;
  color: #007bff;
}

.link > *:hover {
  text-decoration: underline;
}
</style>
