<template>
  <div class="main-container">
    <div class="content">
      <!-- Post List -->
      <div class="post-list">
        <div
          v-for="post in 게시글"
          :key="post.boardId"
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
                {{ post.createdDateTime }} |
                <span>{{ getCategoryName(post.category) }}</span>
              </p>
              <span>{{ post.comments.length }} 댓글</span>
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
     <!-- <div>
     <router-link   v-if="step == 3" :to="`/detail/${selectedPost.boardId}`" :post="selectedPost"></router-link>
    </div>

    <div v-if="step == 3">
      <postDetails
        :post="selectedPost"
        @back="step = 0"
        @delete-post="deletePost"
      ></postDetails>
    </div> -->
    
  </div>  
</template>

<script>
import writePost from "./writePost.vue";
//import postDetails from "./postDetails.vue";
import axios from "axios";
import emitter from "../store/eventBus";  // eventBus import 추가

export default {
  name: "Reforyou",
  components: {
    writePost,
    //postDetails,
  },
  data() {
    return {
      step: 0,
      selectedFooterButton: "리포유",
      게시글: [],
      selectedPost: null,
      category: 'ALL', // 기본 카테고리 설정
    };
  },
  created() {
    this.$store.commit('setReforme', true);
    this.$store.dispatch('updateReforme', true);
    emitter.on('filterByCategory', this.filterBoards);  // 이벤트 리스너 추가
    emitter.on('search', this.searchBoards);  // 검색 이벤트 리스너 추가
    this.fetchBoards();
    //const path = this.$route.path;
    this.emitter.emit("updateButtons", {
      menuButton: true,
      searchButton: true,
      backButton: false,
    });
  },
  mounted() {
    // const path = this.$route.path;
    // let reformeValue;
    // if (path.includes('/reforyou_page')) {
    //   reformeValue = false;
    // } else if (path.includes('/reforme_page')) {
    //   reformeValue = true;
    // }

    // Vuex 상태 업데이트
    this.$store.dispatch('updateReforme', false);
    axios
      .get("/reforyou/ALL")
      .then((response) => {
        if (response.data.statusCode === 200) {
          alert("데이터 불러오기 성공");
          this.게시글 = response.data.data;
          console.log(response.data.statusCode)
        } else {
          alert("데이터 불러오기 실패");
        }
      })
      .catch((error) => {
        alert("데이터 불러오기 실패: " + error.message);
      });

    this.emitter.on("backfunction", (data) => {
      this.step = data;
    });
  },
  updated() {
    this.$store.dispatch('updateReforme', false);
    this.emitter.emit("reforme_or_reforyou", {
      menuButton: true,
      searchButton: true,
      backButton: false,
    });
  },
  methods: {
    async fetchBoards() {
      try {
        const response = await axios.get(`/reforyou/${this.category}`);
        if (response.data.statusCode === 200) {
          this.게시글 = response.data.data;
        } else {
          alert("데이터 불러오기 실패");
        }
      } catch (error) {
        alert("데이터 불러오기 실패: " + error.message);
      }
    },
    async filterBoards(category) {
      this.category = category;
      await this.fetchBoards();
    },
    async searchBoards(searchWord) {
      try {
        const response = await axios.get(`/reforyou/search/${searchWord}`);
        if (response.data.statusCode === 200) {
          this.게시글 = response.data.data;
        } else {
          alert("검색 결과 불러오기 실패");
        }
      } catch (error) {
        alert("검색 결과 불러오기 실패: " + error.message);
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
      //this.selectedPost = post;
      //<router-link :to="`/detail/${selectedPost.boardId}`" :post="selectedPost"></router-link>
      this.$router.push({
        name: "reforyou_detailPage",
        params: { id: Number(post.boardId) }, // 숫자로 변환
    }).catch(err => {
        console.error(err); // 에러 로그 추가
    });
      this.step = 3;
    },
    createPost() {
      this.selectedPost = null;
      this.$router
        .push({
          name: "write_page",
        })
        .catch((err) => {
          console.error(err); // 에러 로그 추가
        });
      this.step = 1;
    },
    // deletePost(postId) {
    //   this.게시글 = this.게시글.filter((post) => post.id !== postId);
    //   this.step = 0;
    // },
    getFirstImage(images) {
      const image = images.find((image) => image.imagePath !== null);
      const imageUrl = image ? `${image.imagePath}` : "";
      console.log("Image URL:", imageUrl); // 디버깅을 위한 콘솔 로그
      return imageUrl;
    },
    getCategoryName(category) {
      const categoryMap = {
        CLOTHES: "옷",
        BAG : "가방",
        SHOES: "신발",
        ETC: "기타",
      };
      return categoryMap[category] || "";
    },
  },
  beforeUnmount() {
    emitter.off('filterByCategory', this.filterBoards);  // 이벤트 리스너 해제
    emitter.off('search', this.searchBoards);  // 검색 이벤트 리스너 해제
  }
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
  margin-top: 10px; /* 공백 없애기 */
  position: absolute;
  top: 10px;
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

