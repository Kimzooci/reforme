<template>
    <div class="main-container">
      <!-- Navigation Bar -->
      <div class="navbar" style="background: #2E482D; padding: 9px 10px;">
        <button class="menu-button">＜</button>
        <span class="navbar-title">Reforme</span>
        <button class="search-button"></button>
      </div>
  
      <!-- Post Details -->
      <div class="post-details">
        <h2 class="post-title">게시글 제목</h2>
        <p class="post-author">작성자 닉네임</p>
        <hr>
        <p class="post-content">이 옷을 리폼하고 싶어요 깔끔한 디자이너분 구합니다!</p>
        <div class="post-image"></div>
      </div>
  
      <!-- Comments Section -->
      <div class="comments-container">
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <div class="comment-text">{{ comment.text }}</div>
          <button class="comment-action">Hug</button>
        </div>
      </div>
  
      <!-- Comment Input -->
      <input v-model="newComment" class="input-comment" placeholder="댓글을 입력하세요">
  
      <!-- Footer Bar with Button -->
      <div class="footer-bar">
        <button class="comment-submit">댓글달기</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        comments: [
          { id: 1, text: "댓글 내용입니다" },
          { id: 2, text: "다음 댓글 내용입니다" }
        ],
        newComment: ''
      }
    }
  }
  </script>
  
  <style scoped>
  .main-container {
    width: 430px;
    height: 932px;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
  }
  
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
    font-size: 24px;
    cursor: pointer;
  }
  
  .navbar-title {
    font-size: 24px;
  }
  
  .post-details, .comments-container {
    padding: 10px;
  }
  
  .post-image {
    width: 410px;
    height: 410px;
    background: #B1B1B1;
    border-radius: 10px;
    margin-top: 10px;
  }
  
  .comments-container {
    overflow-y: auto;
    flex-grow: 1;
  }
  
  .comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  
  .input-comment {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  
  .footer-bar {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
  
  .comment-submit {
    padding: 10px 20px;
    background-color: #2E482D;
    color: white;
    border: none;
    border-radius: 10px;
  }
  </style>
  