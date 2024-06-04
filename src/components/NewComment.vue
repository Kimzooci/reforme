<template>
    <div class="card m-3" id="comments-new">
        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label class="form-label">닉네임</label>
                    <input type="text" class="form-control form-control-sm" v-model="newComment.nickname" id="new-comment-nickname">
                </div>
                <div class="mb-3">
                    <label class="form-label">댓글 내용</label>
                    <textarea class="form-control form-control-sm" v-model="newComment.body" rows="3" id="new-comment-body"></textarea>
                </div>
                <input type="hidden" v-if="article" v-model="newComment.articleId" id="new-comment-article-id">
                <button type="button" class="btn btn-outline-primary btn-sm" @click="submitComment" id="comment-create-btn">댓글 작성</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewComment',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            newComment: {
                nickname: '',
                body: '',
                articleId: this.article.id
            }
        };
    },
    methods: {
        submitComment() {
            if (this.newComment.nickname.trim() && this.newComment.body.trim()) {
                this.$emit('add-comment', {
                    id: Date.now(),
                    nickname: this.newComment.nickname,
                    body: this.newComment.body,
                    articleId: this.article.id
                });
                this.newComment.nickname = '';
                this.newComment.body = '';
            }
        }
    }
};
</script>
