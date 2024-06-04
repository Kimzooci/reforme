<template>
    <div class="modal fade" id="comment-edit-modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">댓글 수정</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="form-label">닉네임</label>
                            <input type="text" class="form-control form-control-sm" id="edit-comment-nickname">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">댓글 내용</label>
                            <textarea type="text" class="form-control form-control-sm" rows="3" id="edit-comment-body"></textarea>
                        </div>
                        <input type="hidden" id="edit-comment-id">
                        <input type="hidden" id="edit-comment-article-id">
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="updateComment">수정 완료</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
    name: 'EditCommentModal',
    methods: {
        updateComment() {
            const comment = {
                id: document.querySelector("#edit-comment-id").value,
                nickname: document.querySelector("#edit-comment-nickname").value,
                body: document.querySelector("#edit-comment-body").value,
                articleId: document.querySelector("#edit-comment-article-id").value
            };

            const url = `/api/comments/${comment.id}`;
            fetch(url, {
                method: "PATCH",
                body: JSON.stringify(comment),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                const msg = (response.ok) ? "댓글이 수정되었습니다." : "댓글 수정 실패";
                alert(msg);

                if (response.ok) {
                    this.$emit('update-comment', comment);
                    const modalElement = document.getElementById('comment-edit-modal');
                    const modalInstance = Modal.getInstance(modalElement);
                    modalInstance.hide();
                }
            });
        }
    },
    mounted() {
        const commentEditModal = document.getElementById('comment-edit-modal');
        commentEditModal.addEventListener('show.bs.modal', event => {
            const triggerBtn = event.relatedTarget;
            const id = triggerBtn.getAttribute('data-bs-id');
            const nickname = triggerBtn.getAttribute('data-bs-nickname');
            const body = triggerBtn.getAttribute('data-bs-body');
            const articleId = triggerBtn.getAttribute('data-bs-article-id');

            document.querySelector("#edit-comment-nickname").value = nickname;
            document.querySelector("#edit-comment-body").value = body;
            document.querySelector("#edit-comment-id").value = id;
            document.querySelector("#edit-comment-article-id").value = articleId;
        });
    }
};
</script>
