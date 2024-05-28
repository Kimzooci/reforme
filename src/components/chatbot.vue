<template>
  <div class="content">
    <div class="chat-window" ref="chatWindow">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.user ? 'user' : 'bot']"
      >
        <p>{{ message.text }}</p>
        <img v-if="message.image" :src="message.image" alt="Generated Image" />
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
      messages: [{ text: "안녕하세요! 뭘 도와드릴까요?", user: false }],
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
          {
            prompt: userMessage.text,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const botMessage = {
          text: "Here is the generated image:",
          image: `data:image/png;base64,${response.data}`,
          user: false,
        };

        this.messages.push(botMessage);
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
      formData.append("file", file);
      formData.append("prompt", this.userInput);

      try {
        const response = await axios.post("/api/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const imageMessage = {
          text: "Here is the modified image:",
          image: `data:image/png;base64,${response.data}`,
          user: false,
        };

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
  padding: 0; /* 여백 제거 */
}

.chat-window {
  flex-grow: 1;
  padding: 10px; /* 필요한 경우 padding 조정 */
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: rgba(46, 72, 45, 1) rgba(230, 230, 230, 1);
}

/* For Webkit browsers */
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
  width: 95%; /* 너비를 100%로 설정 */
  height: 50px;
  border-radius: 10px;
  border: none;
  margin-bottom: 0; /* 간격 제거 */
  padding: 0 10px; /* 좌우 패딩 추가 */
}

.ai_input {
  flex-grow: 1;
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  padding: 10px; /* 필요한 경우 padding 조정 */
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
