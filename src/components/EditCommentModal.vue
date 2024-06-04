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
import axios from 'axios';

export default {
    name: 'EditCommentModal',
    methods: {
        updateComment() {
    const commentId = document.querySelector("#edit-comment-id").value;
    const content = document.querySelector("#edit-comment-body").value;
    const secret = false;  // secret 값을 받지 않는 UI 디자인이라면, 해당 부분은 고정값 또는 추가 입력 필드가 필요할 수 있습니다.

    const boardId = this.$route.params.id; // 게시글 ID 추출
    const baseUrl = `/reforme/board/${boardId}/comment`;

    const params = new URLSearchParams();
    params.append('id', commentId);
    params.append('content', content);
    if (secret) {
        params.append('secret', secret);
    }

    axios.patch(`${baseUrl}?${params.toString()}`, null, { // 데이터 본문은 생략하고, 쿼리 스트링으로 모든 데이터 전달
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        const msg = (response.status === 200) ? "댓글이 수정되었습니다." : "댓글 수정 실패";
        alert(msg);

        if (response.status === 200) {
            this.$emit('update-comment', { id: commentId, content, secret });
            const modalElement = document.getElementById('comment-edit-modal');
            const modalInstance = Modal.getInstance(modalElement);
            modalInstance.hide();
        }
    });
}


    
}

  
    ,
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
