<template>
  <div class="main-container">
    <div class="content">
      <h1>Reforme 페이지</h1>

      <!-- Post List -->
      <div class="post-list">
        <div
          v-for="post in posts"
          :key="post.id"
          class="post-item"
          @click="openPostDetails(post)"
        >
          <div
            class="post-image"
            :style="{
              backgroundImage: 'url(' + getFirstImage(post.images) + ')',
            }"
          ></div>
          <div class="post-info">
            <h3>{{ post.title }}</h3>
            <div class="post-details">
              <p>
                {{ post.timestamp }} |
                <span>{{ getCategoryName(post.type) }}</span>
              </p>
              <span>{{ post.comments }} 댓글</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bar with Buttons -->
    <div class="footer-bar">
      <router-link
        to="/reforme"
        class="footer-button"
        :class="{ active: selectedFooterButton === '리포미' }"
        @click="selectFooterButton('리포미')"
      >
        리포미
      </router-link>
      <router-link
        to="/reforyou"
        class="footer-button"
        :class="{ active: selectedFooterButton === '리포유' }"
        @click="selectFooterButton('리포유')"
      >
        리포유
      </router-link>
    </div>

    <!-- Floating Action Buttons -->
    <div class="action-buttons">
      <button @click="step = 1" class="create-button">+</button>
      <router-link to="/chatbot" class="chat-button">🗨️</router-link>
    </div>
    <!-- step == 2 삭제 -> link 이동으로 변경함 -->
    <div v-if="step == 1">
      <writePost @back="step = 0" @submit-post="addPost"></writePost>
    </div>

    <div v-if="step == 3">
      <post-details :post="selectedPost" @back="step = 0"></post-details>
    </div>
  </div>
</template>

<script>
import writePost from "./writePost.vue";
import postDetails from "./postDetails.vue";

export default {
  name: "Reforme",
  components: {
    writePost,
    postDetails,
  },
  data() {
    return {
      step: 0,
      selectedFooterButton: "리포미",
      posts: [],
      selectedPost: null,
    };
  },
  methods: {
    addPost(post) {
      this.posts.push(post);
      this.step = 0; // 돌아가기
    },
    selectFooterButton(button) {
      this.selectedFooterButton = button;
    },
    openPostDetails(post) {
      this.selectedPost = post;
      this.step = 3;
    },
    getFirstImage(images) {
      return images.find((image) => image !== null) || "";
    },
    getCategoryName(type) {
      const categoryMap = {
        1: "상의",
        2: "외투",
        3: "하의",
        4: "가방",
        5: "기타",
      };
      return categoryMap[type] || "";
    },
  },
};
</script>

<style scoped>
@import "../styles/main.css";

.content {
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;
}

.post-list {
  margin-bottom: 70px;
}

.post-item {
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
}

.post-image {
  width: 80px;
  height: 80px;
  background-size: cover;
  background-position: center;
  margin-right: 20px;
}

.post-info {
  flex-grow: 1;
}

.post-details {
  font-size: 14px;
  color: gray;
}

/* 스타일 조정 */
.chat-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #2e482d;
  color: white;
  font-size: 36px;
  border: none;
  text-decoration: none; /* 링크 스타일 제거 */
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
