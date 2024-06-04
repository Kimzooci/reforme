<template>
    <div>
        <div v-for="comment in comments" :key="comment.id" class="card m-3" :id="'comment-' + comment.id">
            <div class="card-header">
                {{ comment.nickname }}
            </div>
            <div class="card-body">
                {{ comment.body }}
                <button type="button"
                    class="btn btn-sm btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#comment-edit-modal"
                    :data-bs-id="comment.id"
                    :data-bs-nickname="comment.nickname"
                    :data-bs-body="comment.body"
                    :data-bs-article-id="comment.articleId">수정</button>
                <button type="button"
                    class="btn btn-sm btn-outline-danger comment-delete-btn"
                    @click="deleteComment(comment.id)">삭제</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CommentsList',
    props: {
        comments: {
            type: Array,
            required: true
        }
    },
    methods: {
        deleteComment(commentId) {
            this.$emit('delete-comment', commentId);
        }
    },
    updated() {
        
    },


};
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;
    padding: 10px;
}
</style>
