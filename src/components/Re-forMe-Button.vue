<template>
    <button class="reforme-button">
      리포유
    </button>
  </template>
  
  <script>
  export default {
    name: 'ReformeButton',
    // 프롭스, 데이터, 메소드 등을 여기에 추가할 수 있습니다.
  };
  </script>
  
  <style scoped>
  .reforme-button {
    padding: 4px 21px;
    background-color: #2E482D; /* 연한색하고 싶으면 #4A7648*/
    color: white;
    border: none;
    font-size: 16px; /* 필요에 따라 크기를 조절하세요 */
    cursor: pointer;
    outline: none;
    /* 폰트 가족과 다른 스타일을 원하는 대로 조정하세요 */
  }
  
  /* 호버 효과 등 추가 스타일을 여기에 작성하세요 */
  .reforme-button:hover {
    /* 호버 스타일 예시 */
    background-color: #1e3720;
  }
  </style>
  