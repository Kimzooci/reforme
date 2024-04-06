<template>
      <button class="reforU-button">
      리포미
    </button>
</template>

<script>
export default {
    name: 'ReforUbutton',
}
</script>

<style>
    .reforU-button {
    padding: 4px 21px;
    background-color: #4A7648; /* 연한색하고 싶으면 #4A7648* #2E482D */
    color: white;
    border: none;
    font-size: 16px; /* 필요에 따라 크기를 조절하세요 */
    cursor: pointer;
    outline: none;
    /* 폰트 가족과 다른 스타일을 원하는 대로 조정하세요 */
  }
  
  /* 호버 효과 등 추가 스타일을 여기에 작성하세요 */
  .reforU-button:hover {
    /* 호버 스타일 예시 */
    background-color: #1e3720;
  }
</style>