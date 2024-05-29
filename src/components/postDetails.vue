<template>
  <div class="main-container">
    <!-- Post Details -->
    <div class="post-details">
      <h2 class="post-title">{{ post.title }}</h2>
      <p class="post-author">{{ post.author }}</p>
      <div class="post-content">{{ post.content }}</div>
      <div class="post-images">
        <div v-for="(image, index) in post.images" :key="index" class="post-image" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
      </div>
    </div>

    <!-- Comments Section -->
    <div class="comments-container">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-text">{{ comment.text }}</div>
        <button class="comment-action">Hug</button>
      </div>
    </div>

    <!-- Comment Input -->
    <input v-model="newComment" class="input-comment" placeholder="댓글을 입력하세요" />

    <!-- Footer Bar with Button -->
    <div class="footer-bar">
      <button class="comment-submit" @click="addComment">댓글달기</button>
    </div>

    <!-- Comment Input -->
    <input v-model="newComment" class="input-comment" placeholder="댓글을 입력하세요" />

    <!-- Footer Bar with Button -->
    <div class="footer-bar">
      <button class="comment-submit" @click="addComment">댓글달기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostDetails',
  props: ['post'],
  data() {
    return {
      comments: [],
      newComment: ''
    }
  },
  methods: {
    addComment() {
      if (this.newComment.trim() !== '') {
        this.comments.push({
          id: Date.now(),
          author: 'Designer', // 여기서 유저의 이름을 추가. 필요에 따라 동적으로 변경 가능.
          text: this.newComment
        });
        this.newComment = '';
      }
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
  background: #F8F8F8;
  border: 1px solid #E1E1E1;
  border-radius: 10px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2E482D;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.menu-button, .search-button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.navbar-title {
  font-size: 24px;
}

.post-details {
  padding: 20px;
  background: #FFFFFF;
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.post-title {
  font-size: 22px;
  margin-bottom: 10px;
}

.post-author {
  color: #888;
  margin-bottom: 20px;
}

.post-content {
  font-size: 16px;
  margin-bottom: 20px;
}

.post-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.post-image {
  width: 100px;
  height: 100px;
  background: #B1B1B1;
  border-radius: 10px;
  margin-bottom: 20px;
  background-size: cover; /* 이미지의 비율을 유지하면서 컨테이너를 덮음 */
  background-position: center; /* 이미지의 중심을 기준으로 배치 */
}

.comments-container {
  flex-grow: 1;
  padding: 10px;
  background: #FFFFFF;
  margin: 0 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #E1E1E1;
}

.comment-text {
  font-size: 14px;
}

.comment-action {
  background: #2E482D;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.input-comment {
  width: calc(100% - 40px);
  margin: 20px;
  padding: 10px;
  border: 1px solid #E1E1E1;
  border-radius: 5px;
}

.footer-bar {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  background: #2E482D;
  border-radius: 0 0 10px 10px;
}

.comment-submit {
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>