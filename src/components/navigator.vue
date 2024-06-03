<template>
  <div class="navbox">
    <nav class="navbar">
      <button v-if="menu" class="menu-button" @click="toggleMenu">≡</button>
      <button v-if="back" class="back-button" @click="backFunction">＜</button>
      <span class="navbar-title">Reforme</span>
      <button v-if="search" class="search-button" @click="toggleSearch">🔍</button>
    </nav>
    <div v-if="showMenu" class="menu-overlay" @click="toggleMenu">
      <div class="menu-container" @click.stop>
        <div class="menu-content">
          <div class="menu-item">{{ userId }}</div>
          <div class="menu-item" @click="logout">로그아웃</div>
          <div class="menu-item" @click="filterByCategory('TOP')">상의</div>
          <div class="menu-item" @click="filterByCategory('OUTER')">외투</div>
          <div class="menu-item" @click="filterByCategory('BOTTOM')">하의</div>
          <div class="menu-item" @click="filterByCategory('BAG')">가방</div>
          <div class="menu-item" @click="filterByCategory('ETC')">기타</div>
        </div>
      </div>
    </div>
    <div v-if="showSearch" class="search-overlay" @click="toggleSearch">
      <div class="search-container" @click.stop>
        <input
          type="text"
          class="search-input"
          placeholder="검색어를 입력하세요"
        />
        <div class="search-divider"></div>
        <div class="search-buttons">
          <button class="small_cancel" @click="toggleSearch">취소</button>
          <button class="small_complete">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import emitter from "../store/eventBus";

export default {
  name: "NavigationBar",
  props: {
    backButton: Boolean,
    menuButton: Boolean,
    searchButton: Boolean,
  },
  data() {
    return {
      userId: null,
      showMenu: false,
      showSearch: false,
      back: this.backButton,
      menu: this.menuButton,
      search: this.searchButton,
    };
  },
  watch: {
    backButton(newVal) {
      this.back = newVal;
    },
    menuButton(newVal) {
      this.menu = newVal;
    },
    searchButton(newVal) {
      this.search = newVal;
    },
  },
  created() {
    this.emitter.on("updateButtons", (data) => {
      this.menu = data.menuButton;
      this.search = data.searchButton;
      this.back = data.backButton;
    });

    axios
      .get("/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.statusCode === 200) {
          this.userId = response.data.data.userId;
        }
      })
      .catch((error) => {
        this.$router.push("/error_page");
        console.log(error.message);
      });
  },
  beforeUnmount() {
    this.emitter.off("updateButtons");
  },
  methods: {
    backFunction() {
      this.$router.push("/reforme_page");
      this.emitter.emit("backfunction", 0);
      this.emitter.emit("updateButtons", {
        menuButton: true,
        searchButton: true,
        backButton: false,
      });
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
    logout() {
      const formData = new FormData();
      axios
        .post(
          "/signout",
          formData,
          {
            header: {
              "Content-Type": "multipart/form-data",
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.statusCode === 200) {
            alert("로그아웃 성공");
            this.$router.push("/");
          } else {
            alert("로그아웃 실패");
          }
        })
        .catch((error) => {
          alert("로그아웃 실패: " + error.message);
        });
    },
    filterByCategory(category) {
      emitter.emit('filterByCategory', category);
    }
  },
};
</script>

<style scoped>
.navbox {
  border: 2px solid black;
}
.navbar {
  background: #2e482d;
  padding: 9px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: relative;
  z-index: 2;
  height: 50px;
}

.menu-button,
.search-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.navbar-title {
  font-size: 24px;
  font-family: "YourFontFamily";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background: white;
  color: black;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 3;
  overflow-y: auto;
}

.menu-item {
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
}

.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-container {
  width: 300px;
  background: rgba(74, 118, 72, 1);
  color: black;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  z-index: 3;
}

.search-input {
  width: 100%;
  padding: 10px;
  background: rgba(74, 118, 72, 1);
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  color: white;
  border-radius: 10px;
}

.search-buttons {
  display: flex;
  justify-content: space-between;
}
.back-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.small_complete,
.small_cancel {
  background-color: rgba(46, 72, 45, 1);
  width: 48%;
  height: 40px;
  color: white;
  font-size: 150%;
  border-radius: 10px;
  border: none;
  margin: 0;
}

.menu-item:hover {
  font-weight: bold;
}
</style>
