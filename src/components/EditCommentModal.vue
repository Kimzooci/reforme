<template>
  <div class="modal fade" id="comment-edit-modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">댓글 수정</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label  class="form-label" >닉네임</label>
              <input
                type="text"
                class="form-control form-control-sm"
                id="edit-comment-nickname"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">댓글 내용</label>
              <textarea
                type="text"
                class="form-control form-control-sm"
                rows="3"
                id="edit-comment-body"
              ></textarea>
            </div>
            <input type="hidden" id="edit-comment-id" />
            <input type="hidden" id="edit-comment-article-id" />
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="updateComment"
            >
              수정 완료
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import axios from "axios";

export default {
  name: "EditCommentModal",
  methods: {
    updateComment() {
      const id = document.querySelector("#edit-comment-id").value;
      const content = document.querySelector("#edit-comment-body").value;
      const secret = false; // 사용자 입력 값으로 변경해야 합니다.

      const boardId = this.$route.params.id; // 게시글 ID 추출
       const path = this.$route.path;
       let baseUrl ;

      if(path.includes("reforme"))
          baseUrl = `/reforme/board/${boardId}/comment`;
      else if(path.includes("reforyou"))
          baseUrl = `/reforme/board/${boardId}/comment`;
      const commentDto = { content , secret }
      
      
      const headers = {
        "Content-Type": "application/json", // JSON 형식으로 데이터를 전송해야 합니다.
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}` // 인증 토큰을 헤더에 추가합니다.
      };

      axios.patch(`${baseUrl}?id=${id}`, commentDto, { headers }) // 요청 URL에 쿼리 스트링을 포함합니다.
        .then(response => {
          const msg = (response.data.statusCode === 200) ? "댓글이 수정되었습니다." : "댓글 수정 실패";
          alert(msg);

          
            this.$emit('update-comment', { id, content, secret });
            const modalElement = document.getElementById('comment-edit-modal');
            const modalInstance = Modal.getInstance(modalElement);
            modalInstance.hide();

              if(path.includes("reforme"))
                this.$router.push("/reforme_page");
              else if(path.includes("reforyou"))
                this.$router.push("/reforyou_page");
          //baseUrl = `/reforme/board/${boardId}/comment`;

        })
        .catch(error => {
          console.error("댓글 수정 실패:", error);
          alert("댓글 수정에 실패했습니다: " + error.message);
        });
    }
  },
  mounted() {
    const commentEditModal = document.getElementById("comment-edit-modal");
    commentEditModal.addEventListener("show.bs.modal", (event) => {
      const triggerBtn = event.relatedTarget;
      const id = triggerBtn.getAttribute("data-bs-id");
      const nickname = triggerBtn.getAttribute("data-bs-nickname");
      const body = triggerBtn.getAttribute("data-bs-body");
      const articleId = triggerBtn.getAttribute("data-bs-article-id");

      document.querySelector("#edit-comment-nickname").value = nickname;
      document.querySelector("#edit-comment-body").value = body;
      document.querySelector("#edit-comment-id").value = id;
      document.querySelector("#edit-comment-article-id").value = articleId;
    });
  },
};
</script>

