<template>
  <div>
    <nav class="navbar" style="background: #2E482D; padding: 9px 10px;">
      <button class="menu-button" @click="toggleMenu">
        <!-- 여기에 SVG나 아이콘 라이브러리를 사용해 햄버거 아이콘을 넣을 수 있습니다 -->
        ≡
      </button>
      <span class="navbar-title">Reforme</span>
      <button class="search-button" @click="toggleSearch">
        <!-- 여기에 SVG나 아이콘 라이브러리를 사용해 검색 아이콘을 넣을 수 있습니다 -->
        🔍
      </button>
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
          <div class="menu-item">상의</div>
          
          <div class="menu-item">외투</div>

          <div class="menu-item">하의</div>

          <div class="menu-item">가방</div>
          
          <div class="menu-item">기타</div>
        </div>
      </div>
    </div>
    
    <!-- 검색창이 열리면 보여질 컴포넌트 -->
    <div v-if="showSearch" class="search-overlay" @click="toggleSearch">
      <div class="search-container" @click.stop>
        <!-- 검색 입력창과 버튼들 -->
        <input type="text" class="search-input" placeholder="검색어를 입력하세요" />
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
  name: 'NavigationBar',
  data() {
    return {
      showMenu: false, // 메뉴의 표시 여부를 저장할 데이터
      showSearch: false // 검색창 표시 여부를 저장할 데이터
    };
  },
  methods: {
    // 메뉴 버튼 클릭 시 메뉴를 토글하는 메소드
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
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
  font-family: 'YourFontFamily';
}

/* 메뉴 컨테이너 스타일 */
.menu-container {
  position: absolute;
  top: 89px; /* 메뉴를 내비게이션 바 아래로 위치시킴 */
  left: 0;
  width: 200px;
  height: 845px; /* 메뉴의 높이를 845px로 설정 */
  background: white; /* 배경을 하얀색으로 설정 */
  color: black; /* 텍스트 색상을 검정색으로 설정 */
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2); /* 컨테이너에 반투명 선을 추가 */
  z-index: 1; /* 메뉴가 다른 요소 위에 표시되도록 z-index 설정 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 추가 */
}

/* 메뉴 항목 스타일 */
.menu-item {
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2); /* 메뉴 항목에 하단 반투명 선을 추가 */
}

/* 메뉴 오버레이 스타일 */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 검정 배경의 투명도 조절 */
  z-index: 0; /* 메뉴 컨테이너 아래에 표시되도록 z-index 설정 */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 메뉴를 상단에 정렬 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 추가 */
  position: fixed; /* 스크롤 막기 */
}

body.menu-open {
  overflow: hidden; /* 메뉴가 열렸을 때 페이지 스크롤을 막음 */
}

/* 검색 오버레이 스타일 */
.search-overlay {
  position: absolute; /* 변경: position을 absolute로 변경 */
  top: 0; /* 변경: top을 0으로 설정 */
  left: 0; /* 변경: left를 0으로 설정 */
  width: 100%; /* 변경: width를 100%로 설정 */
  height: 100%; /* 변경: height를 100%로 설정 */
  background-color: rgba(0, 0, 0, 0.5); /* 검정 배경의 투명도 조절 */
  z-index: 0; /* 검색 컨테이너 아래에 표시되도록 z-index 설정 */
  display: flex;
  justify-content: center;
  align-items: center; /* 검색창을 중앙에 정렬 */
}

/* 검색 컨테이너 스타일 */
.search-container {
  width: 300px;
  background: rgba(74, 118, 72, 1); /* 배경을 rgba(74, 118, 72, 1) 색으로 설정 */
  color: black; /* 텍스트 색상을 검정색으로 설정 */
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2); /* 컨테이너에 반투명 선을 추가 */
  border-radius: 15px; /* 컨테이너 모서리를 둥글게 설정 */
  z-index: 1; /* 검색창이 다른 요소 위에 표시되도록 z-index 설정 */
}

/* 검색 입력창 스타일 */
.search-input {
  width: 100%;
  padding: 10px;
  background: rgba(74, 118, 72, 1); /* 배경을 rgba(74, 118, 72, 1) 색으로 설정 */
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2); /* 입력창 하단에 반투명 선을 추가 */
  margin-bottom: 10px;
  color: white; /* 입력창 텍스트 색상을 흰색으로 설정 */
  border-radius: 10px; /* 입력창 모서리를 둥글게 설정 */
}

/* 검색 버튼 컨테이너 스타일 */
.search-buttons {
  display: flex;
  justify-content: space-between;
}

/* 검색 버튼 스타일 */
.small_complete,
.small_cancel {
  background-color: rgba(46, 72, 45, 1);
  width: 48%;
  height: 40px;
  color: white;
  font-size: 150%;
  border-radius: 10px;
  border: none;
  margin: 0; /* 버튼 간의 간격을 없앰 */
}
</style>
