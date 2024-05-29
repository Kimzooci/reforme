<template>
  <div class="navbox">
    <nav class="navbar">
      <div v-if="!isBackButton">
        <button  class="menu-button" @click="toggleMenu">≡</button>
      </div>
      <div v-if="isBackButton">
        <button  class="back-button" @click="$emit('back')">＜</button>
      </div>
      <span class="navbar-title">Reforme</span>
      <button class="search-button" @click="toggleSearch">🔍</button>
    </nav>
    <!-- 메뉴가 열리면 보여질 컴포넌트 -->
    <div v-if="showMenu" class="menu-overlay" @click="toggleMenu">
      <div class="menu-container" @click.stop>
        <!-- 닉네임과 항목들을 표시할 내용 -->
        <div class="menu-content">
          <div class="menu-item">닉네임</div>
          <div class="menu-item">
            <h5>로그아웃</h5>
          </div>
          <div class="menu-item">전체</div>
          <div class="menu-item">의류</div>
          <div class="menu-item">가방</div>
          <div class="menu-item">신발</div>
          <div class="menu-item">기타</div>
        </div>
      </div>
    </div>

    <!-- 검색창이 열리면 보여질 컴포넌트 -->
    <div v-if="showSearch" class="search-overlay" @click="toggleSearch">
      <div class="search-container" @click.stop>
        <!-- 검색 입력창과 버튼들 -->
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
export default {
  name: "navigator",
  props: {
    isBackButton: Boolean,
  },
  data() {
    return {
      showMenu: false,
      showSearch: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
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
}

.menu-button,
.search-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.back-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.navbar-title {
  font-size: 24px;
  font-family: "YourFontFamily";
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
  display: flex;
  flex-direction: column;
}

.menu-item {
  margin-bottom: 10px;
  cursor: pointer;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.search-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 430px;
  background: white;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 3;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-divider {
  width: 100%;
  height: 1px;
  background: #ccc;
  margin-bottom: 10px;
}

.search-buttons {
  display: flex;
  justify-content: space-between;
}

.small_cancel,
.small_complete {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.small_cancel {
  background: red;
  color: white;
}

.small_complete {
  background: green;
  color: white;
}

.search-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 430px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
</style>
