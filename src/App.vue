<template>
  <div v-if="step == 0" class="main-container">
    <!-- Navigation Bar -->
    <navigator></navigator>

    <!-- Post List -->
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post-item" @click="openPostDetails(post)">
        <div class="post-image" :style="{ backgroundImage: 'url(' + getFirstImage(post.images) + ')' }"></div>
        <div class="post-info">
          <h3>{{ post.title }}</h3>
          <div class="post-details">
            <p>{{ post.timestamp }} | <span>{{ getCategoryName(post.type) }}</span></p>
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
    getFirstImage(images) {
      return images.find(image => image !== null) || '';
    },
    getCategoryName(type) {
      const categoryMap = {
        1: '상의',
        2: '외투',
        3: '하의',
        4: '가방',
        5: '기타'
      };
      return categoryMap[type] || '';
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
  position: relative; /* 추가 */
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
  background-size: cover; /* 이미지의 비율을 유지하면서 컨테이너를 덮음 */
  background-position: center; /* 이미지의 중심을 기준으로 배치 */
}

.footer-bar {
  display: flex;
  width: 100%;
  height: 85px;
  background-color: #2e482d;
  position: absolute; /* 수정 */
  bottom: 0; /* 수정 */
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

.action-buttons {
  position: absolute;
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
