<template>
  <div v-if="step == 0" class="main-container">
    <!-- Navigation Bar -->
    <navigator></navigator>

    <!-- Post List -->
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post-item" @click="openPostDetails(post)">
        <div class="post-image" :style="{ backgroundImage: 'url(' + post.image + ')' }"></div>
        <div class="post-info">
          <h3>{{ post.title }}</h3>
          <div class="post-details">
            <p>{{ post.timestamp }} | <span>{{ post.type }}</span></p>
            <span>{{ post.comments }} 댓글</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bar with Buttons -->
    <div class="footer-bar">
      <div
        class="footer-button"
        :class="{'active': selectedFooterButton === '리포미'}"
        @click="selectFooterButton('리포미')">리포미</div>
      <div
        class="footer-button"
        :class="{'active': selectedFooterButton === '리포유'}"
        @click="selectFooterButton('리포유')">리포유</div>
    </div>

    <!-- Floating Action Buttons -->
    <div class="action-buttons">
      <button @click="step = 1" class="create-button">+</button>
      <button @click="step = 2" class="chat-button">🗨️</button>
    </div>
  </div>

  <div v-if="step == 1">
    <writePost @back="step = 0" @submit-post="addPost"></writePost>
  </div>

  <div v-if="step == 3">
    <post-details :post="selectedPost" @back="step = 0"></post-details>
  </div>

  <!-- <div v-if="step == 2">
    <chatbotVue @back="step = 0"></chatbotVue>
  </div> -->
</template>

<script>
import navigator from './components/navigator.vue';
import writePost from './components/writePost.vue';
import postDetails from './components/postDetails.vue';

export default {
  name: 'App',
  components: {
    navigator,
    writePost,
    postDetails,
  },
  data() {
    return {
      step: 0,
      selectedFooterButton: '리포미',
      posts: [
        { id: 1, title: '제목', timestamp: '08/23/16:49', type: '상의', comments: 0, image: null },
        { id: 2, title: '제목', timestamp: '08/23/16:49', type: '하의', comments: 0, image: null },
      ],
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
  },
};
</script>

<style scoped>
.main-container {
  width: 430px;
  height: 932px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.navigator {
  width: 100%;
  height: 89px;
  background: #2e482d;
}

.post-list {
  width: 100%;
  overflow-y: auto;
  margin-top: 0; /* 공백 없애기 */
  height: calc(100% - 174px);
}

.post-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.post-image {
  width: 75px;
  height: 75px;
  background: #b1b1b1;
  border-radius: 10px;
  margin-right: 10px;
}

.footer-bar {
  display: flex;
  width: 100%;
  height: 85px;
  background-color: #2e482d;
  position: relative;
}

.footer-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  border: none;
  outline: none;
  cursor: pointer;
}

.footer-button.active {
  background-color: #2e482d;
}

.footer-button:not(.active) {
  background-color: #4c724c;
}

.reform-me {
  background-color: #4c724c;
}

.reform-you {
  background-color: #2e482d;
}

.action-buttons {
  position: fixed;
  bottom: 100px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create-button,
.chat-button {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #2e482d;
  color: white;
  font-size: 36px;
  border: none;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
