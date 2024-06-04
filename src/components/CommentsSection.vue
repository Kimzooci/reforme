<template>
    <div>
        <comments-list :comments="commentsList" @delete-comment="deleteComment"></comments-list>
        <new-comment @add-comment="addComment" :article="article"></new-comment>
        <edit-comment-modal @update-comment="updateComment"></edit-comment-modal>
    </div>
</template>

<script>
import CommentsList from './CommentList.vue';
import NewComment from './NewComment.vue';
import EditCommentModal from './EditCommentModal.vue';
import axios from 'axios';

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
            commentsList: [],
        };
    },
    created() {
        this.fetchPostData();
    },
    methods: {
        fetchPostData() {
            const path = this.$route.path;
            let url = (path.includes("/reforme") ? `/reforme` : `/reforyou`) + `/board/${this.$route.params.id}`;
            axios.get(url)
                .then(response => {
                    if (response.data.statusCode === 200) {
                        this.commentsList = response.data.data.comments;
                    } else {
                        alert("댓글을 불러오는데 실패했습니다.");
                    }
                })
                .catch(error => {
                    console.error("댓글 불러오기 오류:", error);
                    alert("댓글을 불러오는데 실패했습니다: " + error.message);
                });
        },
        addComment(newComment) {
            this.commentsList.push(newComment);
        },
        updateComment(updatedComment) {
            const index = this.commentsList.findIndex(comment => comment.id === updatedComment.id);
            if (index !== -1) {
                this.commentsList.splice(index, 1, updatedComment);
            }
        },
        deleteComment(id) {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            };
            axios.delete(`${this.$route.path.includes('reforme') ? '/reforme' : '/reforyou'}/board/${this.$route.params.id}/comment`, { params: { id }, headers })
                .then(response => {
                    if (response.status === 200) {
                        this.commentsList = this.commentsList.filter(comment => comment.id !== id);
                        alert("댓글이 성공적으로 삭제되었습니다.");
                    } else {
                        alert("댓글 삭제에 실패했습니다.");
                    }
                })
                .catch(error => {
                    console.error("댓글 삭제 오류:", error);
                    alert("댓글 삭제에 실패했습니다: " + error.message);
                });
        }
    }
};
</script>