<template>
  <div class="main-container">
    <!-- Post Title and Author Section -->
    <div class="post-header">
      <h2 class="post-title">{{ post.title }}</h2>
      <p class="post-author">{{ post.author }} 작성자 </p>
      <div class="post-actions">
        <button class="edit-button" @click="editPost">수정</button>
        <button class="delete-button" @click="deletePost">삭제</button>
      </div>
    </div>

    <!-- Post Images Section -->
    <div class="post-images-section" v-if="post.images && post.images.length">
      <div v-for="(image, index) in post.images" :key="index" class="post-image" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
    </div>

    <!-- Post Content Section -->
    <div class="post-content-section">
      <div class="post-content">{{ post.content }}</div>
    </div>

    <!-- Comments Section -->
    <div class="comments-container">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-text">{{ comment.text }}</div>
        <button class="comment-action" @click="editComment(comment)">수정</button>
        <button class="comment-action" @click="deleteComment(comment.id)">삭제</button>
      </div>
    </div>

    <!-- Footer Bar with Input -->
    <div class="footer-bar">
      <input v-model="newComment" class="input-comment" @keyup.enter="addComment" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostDetails',
  props: {
    post: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
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
          author: 'Designer',
          text: this.newComment
        });
        this.newComment = '';
      }
    },
    editPost() {
      this.$emit('edit-post', this.post);
    },
    deletePost() {
      this.$emit('delete-post', this.post.id);
    },
    editComment(comment) {
      const updatedText = prompt("Enter new comment text:", comment.text);
      if (updatedText) {
        comment.text = updatedText;
      }
    },
    deleteComment(commentId) {
      this.comments = this.comments.filter(comment => comment.id !== commentId);
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
  overflow-y: auto;
}

.post-header {
  flex-grow: 1;
  padding: 10px 20px;
  background: #FFFFFF;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 0px;
  width: 350px;
  height: 120px;
  overflow-y: auto;
}

.post-title {
  font-size: 22px;
  margin: 0;
}

.post-author {
  color: #888;
  margin: 0;
}

.post-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
  margin-left: auto; /* Ensures that the buttons align to the right */
  margin-right: 0;
}

.edit-button, .delete-button {
  background: #2E482D;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.post-images-section {
  flex-grow: 1;
  padding: 10px 20px;
  background: #FFFFFF;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 0px;
  width: 350px;
  height: 300px;
  overflow-y: auto;
}

.post-image {
  width: 100px;
  height: 100px;
  background: #B1B1B1;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
}

.post-content-section {
  flex-grow: 1;
  padding: 10px 20px;
  background: #FFFFFF;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 0px;
  width: 350px;
  height: 150px;
  overflow-y: auto;
}

.post-content {
  font-size: 16px;
  margin-bottom: 20px;
}

.comments-container {
  flex-grow: 1;
  padding: 10px 20px;
  background: #FFFFFF;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 0px;
  width: 350px;
  height: 300px;
  overflow-y: auto;
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
  flex-grow: 1;
}

.comment-action {
  background: #2E482D;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.footer-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: #2E482D;
  border-radius: 0 0 10px 10px;
  width: 390px;
  box-sizing: border-box;
}

.input-comment {
  margin-right: 10px;
  padding: 10px 10px;
  border: 1px solid #E1E1E1;
  border-radius: 5px;
  height: 40px;
  width: 300px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
</style>
