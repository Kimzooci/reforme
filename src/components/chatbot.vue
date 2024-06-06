<template>
  <div class="content">
    <div class="chat-window" ref="chatWindow">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.user ? 'user' : 'bot']"
      >
        <p v-if="message.text">{{ message.text }}</p>
        <img
          v-if="message.image"
          :src="message.image"
          alt="Generated Image"
          class="chat-image"
        />
      </div>
    </div>
    <div class="radio-buttons">
      <label class="custom-radio">
        <input
          type="radio"
          name="inputType"
          value="prompt"
          v-model="inputType"
        />
        <span class="radio-btn">
          <i class="fas fa-check"></i>
          <div class="hobbies-icon"></div>
        </span>
        사진 생성
      </label>
      <label class="custom-radio">
        <input
          type="radio"
          name="inputType"
          value="message"
          v-model="inputType"
        />
        <span class="radio-btn">
          <i class="fas fa-check"></i>
          <div class="hobbies-icon"></div>
        </span>
        대화하기
      </label>
      <label class="custom-radio">
        <input type="radio" name="inputType" value="edit" v-model="inputType" />
        <span class="radio-btn">
          <i class="fas fa-check"></i>
          <div class="hobbies-icon"></div>
        </span>
        리폼하기
      </label>
    </div>
    <div class="ai_input_container">
      <input
        type="text"
        v-model="userInput"
        class="ai_input"
        placeholder="Type here..."
        @keyup.enter="sendMessage"
      />
      <input
        type="file"
        ref="imageInput"
        style="display: none"
        @change="uploadImage('image')"
      />
      <input
        type="file"
        ref="maskInput"
        style="display: none"
        @change="uploadImage('mask')"
      />
      <button
        class="ai_submit_button"
        @click="triggerFileInput('image')"
        v-if="inputType === 'edit'"
      >
        <img src="../assets/images/imagelogo.png" alt="image" />
      </button>
      <button
        class="ai_submit_button"
        @click="triggerFileInput('mask')"
        v-if="inputType === 'edit'"
      >
        <!-- <img src="../assets/images/masklogo.png" alt="mask" /> -->
      </button>
      <button class="ai_submit_button" @click="sendMessage">
        <img src="../assets/images/submitlogo.png" alt="submit" />
      </button>
    </div>
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
      userInput: "",
      inputType: "prompt", // 기본값을 'prompt'로 설정하여 이미지를 업로드할 때 트리거됩니다.
      messages: [
        {
          text: "안녕하세요! 리포미입니다😁",
          user: false,
        },
        {
          text: "원하시는 프롬프트를 작성해주세요🤗",
          user: false,
        },
        { image: require("../assets/images/cat.png"), user: false },
      ],
      imageFile: null,
      maskFile: null,
    };
  },
  methods: {
    async sendMessage() {
      if (this.userInput.trim() === "") return;

      const userMessage = { text: this.userInput, user: true };
      this.messages.push(userMessage);
      this.userInput = "";
      this.scrollToBottom();

      try {
        if (this.inputType === "message") {
          const response = await axios.post("/aichat/chat_text", null, {
            params: { text: userMessage.text },
          });

          const botMessage = {
            text: response.data,
            user: false,
          };

          this.messages.push(botMessage);
        } else if (this.inputType === "prompt") {
          // 프롬프트로 이미지를 생성합니다.
          const formData = new FormData();
          formData.append("prompt", userMessage.text);

          const response = await axios.post("/aichat/chat_image", formData);

          const botMessage = {
            text: "생성된 이미지입니다😊",
            user: false,
          };

          const generatedImageMessage = {
            image: `data:image/png;base64,${response.data}`,
            user: false,
          };

          this.messages.push(botMessage);
          this.messages.push(generatedImageMessage);
        } else if (this.inputType === "edit") {
          // 수정할 이미지를 처리합니다.
          if (!this.imageFile) {
            this.messages.push({
              text: "수정할 이미지를 업로드해주세요.",
              user: false,
            });
            return;
          }

          const formData = new FormData();
          formData.append("image", this.imageFile);
          if (this.maskFile) {
            formData.append("mask", this.maskFile);
          }
          formData.append("prompt", userMessage.text);

          const response = await axios.post("/aichat/chat_modify", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const textMessage = {
            text: "수정된 이미지입니다😊",
            user: false,
          };

          const editedImageMessage = {
            image: `data:image/png;base64,${response.data}`,
            user: false,
          };

          this.messages.push(textMessage);
          this.messages.push(editedImageMessage);
        }
        this.scrollToBottom();
      } catch (error) {
        console.error("Error generating response:", error);
        this.messages.push({ text: "Error generating response", user: false });
      }
    },
    async uploadImage(type) {
      const file = this.$refs[`${type}Input`].files[0];
      if (!file) return;

      if (type === "image") {
        this.imageFile = file;
      } else if (type === "mask") {
        this.maskFile = file;
      }

      const userMessage = { text: `Uploaded ${type} image`, user: true };
      this.messages.push(userMessage);

      const imageMessage = {
        image: URL.createObjectURL(file),
        user: true,
      };
      this.messages.push(imageMessage);
      this.scrollToBottom();
    },
    triggerFileInput(type) {
      this.$refs[`${type}Input`].click();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatWindow = this.$refs.chatWindow;
        chatWindow.scrollTop = chatWindow.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

.content {
  width: 430px;
  height: 932px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  position: relative;
  border: none;
  padding: 0;
}

.chat-window {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: rgba(46, 72, 45, 1) rgba(230, 230, 230, 1);
}

.chat-window::-webkit-scrollbar {
  width: 8px;
}

.chat-window::-webkit-scrollbar-thumb {
  background-color: rgba(46, 72, 45, 1);
  border-radius: 4px;
}

.chat-window::-webkit-scrollbar-track {
  background-color: rgba(230, 230, 230, 1);
}

.message {
  margin-bottom: 10px;
  max-width: 80%;
  word-wrap: break-word;
  position: relative;
  padding: 10px;
  border-radius: 15px;
  background-color: rgba(74, 118, 72, 1);
  color: white;
}

.message.bot {
  align-self: flex-start;
}

.message.user {
  align-self: flex-end;
  text-align: right;
  background-color: #007aff;
}

.message p {
  margin: 0;
}

.message img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.image-placeholder {
  width: 300px;
  height: 300px;
  background-color: #c4c4c4;
  border-radius: 10px;
  margin-top: 10px;
}

.ai_input_container {
  display: flex;
  align-items: center;
  background-color: rgba(74, 118, 72, 1);
  width: 95%;
  height: 50px;
  border-radius: 10px;
  border: none;
  margin-bottom: 10px;
  padding: 0 10px;
}

.ai_input {
  flex-grow: 1;
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  padding: 10px;
  font-size: 16px;
}

.ai_submit_button {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  height: 100%;
}

.ai_submit_button img {
  width: auto;
  height: 24px;
}

.ai_submit_button img:first-child {
  margin-right: 10px;
}

.radio-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  gap: 20px;
}

.custom-radio {
  position: relative;
  cursor: pointer;
}

.custom-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.radio-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  background-color: #e6e6e6;
  border-radius: 50%;
  position: relative;
  transition: background-color 0.2s;
}

.radio-btn .hobbies-icon {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.radio-btn i {
  display: none;
}

.custom-radio input:checked ~ .radio-btn {
  background-color: #4a7648;
}

.custom-radio input:checked ~ .radio-btn i {
  display: block;
  color: white;
  position: absolute;
  font-size: 24px;
}
</style>
