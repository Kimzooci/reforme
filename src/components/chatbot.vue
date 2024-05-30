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
    <div
      class="radio-buttons-container-wrapper"
      :class="{ active: showRadioButtons }"
    >
      <div class="radio-buttons-container">
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
            프롬프트
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
            메세지
          </label>
        </div>
      </div>
    </div>
    <div class="ai_input_container">
      <input
        type="text"
        v-model="userInput"
        class="ai_input"
        placeholder="Type here..."
        @focus="showRadioButtons = true"
        @blur="hideRadioButtons"
        @keyup.enter="sendMessage"
      />
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="uploadImage"
      />
      <button
        class="ai_submit_button"
        @click="
          triggerFileInput;
          showRadioButtons = true;
        "
        v-if="inputType === 'prompt'"
      >
        <img src="../assets/images/imagelogo.png" alt="image" />
      </button>
      <button
        class="ai_submit_button"
        @click="
          sendMessage;
          showRadioButtons = true;
        "
      >
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
      inputType: "prompt",
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
      showRadioButtons: false,
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
        if (this.inputType === "prompt") {
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
        } else {
          const response = await axios.post(
            "/api/message",
            { message: userMessage.text },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const botMessage = {
            text: response.data,
            user: false,
          };

          this.messages.push(botMessage);
        }
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
    hideRadioButtons() {
      setTimeout(() => {
        this.showRadioButtons = false;
      }, 200); // Adjust timeout if necessary to prevent premature hiding
    },
  },
  mounted() {
    this.scrollToBottom();
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

.radio-buttons-container-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}

.radio-buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  height: 0;
  transition: height 0.3s ease;
  position: absolute;
  bottom: 60px; /* Adjust this value to ensure it is above the input */
}

.radio-buttons-container-wrapper:hover .radio-buttons-container,
.radio-buttons-container-wrapper.active .radio-buttons-container {
  height: 80px; /* Adjust this height to the desired size */
}

.radio-buttons {
  display: flex;
  gap: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.radio-buttons-container-wrapper:hover .radio-buttons,
.radio-buttons-container-wrapper.active .radio-buttons {
  opacity: 1;
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
