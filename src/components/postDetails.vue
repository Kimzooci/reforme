<template>
  <div class="main-container">
    <!-- Post Details -->
    <div class="post-details">
      <h2 class="post-title">{{ post.title }}</h2>
      <div class="post-header">
        <p class="post-author">{{ post.author }}</p>
        <div class="post-actions">
          <button class="edit-button">수정</button>
          <button class="delete-button">삭제</button>
        </div>
      </div>
      <hr class="divider" />
      <div class="post-content">{{ post.content }}</div>
      <div class="post-images">
        <div v-for="(image, index) in post.images" :key="index" class="post-image" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
      </div>
    </div>

    <!-- Comments Section -->
    <div class="comments-container">
      <p class="comments-header">댓글 목록</p>
      <hr class="divider" />
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-header">
          <span class="comment-author">{{ comment.author }}</span>
        </div>
        <div class="comment-text">{{ comment.text }}</div>
      </div>
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
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  padding: 10px;
  background: #F8F8F8;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-details {
  width: 100%;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.post-title {
  font-size: 22px;
  margin-bottom: 10px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.post-author {
  color: #888;
}

.post-actions {
  display: flex;
  gap: 10px;
}

.edit-button, .delete-button {
  background: none;
  border: none;
  color: #2E482D;
  cursor: pointer;
}

.divider {
  margin: 10px 0;
  border: none;
  border-top: 1px solid #E1E1E1;
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
  width: calc(33.33% - 10px);
  height: 100px;
  background: #B1B1B1;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
}

.comments-container {
  width: 100%;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.comments-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.comment {
  padding: 10px 0;
  border-bottom: 1px solid #E1E1E1;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.comment-author {
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
}

.comment-text {
  font-size: 14px;
}

.input-comment {
  width: calc(100% - 20px);
  margin: 0 auto 20px;
  padding: 10px;
  border: 1px solid #E1E1E1;
  border-radius: 5px;
}

.footer-bar {
  width: 100%;
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
