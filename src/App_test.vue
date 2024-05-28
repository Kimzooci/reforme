<template>
  <div id="app-container">
    <div id="app">
      <navigator></navigator>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navigator from "./components/navigator.vue";

export default {
  name: "App",
  components: {
    navigator,
  },
};
</script>

<style scoped>
@import "./styles/main.css";

#app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0; /* 원하는 배경색으로 변경 */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 430px;
  height: 932px;
  display: flex;
  flex-direction: column;
  background: white;
  position: relative;
  border: none;
}
</style>
