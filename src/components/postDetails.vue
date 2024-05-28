<template>
  <div class="main-container">
    <div class="navbar">
      <button @click="$emit('back')" class="menu-button">＜</button>
      <span class="navbar-title">Reforme</span>
      <button class="search-button">🔍</button>
    </div>

    <div class="post-details">
      <h2 class="post-title">{{ localPost.title }}</h2>
      <p class="post-author">작성자 닉네임</p>
      <div class="post-actions">
        <button class="edit-button" @click="showEditConfirmation = true">수정</button>
        <button class="delete-button" @click="showDeleteConfirmation = true">삭제</button>
      </div>
      <p class="post-content">{{ localPost.content }}</p>
      <div v-if="localPost.images && localPost.images.length" class="post-images">
        <div v-for="(image, index) in localPost.images" :key="index" class="post-image" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
      </div>
    </div>

    <div class="comments-container">
      <div v-for="comment in localPost.comments" :key="comment.id" class="comment">
        <div class="comment-text">{{ comment.text }}</div>
        <button class="comment-action">Hug</button>
      </div>
    </div>

    <input v-model="newComment" class="input-comment" placeholder="댓글을 입력하세요" />

    <div class="footer-bar">
      <button class="comment-submit" @click="addComment">댓글달기</button>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div v-if="showDeleteConfirmation" class="confirmation-dialog">
      <p>게시글을 삭제하시겠습니까?</p>
      <div class="confirmation-buttons">
        <button @click="showDeleteConfirmation = false">취소</button>
        <button @click="confirmDeletePost">확인</button>
      </div>
    </div>

    <!-- Edit Confirmation Dialog -->
    <div v-if="showEditConfirmation" class="confirmation-dialog">
      <p>게시글을 수정하시겠습니까?</p>
      <div class="confirmation-buttons">
        <button @click="showEditConfirmation = false">취소</button>
        <button @click="confirmEditPost">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostDetails',
  props: ['post'],
  data() {
    return {
      localPost: JSON.parse(JSON.stringify(this.post)), // prop을 복사하여 로컬 데이터로 사용
      newComment: '',
      showDeleteConfirmation: false,
      showEditConfirmation: false,
    }
  },
  methods: {
    confirmDeletePost() {
      this.$emit('delete-post', this.localPost.id);
      this.showDeleteConfirmation = false;
    },
    confirmEditPost() {
      const updatedPost = {
        ...this.localPost,
        title: prompt("제목을 수정하세요", this.localPost.title),
        content: prompt("내용을 수정하세요", this.localPost.content),
      };
      this.$emit('edit-post', updatedPost);
      this.showEditConfirmation = false;
    },
    addComment() {
      if (this.newComment.trim()) {
        this.localPost.comments.push({ id: Date.now(), text: this.newComment });
        this.newComment = ''; // Clear the input after adding the comment
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

.post-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 10px;
}

.edit-button, .delete-button {
  background: none;
  border: none;
  color: #2E482D;
  cursor: pointer;
  font-size: 16px;
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
  background-size: cover;
  background-position: center;
  border-radius: 10px;
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

.confirmation-dialog {
  position: absolute;
  width: 269px;
  height: 164px;
  left: 80px;
  top: 397px;
  background: #4A7648;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.confirmation-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
}

.confirmation-buttons button {
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: white;
  color: #4A7648;
  font-weight: bold;
}
</style>
