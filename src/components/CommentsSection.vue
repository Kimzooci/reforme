<template>
    <div>
        <comments-list :comments="comments" @delete-comment="deleteComment"></comments-list>
        <new-comment @add-comment="addComment" :article="article"></new-comment>
        <edit-comment-modal @update-comment="updateComment"></edit-comment-modal>
    </div>
</template>

<script>
import CommentsList from './CommentList.vue';
import NewComment from './NewComment.vue';
import EditCommentModal from './EditCommentModal.vue';

export default {
    name: 'CommentsSection',
    components: {
        CommentsList,
        NewComment,
        EditCommentModal
    },
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            comments: [
                { id: 1, nickname: 'User1', body: 'This is a comment.', articleId: 1 },
                { id: 2, nickname: 'User2', body: 'This is another comment.', articleId: 1 }
            ],
        };
    },
    methods: {
        addComment(newComment) {
            this.comments.push(newComment);
        },
        updateComment(updatedComment) {
            const index = this.comments.findIndex(comment => comment.id === updatedComment.id);
            if (index !== -1) {
                this.comments.splice(index, 1, updatedComment);
            }
        },
        deleteComment(commentId) {
            const url = `/api/comments/${commentId}`;
            fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                const msg = (response.ok) ? "댓글이 삭제되었습니다." : "댓글 삭제 실패";
                alert(msg);

                if (response.ok) {
                    this.comments = this.comments.filter(comment => comment.id !== commentId);
                }
            });
        }
    }
};
</script>
