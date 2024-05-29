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
        ref="fileInput"
        style="display: none"
        @change="uploadImage"
      />
      <input type="radio" name="프롬프트" />
      <input type="radio" name="메세지" />
      <button class="ai_submit_button" @click="triggerFileInput">
        <img src="../assets/images/imagelogo.png" alt="image" />
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
  data() {
    return {
      userInput: "",
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
        const response = await axios.post(
          "/api/image",
          { prompt: userMessage.text },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const textMessage = {
          text: "요청하신 이미지 입니다😆",
          user: false,
        };

        const imageMessage = {
          image: `data:image/png;base64,${response.data}`,
          user: false,
        };

        this.messages.push(textMessage);
        this.messages.push(imageMessage);
        this.scrollToBottom();
      } catch (error) {
        console.error("Error generating response:", error);
        this.messages.push({ text: "Error generating response", user: false });
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async uploadImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);
      formData.append("prompt", this.userInput);

      try {
        const response = await axios.post("/api/edit-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const textMessage = {
          text: "수정된 이미지 입니다😊",
          user: false,
        };

        const imageMessage = {
          image: `data:image/png;base64,${response.data}`,
          user: false,
        };

        this.messages.push(textMessage);
        this.messages.push(imageMessage);
        this.scrollToBottom();
      } catch (error) {
        console.error("Error uploading image:", error);
        this.messages.push({ text: "Error uploading image", user: false });
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatWindow = this.$refs.chatWindow;
        chatWindow.scrollTop = chatWindow.scrollHeight;
      });
    },
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>

<style scoped>
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
  margin-bottom: 0;
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
</style>
