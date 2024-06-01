<template>
  <div class="main-container">
    <div class="content">
      <div class="post-list">
        <div
          v-for="post in sortedPosts"
          :key="post.id"
          class="post-item"
          @click="openPostDetails(post)"
        >
          <div
            class="post-image"
            :style="{ backgroundImage: 'url(' + getFirstImage(post.images) + ')' }"
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
        to="/reforme_page"
        class="footer-button"
        :class="{ active: selectedFooterButton === '리포미' }"
        @click="selectFooterButton('리포미')"
      >
        리포미
      </router-link>
      <router-link
        to="/reforyou_page"
        class="footer-button"
        :class="{ active: selectedFooterButton === '리포유' }"
        @click="selectFooterButton('리포유')"
      >
        리포유
      </router-link>
    </div>

    <!-- Floating Action Buttons -->
    <div class="action-buttons">
      <button @click="createPost" class="create-button">
        <img src="../assets/images/generate1.png" alt="" />
      </button>
      <router-link to="/chatbot_page" class="chat-button">
        <img src="../assets/images/chatbot.png" alt="" />
      </router-link>
    </div>
    <div v-if="step == 1">
      <writePost @back="step = 0" @submit-post="addPost"></writePost>
    </div>

    <div v-if="step == 3">
      <postDetails
        :post="selectedPost"
        @back="step = 0"
        @edit-post="editPost"
        @delete-post="deletePost"
      ></postDetails>
    </div>
  </div>
</template>

<script>
import writePost from "./writePost.vue";
import postDetails from "./postDetails.vue";
import axios from "axios";

export default {
  name: "Reforme",
  components: {
    writePost,
    postDetails,
  },
  data() {
    return {
      searchkeyword: '',
      searchfinish: false,
      searchoption: ['제목', '작성자'],
      searchoptionselected: '제목',
      searchcnt: 0,
      contentlist: [],
      step: 0,
      selectedFooterButton: "리포미",
      게시글: [],
      selectedPost: null,
      selectedCategory: 'ALL',
      searchQuery: "",
    };
  },
  created() {
    this.fetchPosts(); // 초기 게시글 로드
    this.emitter.emit("updateButtons", {
      menuButton: true,
      searchButton: true,
      backButton: false,
    });
  },
  computed: {
    filteredPosts() {
      let posts = this.게시글;
      if (this.selectedCategory && this.selectedCategory !== 'ALL') {
        posts = posts.filter(post => post.type === this.selectedCategory);
      }
      if (this.searchQuery) {
        posts = posts.filter(post => post.title.includes(this.searchQuery));
      }
      return posts;
    },
    sortedPosts() {
      const posts = this.filteredPosts.slice();
      posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      return posts;
    }
  },
  methods: {
    async fetchPosts() {
      try {
        let url = `/api/reforyou`;
        if (this.selectedCategory && this.selectedCategory !== 'ALL') {
          url += `/${this.selectedCategory}`;
        }
        if (this.searchQuery) {
          url += `/search/${this.searchQuery}`;
        }
        const response = await axios.get(url, {
          params: {
            page: 0
          }
        });
        this.게시글 = response.data.data;
      } catch (error) {
        console.error("게시글 로드 오류:", error);
      }
    },
    addPost(post) {
      this.게시글.push(post);
      this.step = 0;
    },
    selectFooterButton(button) {
      this.selectedFooterButton = button;
    },
    openPostDetails(post) {
      this.selectedPost = post;
      this.step = 3;
    },
    createPost() {
      this.selectedPost = null;
      this.step = 1;
    },
    editPost(post) {
      this.게시글 = this.게시글.filter((p) => p.id !== post.id);
      this.selectedPost = post;
      this.step = 1;
    },
    deletePost(postId) {
      this.게시글 = this.게시글.filter((post) => post.id !== postId);
      this.step = 0;
    },
    getFirstImage(images) {
      const image = images.find((image) => image !== null);
      return image ? image : "";
    },
    getCategoryName(type) {
      const categoryMap = {
        TOP: "상의",
        OUTER: "외투",
        BOTTOM: "하의",
        BAG: "가방",
        ETC: "기타",
      };
      return categoryMap[type] || "";
    },
    filterPosts(category) {
      this.selectedCategory = category;
      this.fetchPosts();
    },
    updateSearchQuery(query) {
      this.searchQuery = query;
      this.fetchPosts();
    }
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
  width: 100%;
  overflow-y: auto;
  margin-top: 0;
  position: absolute;
  top: 0px;
  height: calc(100% - 174px);
}

.post-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
}

.post-image {
  width: 60px;
  height: 60px;
  background-size: cover;
  background-position: center;
  margin-right: 20px;
  border-radius: 10px;
}

.post-info {
  flex-grow: 1;
}

.post-details {
  font-size: 14px;
  color: gray;
}

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
  text-decoration: none;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
