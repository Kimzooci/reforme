<template>
  <div id="app-container">
    <div id="app">
      <navigator :backButton="backButton" :searchButton="searchButton" :menuButton="menuButton"></navigator>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navigator from "./components/navigator.vue";

export default {
  name: "App",
  data(){
    return {
      menuButton: false,
      backButton: false,
      searchButton: false,
    }
  },
  components: {
    navigator,
  },
  created() {
      this.emitter.on('updateButtons', (data) => {
      this.menuButton = data.menuButton;
      this.searchButton = data.searchButton;
      this.backButton = data.backButton;
    });
    // 특정 경로에 대해 searchButton과 menuButton을 true로 변경
    console.log(this.$route.path);
    console.log("App")
    const currentPath = this.$route.path;
    if (currentPath === '/reforyou' || currentPath === '/reforme') {
      this.menuButton = true;
      this.searchButton = true;
      this.backButton = false;
      
    } else {
      this.backButton = false;
      this.menuButton = false;
      this.searchButton = false;
    }
  }
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
