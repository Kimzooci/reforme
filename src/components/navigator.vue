<template>
    <nav class="navbar" style="background: #2E482D; padding: 9px 10px;">
      <button class="menu-button">
        <!-- 여기에 SVG나 아이콘 라이브러리를 사용해 햄버거 아이콘을 넣을 수 있습니다 -->
        ≡
      </button>
      <span class="navbar-title">Reforme</span>
      <button class="search-button">
        <!-- 여기에 SVG나 아이콘 라이브러리를 사용해 검색 아이콘을 넣을 수 있습니다 -->
        🔍
      </button>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavigationBar',
    // 여기에 Vue 데이터, 계산된 속성, 메소드 등을 추가할 수 있습니다.
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
  }
  
  .menu-button, .search-button {
    background: none;
    border: none;
    color: white;
    font-size: 24px; /* 필요에 따라 크기 조절 */
    cursor: pointer;
  }
  
  .navbar-title {
    font-size: 24px; /* 필요에 따라 크기 조절 */
    font-family: 'YourFontFamily'; /* 실제 사용하는 폰트 패밀리로 교체하세요 */
  }
  
  /* 반응형 디자인이나 필요한 다른 스타일을 추가하세요 */
  </style>
  