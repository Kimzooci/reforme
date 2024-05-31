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
        multiple
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
export default {
  name: "WritePost",
  props: {
    post: {
      type: Object,
      default: null,
    },
  },
  created() {
    this.emitter.emit("updateButtons", {
      menuButton: false,
      searchButton: true,
      backButton: true,
    });

    // Load post data if editing an existing post
    if (this.post) {
      this.selectedCategory = this.post.type;
      this.title = this.post.title;
      this.content = this.post.content;
      this.images = this.post.images.length ? this.post.images : [null, null, null, null, null];
    }
  },
  data() {
    return {
      categories: [
        { id: 1, name: "상의" },
        { id: 2, name: "외투" },
        { id: 3, name: "하의" },
        { id: 4, name: "가방" },
        { id: 5, name: "기타" },
      ],
      selectedCategory: null,
      title: "",
      content: "",
      images: [null, null, null, null, null], // 이미지 배열 초기화
      defaultImage: require("@/assets/images/default-image.png"), // 기본 이미지 경로 설정
    };
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
    fire() {
      this.emitter.emit("updateButtons", {
        menuButton: true,
        searchButton: true,
        backButton: false,
      });
    },
    selectCategory(id) {
      this.selectedCategory = id;
    },
    triggerFileUpload(index) {
      this.uploadIndex = index; // 업로드할 버튼 인덱스를 저장
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
        this.images[index] = e.target.result; // Vue 3에서는 직접 배열 요소 수정
      };
      reader.readAsDataURL(file);
    },
    submitPost() {
      this.fire();
      const newPost = {
        id: Date.now(),
        title: this.title,
        content: this.content,
        timestamp: new Date().toLocaleString(),
        type: this.selectedCategory,
        comments: 0,
        images: this.images.filter((image) => image !== null).length > 0 ? this.images.filter((image) => image !== null) : [this.defaultImage], // 기본 이미지를 사용
      };
      this.$emit("submit-post", newPost);
      this.$emit("back"); // 추가된 부분: 확인 버튼 클릭 시 app.vue로 돌아가기
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
