<template>
    <div class="content">
      <div class="navigator">
        <p>Reforme</p>
      </div>
  
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
  
  const OPENAI_API_KEY = "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";
  
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
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-4",
              messages: [{ role: "user", content: userMessage.text }],
            },
            {
              headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );
  
          const botMessage = {
            text: response.data.choices[0].message.content,
            user: false,
          };
  
          // DALL-E 이미지 생성 요청
          if (userMessage.text.toLowerCase().includes("image:")) {
            const imagePrompt = userMessage.text.replace("image:", "").trim();
            const imageResponse = await axios.post(
              "https://api.openai.com/v1/images/generations",
              {
                prompt: imagePrompt,
                n: 1,
                size: "1024x1024",
              },
              {
                headers: {
                  Authorization: `Bearer ${OPENAI_API_KEY}`,
                  "Content-Type": "application/json",
                },
              }
            );
  
            const imageUrl = imageResponse.data.data[0].url;
            botMessage.image = imageUrl;
          }
  
          this.messages.push(botMessage);
          this.scrollToBottom();
        } catch (error) {
          console.error("Error generating response:", error);
        }
      },
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      uploadImage(event) {
        const file = event.target.files[0];
        if (!file) return;
  
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageMessage = {
            text: "Uploaded Image:",
            image: e.target.result,
            user: true,
          };
          this.messages.push(imageMessage);
          this.scrollToBottom();
        };
        reader.readAsDataURL(file);
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
  
  <style>
  .content {
    width: 430px;
    height: 932px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    position: relative;
    border: 2px solid black;
  }
  
  .navigator {
    background-color: rgba(46, 72, 45, 1);
    width: 100%;
    height: 89px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  
  .chat-window {
    flex-grow: 1;
    padding: 100px 10px 70px;
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
    width: 410px;
    height: 50px;
    border-radius: 10px;
    border: none;
    margin-bottom: 20px;
  }
  
  .ai_input {
    flex-grow: 1;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    padding: 15px 10px;
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
  