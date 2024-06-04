<template>
    <div>
        <div v-for="comment in post.comments" :key="comment.id" class="card m-3" :id="'comment-' + comment.id">
            <div class="card-header">
                {{ comment.nickname }}
            </div>
            <div class="card-body">
                {{ comment.content }}
                <button type="button"
                    class="btn btn-sm btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#comment-edit-modal"
                    :data-bs-id="comment.id"
                    :data-bs-nickname="comment.nickname"
                    :data-bs-body="comment.content"
                    :data-bs-article-id="comment.articleId">수정</button>
                <button type="button"
                    class="btn btn-sm btn-outline-danger comment-delete-btn"
                    @click="deleteComment(comment.id)">삭제</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    
    name: 'CommentsList',
    data(){
        return {
                post:[],
                
    }
    },
    props: {
        comments: {
            type: Array,
            required: true
        }
    },
    methods: {
        deleteComment(commentId) {
            this.$emit('delete-comment', commentId);
        },

        fetchPostData() {
      //this.param = this.$route.params.id;

      const path = this.$route.path;
      let url;
      if (path.includes("/reforme")) {
        url = `/reforme/board/${this.$route.params.id}`;
      } else if (path.includes("reforyou")) {
        url = `/reforyou/board/${this.$route.params.id}`;
      }

    axios
        .get(url)
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.post = response.data.data;
            //alert("댓글 불러오기 성공")
            //this.comments = response.data.data.comments;
          } else {
            alert("수정해야될 데이터 불러오기 실패");
          }
        })
        .catch((error) => {
          alert("수정해야될 데이터 불러오기 실패: " + error.message);
        });
    },
    },
    created(){
        console.log("created ccc")
        this.fetchPostData();
        },
    updated() {
    console.log("updated ccc")
        //this.fetchPostData();
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
