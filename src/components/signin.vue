<template>
  <div class="content">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="logo" />
    </div>
    <form class="input" @submit.prevent="signinSubmit">
      <input
        type="text"
        v-model="userId"
        class="id underline"
        placeholder="ID"
        required
      />
      <input
        type="password"
        v-model="password"
        class="password underline"
        placeholder="Password"
        required
      />
      <div class="submit">
        <button type="submit" class="active">제출</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userId: "",
      password: "",
    };
  },
  methods: {
    signinSubmit() {
      axios
        .post("/signin", {
          userId: this.userId,
          password: this.password,
        })
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.$cookies.set("session_id", response.data.sessionId, {
              expires: "1d",
            });
            alert("로그인 성공");
          } else {
            alert("로그인 실패: " + response.data.statusCode);
          }
        })
        .catch((error) => {
          alert("로그인 실패: " + error.message);
        });
    },
  },
};
</script>

<style>
.content {
  width: 430px;
  height: 932px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  position: relative;
  border: none;
  padding: 0; /* 여백 제거 */
}

.navigator {
  background-color: rgba(46, 72, 45, 1);
  width: 430px;
  height: 89px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.navigator p {
  color: white;
  font-size: 30px;
  position: relative;
}

.logo {
  width: 430px;
  height: 430px;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
}

.input {
  position: absolute;
  top: 450px;
  left: 0px;
}
input {
  width: 420px;
  height: 40px;
  margin-bottom: 20px;
  font-size: 30px;
}

input.underline {
  border: none;
  border-bottom: 1px solid black;
}

input.underline:focus {
  outline: none;
  border-bottom-color: #286090;
}

.submit {
  position: absolute;
  top: 300px;
  left: 0;
  right: 0;
  text-align: center;
}

button {
  border: none;
  background: transparent;
  padding: 0;
  margin: 10px;
  cursor: pointer;
}

.active {
  background-color: rgba(46, 72, 45, 1);
  width: 410px;
  height: 76px;
  color: white;
  font-size: 200%;
  border-radius: 10px;
}

@media (max-width: 480px) {
  .content,
  .navigator,
  .logo,
  input {
    width: 100%;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
