<template>
  <div class="main-container">
    <div class="categories">
      <button
        v-for="category in isReforme ? categories : categories2"
        :key="category.id"
        :class="{ active: selectedCategory === category.id }"
        @click="selectCategory(category.id)"
      >
        {{ category.name }}
      </button>
    </div>

    <form @submit.prevent="submitOrEditPost">
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
          v-for="(imagePreview, index) in imagePreviews"
          :key="index"
          class="image-upload-button"
          @click.prevent="triggerFileUpload(index)"
        >
          <div
            v-if="imagePreview"
            class="image-preview"
            :style="{ backgroundImage: 'url(' + imagePreview + ')' }"
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
        <button type="submit" class="submit-button" :disabled="!canSubmit">
          확인
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from 'vuex';

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
      postData: null,
      boardId: null,
      categories: [
        { id: "TOP", name: "상의" },
        { id: "OUTWEAR", name: "외투" },
        { id: "BOTTOM", name: "하의" },
        { id: "BAG", name: "가방" },
        { id: "ETC", name: "기타" },
      ],
      categories2: [
        { id: "CLOTHES", name: "옷" },
        { id: "BAG", name: "가방" },
        { id: "SHOES", name: "신발" },
        { id: "ETC", name: "기타" },
      ],
      selectedCategory: null,
      title: "",
      content: "",
      images: [null, null, null, null, null], // 이미지 배열 초기화
      imagePreviews: [null, null, null, null, null], // 이미지 미리보기 배열 초기화
      uploadIndex: null,
      defaultImage: require("@/assets/images/default-image.png"), // 기본 이미지 경로 설정
    };
  },
created() {
    this.emitter.emit("updateButtons", {
      menuButton: false,
      searchButton: false,
      backButton: true,
    });

    // URL 경로를 확인하여 reforme 값을 설정

    const path = this.$route.path;
    if (path.includes("/reforyou_page")) {
      this.reforme = false;
    } else if (path.includes("/reforme_page")) {
      this.reforme = true;
    }

    console.log("reforme:", this.reforme);
  },

  mounted() {
    
    this.boardId = this.$route.params.id;
    if (this.boardId) {
      this.populatePostData();
    }

    this.emitter.emit("updateButtons", {
      menuButton: false,
      searchButton: false,
      backButton: true,
    });
  },
  computed: {
    ...mapGetters(['getReforme']),
    canSubmit() {
      return (
        this.selectedCategory !== null &&
        this.title.trim() !== "" &&
        this.content.trim() !== "" &&
        this.images.some((image) => image !== null)
      );
    },
    isReforme() {
      return this.getReforme;
    }
  },

  methods: {
    ...mapActions(['updateReforme']),
    fire() {
      this.emitter.emit("updateButtons", {
        menuButton: true,
        searchButton: false,
        backButton: false,
      });
    },

    selectCategory(id) {
      this.selectedCategory = id;
    },

    triggerFileUpload(index) {
      this.uploadIndex = index; // 업로드할 버튼 인덱스를 저장
      this.$refs.fileInput.click();
      console.log(`Trigger file upload for index: ${this.uploadIndex}`);
    },

    handleFiles(event) {
      const files = event.target.files;
      console.log("Files selected:", files);
      for (let i = 0; i < files.length; i++) {
        this.readImage(files[i], this.uploadIndex + i);
      }
    },

    readImage(file, index) {
      console.log("Reading image file:", file, "for index:", index);
      this.images[index] = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviews[index] = e.target.result; // 이미지 미리보기 설정
        console.log(
          `Image loaded at index ${index}:`,
          this.imagePreviews[index]
        );
      };
      reader.readAsDataURL(file);
    },

    submitOrEditPost() {
      console.log("리포미 or 리포유 데이터" + this.isReforme);
      if (this.boardId) {
        if (this.isReforme) this.reformeEdit();
        else this.reforyouEdit();
      } else {
        if (this.isReforme) this.reformeSubmit();
        else this.reforyouSubmit();
      }
    },

    reformeEdit() {
      console.log(this.isReforme);
      const formData = new FormData();
      const boardData = {
        title: this.title,
        body: this.content,
        category: this.selectedCategory,
      };
      formData.append(
        "board",
        new Blob([JSON.stringify(boardData)], { type: "application/json" })
      );
      this.images.forEach((image, index) => {
        if (image) {
          formData.append("images", image, `image${index}.png`);
          console.log(`Image ${index} added to form data:`, image);
        }
      });

      axios
        .patch(`/reforme/board/${this.boardId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Response from server:", response);
          if (response.data.statusCode === 200) {
            alert("게시글 수정 성공");
            this.$router.push("/reforme_page");
          } else {
            alert("게시글 수정 실패");
          }
        })
        .catch((error) => {
          console.log("Error posting data:", error);
          alert("게시글 수정 실패: " + error.message);
        });
    },
    reforyouEdit() {
      console.log(this.isReforme);
      const formData = new FormData();
      const boardData = {
        title: this.title,
        body: this.content,
        category: this.selectedCategory,
      };
      formData.append(
        "board",
        new Blob([JSON.stringify(boardData)], { type: "application/json" })
      );
      this.images.forEach((image, index) => {
        if (image) {
          formData.append("images", image, `image${index}.png`);
          console.log(`Image ${index} added to form data:`, image);
        }
      });

      axios
        .patch(`/reforyou/board/${this.boardId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Response from server:", response);
          if (response.data.statusCode === 200) {
            alert("게시글 수정 성공");
            this.$router.push("/reforyou_page");
          } else {
            alert("게시글 수정 실패");
          }
        })
        .catch((error) => {
          console.log("Error posting data:", error);
          alert("게시글 수정 실패: " + error.message);
        });
    },
    reformeSubmit() {
      const formData = new FormData();
      const boardData = {
        title: this.title,
        body: this.content,
        category: this.selectedCategory,
      };
      formData.append(
        "board",
        new Blob([JSON.stringify(boardData)], { type: "application/json" })
      );
      this.images.forEach((image, index) => {
        if (image) {
          formData.append("images", image, `image${index}.png`);
          console.log(`Image ${index} added to form data:`, image);
        }
      });

      axios
        .post("/reforme/board", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Response from server:", response);
          if (response.data.statusCode === 200) {
            alert("게시글 작성 성공");
            this.$router.push("/reforme_page");
          } else {
            alert("게시글 작성 실패");
          }
        })
        .catch((error) => {
          console.log("Error posting data:", error);
          alert("게시글 작성 실패: " + error.message);
        });
    },
    reforyouSubmit() {
      const formData = new FormData();
      const boardData = {
        title: this.title,
        body: this.content,
        category: this.selectedCategory,
      };
      formData.append(
        "board",
        new Blob([JSON.stringify(boardData)], { type: "application/json" })
      );
      this.images.forEach((image, index) => {
        if (image) {
          formData.append("images", image, `image${index}.png`);
          console.log(`Image ${index} added to form data:`, image);
        }
      });

      axios
        .post("/reforyou/board", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Response from server:", response);
          if (response.data.statusCode === 200) {
            alert("refor U 게시글 작성 성공");
            this.$router.push("/reforyou_page");
          } else {
            alert(" refor U 게시글 작성 실패");
          }
        })
        .catch((error) => {
          console.log("Error posting data:", error);
          alert(" refor U 게시글 작성 실패: " + error.message);
        });
    },
    populatePostData() {
      if (this.postData) {
        this.selectedCategory = this.postData.type;
        this.title = this.postData.title;
        this.content = this.postData.body;
        this.images = this.postData.images.length
          ? this.postData.images
          : [null, null, null, null, null];
      }
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
  padding: 10px 0px;
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
  margin: 0 10px;
  margin-bottom: 10px;
  margin-top: 10px;
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

.input-title {
  font-size: x-large;
}

.input-title,
.input-content {
  width: 412px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 15px;
}

.input-content {
  width: 410px;
  height: 500px;
  gap: 0px;
  border-radius: 10px 10px 10px 10px;
  border: 1px solid #ccc; /* 변경 */
  resize: none;
  font-size: large;
  opacity: 1; /* 변경 */
  margin-bottom: 30px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: 90%; /* 수정 */
}

.submit-button {
  width: 420px; /* 수정: 양쪽 여백 포함 */
  height: 76px;
  padding: 10px 20px;
  background-color: #4a7648;
  color: white;
  border: none;
  border-radius: 10px;
  position : fixed;
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
  width: 100%;
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
  margin-top: 10px;
}

.image-preview {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
}
</style>
