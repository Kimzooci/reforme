<template>
  <div class="card m-3" id="comments-new">
    <div class="card-body">
      <form>
        <div class="mb-3">
          <label class="form-label">{{ nickname }}</label>
        </div>
        <div class="mb-3">
          <label class="form-label">댓글 내용</label>
          <textarea
            class="form-control form-control-sm"
            v-model="newComment.body"
            rows="3"
            id="new-comment-body"
          ></textarea>
        </div>
        <input
          type="hidden"
          v-if="article"
          v-model="newComment.articleId"
          id="new-comment-article-id"
        />
        <button
          type="button"
          class="btn btn-outline-primary btn-sm"
          @click="submitComment"
          id="comment-create-btn"
        >
          댓글 작성
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "NewComment",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters(["getUserId"]), // Vuex getters 매핑
  },
  data() {
    return {
      newComment: {
        nickname: this.getUserId,
        body: "",
        articleId: this.article.id,
        secret: false,
      },
    };
  },
  methods: {
    submitComment() {
      //if (this.newComment.nickname.trim() && this.newComment.body.trim()) {

      // this.$emit("add-comment", {
      //   content: this.newComment.body,
      //   articleId: this.article.id,
      // });
      const commentDto = {
        content: this.newComment.body,
        secret: false, // 혹은 필요한 값으로 설정
      };

      const path = this.$route.path;
      let url;

      if (path.includes("reforme")) {
        url = `/reforme/board/${this.$route.params.id}/comment`;
      } else if (path.includes("reforyou")) {
        url = `/reforyou/board/${this.$route.params.id}/comment`;
      }

      axios
        .post(url, commentDto, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.statusCode === 200) {
            // this.comments.push({
            //   id: response.data.data.id,
            //   content: this.newComment,
            // });
            this.newComment = "";
          } else {
            alert("댓글 작성 실패");
          }
        })
        .catch((error) => {
          alert("댓글 작성 실패: " + error.message);
        });
      this.$emit("add-comment", {
        id: Date.now(),
        nickname: this.newComment.nickname,
        body: this.newComment.body,
        articleId: this.article.id,
      });
      //this.newComment.nickname = "";
      this.newComment.body = "";
      //}
    },
  },
};
</script>


