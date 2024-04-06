<template>
  <div class="main-container">
    <!-- 상단 앱바 -->
    <div class="header-bar">
      <div class="logo">Reforme</div>
      <div class="search-icon"></div>
    </div>

    <!-- 게시글 목록 -->
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post-item">
        <div class="post-image"></div>
        <div class="post-info">
          <h3>{{ post.title }}</h3>
          <p>{{ post.timestamp }}</p>
          <span>{{ post.comments }} comments</span>
        </div>
      </div>
    </div>

    <!-- 하단 앱바 -->
    <div class="footer-bar">
      <div>리포미</div>
      <div>리포유</div>
    </div>

    <!-- 액션 버튼 -->
    <div class="action-buttons">
      <button class="create-button">+</button>
      <button class="chat-button">🗨️</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      posts: [
        { id: 1, title: '제목 상의', timestamp: '08/23/16:49', comments: 0 },
        { id: 2, title: '제목 하의', timestamp: '08/23/16:49', comments: 0 },
        // more posts
      ]
    }
  }
}
</script>

<style scoped>
.main-container {
  position: absolute;
  width: 430px;
  height: 932px;
  background: #FFFFFF;
}

.header-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 10px;
  position: absolute;
  width: 430px;
  height: 89px;
  background: #2E482D;
}
.logo {
  flex: 1;
  color: white;
  font-size: 24px;
}
.search-icon {
 
  width: 30px;
  height: 30px;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 87px;
  width: 430px;
  height: 720px;
}
.post-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.post-image {
  background: #B1B1B1;
  width: 75px;
  height: 75px;
  border-radius: 10px;
}
.post-info {
  display: flex;
  flex-direction: column;
}

.footer-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 21px;
  position: absolute;
  width: 430px;
  height: 85px;
  top: 847px;
  background: #2E482D;
}

.action-buttons {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  position:absolute;
  left: 350px;
  top: 689px;
}
.create-button, .chat-button {
  width: 70px;
  height: 70px;
  background: #2E482D;
  border-radius: 50%;
  color: white;
  font-size: 36px;
  border: none;
}
</style>
