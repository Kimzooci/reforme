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

    <form @submit.prevent="submitPost">
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
          <div v-if="imagePreview" class="image-preview" :style="{ backgroundImage: 'url(' + imagePreview + ')' }"></div>
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
        <button type="submit" class="submit-button">확인</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.emitter.emit("updateButtons", {
      menuButton: false,
      searchButton: false,
      backButton: true,
    });
  },
  data() {
    return {
      categories: [
        { id: "TOP", name: "상의" },
        { id: "OUTER", name: "외투" },
        { id: "BOTTOM", name: "하의" },
        { id: "BAG", name: "가방" },
        { id: "ETC", name: "기타" },
      ],
      selectedCategory: null,
      title: "",
      content: "",
      images: [null, null, null, null, null], // 이미지 배열 초기화
      imagePreviews: [null, null, null, null, null], // 이미지 미리보기 배열 초기화
      uploadIndex: null,
    };
  },
  methods: {
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
        console.log(`Image loaded at index ${index}:`, this.imagePreviews[index]);
      };
      reader.readAsDataURL(file);
    },
    submitPost() {
      const formData = new FormData();
      const boardData = {
        title: this.title,
        body: this.content,
        category: this.selectedCategory,
      };
      formData.append("board", new Blob([JSON.stringify(boardData)], { type: "application/json" }));
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

.categories {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}

.categories button {
  padding: 5px 10px;
  border-radius: 10px;
  border: none;
  background-color: #b1b1b1;
  color: black;
  font-size: 16px;
  transition: background-color 0.3s;
  flex: 1;
  max-width: 70px;
}

.categories button:focus {
  outline: none;
  box-shadow: none;
}

.categories .active {
  background-color: #4a7648;
  color: white;
}

.input-title,
.input-content {
  width: 90%;
  margin: 10px auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
}

.input-content {
  height: 200px;
  resize: none;
}

.action-buttons {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: 90%;
}

.submit-button {
  width: 100%;
  height: 76px;
  padding: 10px 20px;
  background-color: #4a7648;
  color: white;
  border: none;
  border-radius: 10px;
}

.image-upload-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 74px;
  padding: 0 10px;
  margin: 0 auto;
  background-color: #ffffff;
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
