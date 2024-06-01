<template>
  <div class="main-container">
    <div class="categories">
      <button
        v-for="category in categories"
        :key="category.id"
        :class="{ active: selectedCategory === category.id }"
        @click="selectCategory(category.id)"
      >
        {{ category.name }}
      </button>
    </div>
    <input
      type="text"
      placeholder="제목을 입력해주세요"
      v-model="title"
      class="input-title"
    />
    <textarea
      placeholder="내용을 입력해주세요"
      v-model="content"
      class="input-content"
    ></textarea>
    <div class="image-upload-buttons">
      <button
        v-for="(image, index) in images"
        :key="index"
        class="image-upload-button"
        @click="triggerFileUpload(index)"
      >
        <div
          v-if="image"
          class="image-preview"
          :style="{ backgroundImage: 'url(' + image + ')' }"
        ></div>
        <div v-else>+</div>
      </button>
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFiles"
      />
    </div>
    <div class="action-buttons">
      <button class="submit-button" @click="submitPost" :disabled="!canSubmit">
        확인
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WritePost",
  props: {
    post: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      categories: [
        { id: 'TOP', name: "상의" },
        { id: 'BOTTOM', name: "하의" },
        { id: 'OUTER', name: "외투" },
        { id: 'BAG', name: "가방" },
        { id: 'ETC', name: "기타" },
      ],
      selectedCategory: null,
      title: "",
      content: "",
      images: [null, null, null, null, null], // 이미지 배열 초기화
      defaultImage: require("@/assets/images/default-image.png"), // 기본 이미지 경로 설정
      uploadIndex: 0, // 업로드할 이미지 인덱스 초기화
    };
  },
  created() {
    this.emitter.emit("updateButtons", {
      menuButton: false,
      searchButton: true,
      backButton: true,
    });

    // 기존 게시글 편집 시 데이터 로드
    if (this.post) {
      this.selectedCategory = this.post.type;
      this.title = this.post.title;
      this.content = this.post.content;
      this.images = this.post.images.length ? this.post.images : [null, null, null, null, null];
    }
  },
  computed: {
    canSubmit() {
      return (
        this.selectedCategory !== null &&
        this.title.trim() !== "" &&
        this.content.trim() !== "" &&
        this.images.some((image) => image !== null)
      );
    },
  },
  methods: {
    selectCategory(id) {
      this.selectedCategory = id;
    },
    triggerFileUpload(index) {
      this.uploadIndex = index; // 업로드할 이미지 인덱스 저장
      this.$refs.fileInput.click();
    },
    handleFiles(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.readImage(files[i], this.uploadIndex + i);
      }
    },
    readImage(file, index) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.images[index] = e.target.result; // 이미지 배열 요소 수정
      };
      reader.readAsDataURL(file);
    },
    async submitPost() {
      this.emitter.emit("updateButtons", {
        menuButton: true,
        searchButton: false,
        backButton: false,
      });

      const newPost = {
        title: this.title,
        content: this.content,
        type: this.selectedCategory,
        images: this.images.filter((image) => image !== null),
      };

      try {
        await axios.post("/api/reforme", newPost, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.$emit("submit-post", newPost);
        this.$emit("back"); // 확인 버튼 클릭 시 이전 화면으로 돌아가기
      } catch (error) {
        console.error("게시글 전송 오류:", error);
      }
    },
  },
};
</script>

<style scoped>
/* 스타일 코드 생략 */
</style>


<style scoped>
.main-container {
  width: 430px;
  height: 932px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.menu-button,
.search-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.navbar-title {
  font-size: 24px;
}

.categories {
  padding: 10px 0;
}

.categories button {
  height: 50px;
  width: 60px;
  padding: 5px 10px;
  border-radius: 10px;
  border: none;
  background-color: #b1b1b1;
  color: black;
  font-size: 19px;
  transition: background-color 0.5s; /* 배경 색상 전환 애니메이션 */
  flex: 1; /* 각 버튼의 크기를 균등하게 만듦 */
  max-width: 70px; /* 버튼 최대 너비를 설정 */
}

.categories button:focus {
  outline: none; /* 버튼 포커스 시 테두리 제거 */
  box-shadow: none; /* 버튼 포커스 시 그림자 제거 */
}

.categories .active {
  background-color: #4a7648;
  color: white;
  transform: none; /* 크기 변화를 방지 */
}

.input-title{
  font-size: x-large;
}

.input-title,
.input-content {
  width: 412px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.input-content {
  width: 410px;
  height: 450px;
  gap: 0px;
  border-radius: 10px 10px 10px 10px;
  border: 1px 0px 0px 0px;
  opacity: 0px;
  resize: none;
  font-size:large;
  
}

.action-buttons {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: 90%; /* 수정 */
}

.submit-button {
  width: 400px; /* 수정: 양쪽 여백 포함 */
  height: 76px;
  padding: 10px 20px;
  background-color: #4a7648;
  color: white;
  border: none;
  border-radius: 10px;
  position : absolute;
  bottom : 0;
}

.submit-button:disabled {
  background-color: grey;
  cursor: not-allowed;
}

.image-upload-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 410px;
  height: 74px;
  padding: 10px 10px;
  background-color: #ffffffff;
}

.image-upload-button {
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: white;
  font-size: 24px;
  border: none;
  border-radius: 10px;
  background-color: #4a7648;
  cursor: pointer;
  position: relative;
}

.image-preview {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
}
</style>
