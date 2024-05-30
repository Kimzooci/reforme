<template>
  <div class="content">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="logo" />
    </div>
    <form class="input" @submit.prevent="handleSubmit">
      <div class="input-group">
        <input
          type="text"
          v-model="userId"
          class="id underline"
          placeholder="ID"
          required
        />

        <button @click.prevent="checkDuplicate" class="check-duplicate">
          중복 확인
        </button>
      </div>
      <input
        type="password"
        v-model="password"
        class="password underline"
        placeholder="Password"
        required
      />
      <input
        type="text"
        v-model="nickname"
        class="nickname underline"
        placeholder="Nickname"
        required
      />
      <div class="submit">
        <button :disabled="!isDuplicateChecked" type="submit" class="active">
          제출
        </button>
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
      nickname: "",
      isDuplicateChecked: false, // ID 중복 검사 확인 파트
    };
  },
  methods: {
    handleSubmit() {
      if (!this.isDuplicateChecked) {
        alert("ID 중복 확인을 해주세요.");
        return;
      }

      axios
        .post("/signup", {
          userId: this.userId,
          password: this.password,
          nickname: this.nickname,
        })
        .then((response) => {
          if (response.data.statusCode === 200) {
            alert("회원가입 완료");
          } else {
            alert("회원가입 실패: " + response.data.statusCode);
          }
        })
        .catch((error) => {
          alert("회원가입 실패: " + error.message);
        });
    },
    checkDuplicate() {
      axios
        .post("/signup/check", {
          userId: this.userId,
        })
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.isDuplicateChecked = true;
            alert("사용 가능한 ID입니다.");
          } else {
            this.isDuplicateChecked = false;
            alert("중복된 ID입니다: " + response.data.statusCode);
          }
        })
        .catch((error) => {
          this.isDuplicateChecked = false;
          alert("중복 확인 실패: " + error.message);
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
  justify-content: center;
  align-items: center;
  background: white;
  position: relative;
  border: 2px solid black;
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
  text-align: center;
}

.logo {
  width: 430px;
  height: 430px;
  position: absolute;
  overflow: hidden;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: -100px;
  left: 0;
}

.input {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 450px;
  left: 0px;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0px;
  position: relative;
}

input {
  width: calc(100% - 10px);
  height: 40px;
  font-size: 30px;
  margin-bottom: 10px;
}

input.underline {
  border: none;
  border-bottom: 1px solid black;
}

input.underline:focus {
  outline: none;
}

.check-duplicate {
  border: none;
  width: 80px;
  height: auto;
  font-size: 90%;
  cursor: pointer;
  position: absolute;
  top: 0px;
  left: 340px;
  color: blue;
  text-decoration: underline;
}

.submit {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 0px;
  left: 0px;
}

button {
  border: none;
  background: transparent;
  padding: 0;
  margin: 10px;
  cursor: pointer;
}

button.active {
  background-color: rgba(46, 72, 45, 1);
  width: 410px;
  height: 76px;
  color: white;
  font-size: 200%;
  border-radius: 10px;
}

button:disabled {
  background-color: grey;
  cursor: not-allowed;
}
</style>
