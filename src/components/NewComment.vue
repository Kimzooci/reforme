<template>
  <div class="card m-3" id="comments-new">
    <div class="card-body">
      <form>
        <div class="mb-3">
          <!-- <label class="form-label">닉네임</label> -->
          
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
export default {
  name: "NewComment",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newComment: {
        nickname: '',
        body: "",
        articleId: this.article.id,
        secret: false,
      },
    };
  },
  methods: {
    submitComment() {
      const commentDto = {
        content: this.newComment.body,
        secret: this.newComment.secret, // 입력에 따라 설정
      };

      const path = this.$route.path;
      let url;

      if (path.includes("reforme")) {
        url = `/reforme/board/${this.$route.params.id}/comment`;
      } else if (path.includes("reforyou")) {
        url = `/reforyou/board/${this.$route.params.id}/comment`;
      }

      axios.post(url, commentDto, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.statusCode === 200) {
          // 댓글 초기화
          this.newComment.body = "";

          // 이벤트 방출
          this.$emit('add-comment', {
            id: Date.now(), // 실제 ID는 서버 응답에서 가져와야 합니다
            nickname: this.newComment.nickname,
            body: commentDto.content,
            articleId: this.newComment.articleId
          });

          // 성공적으로 댓글을 추가하고 상세 페이지로 이동
           this.$router.push({ name: "reforme_detailPage", params: { id: this.$route.params.id } });
        } else {
          alert("댓글 작성 실패");
        }
      })
      .catch((error) => {
        alert("댓글 작성 실패: " + error.message);
      });
    },
  },
};
</script>


