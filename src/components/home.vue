<template>
  <div class="content">
    <div class="inner-content">
      <p>기초 캡스톤 디자인 프로젝트</p>
      <p>리포미</p>

      <div class="link">
        <router-link to="/signup">회원가입</router-link>
        <router-link to="/signin">로그인</router-link>
        <router-link to="/chatbot">챗봇</router-link>
        <router-link to="/reforme">리포미</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.content {
  font-family: "Nanum Gothic", sans-serif;
  text-align: center;
  margin-top: 50px;
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
