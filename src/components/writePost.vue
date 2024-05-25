<template>
  <div class="main-container">
    <div class="navbar" style="background: #2e482d; padding: 9px 10px;">
      <button @click="$emit('back')" class="menu-button">＜</button>
      <span class="navbar-title">Reforme</span>
      <button class="search-button"></button>
    </div>

    <div class="categories">
      <button v-for="category in categories" :key="category.id"
              :class="{ 'active': selectedCategory === category.id }"
              @click="selectCategory(category.id)">
        {{ category.name }}
      </button>
    </div>

    <input type="text" placeholder="제목을 입력해주세요" v-model="title" class="input-title"/>

    <textarea placeholder="내용을 입력해주세요" v-model="content" class="input-content"></textarea>

    <div class="image-upload-buttons">
      <button v-for="n in 5" :key="n" class="image-upload-button" @click="triggerFileUpload">+</button>
      <input type="file" id="file-input" ref="fileInput" style="display: none;" multiple @change="handleFiles"/>
    </div>

    <div class="action-buttons">
      <button class="submit-button">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { id: 1, name: '상의' },
        { id: 2, name: '외투' },
        { id: 3, name: '하의' },
        { id: 4, name: '가방' },
        { id: 5, name: '기타' },
      ],
      selectedCategory: null,
      title: '',
      content: '',
    };
  },
  methods: {
    selectCategory(id) {
      this.selectedCategory = id;
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFiles(event) {
      const files = event.target.files;
      console.log(files);
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
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}

.categories button {
  padding: 5px 10px;
  border-radius: 10px;
  border: none;
  background-color: #b1b1b1;
  color: black;
  font-size: 16px;
}

.categories .active {
  background-color: #4a7648;
  color: white;
}

.input-title,
.input-content {
  width: 412px;
  height: 69px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.input-content {
  width: 410px;
  height: 378px;
  gap: 0px;
  border-radius: 10px 0px 0px 0px;
  border: 1px 0px 0px 0px;
  opacity: 0px;

  resize: none;
}

.action-buttons {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.submit-button {
  width: 410px;
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
  width: 410px;
  height: 74px;
  padding: 0 10px;
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
}
</style>
