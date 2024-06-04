<template>
    <div>
        <comments-list :comments="commentsList" @delete-comment="deleteComment"></comments-list>
        <new-comment @add-comment="addComment" :user_id="commentsList.nickname" :article="article"></new-comment>
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
    created(){this.fetchPostData()},
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
            commentsList:[],
        };
    },
    methods: {
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
            this.commentsList = response.data.data.comments;
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
        addComment(newComment) {
            this.comments.push(newComment);
        },
        updateComment(updatedComment) {
            const index = this.comments.findIndex(comment => comment.id === updatedComment.id);
            if (index !== -1) {
                this.comments.splice(index, 1, updatedComment);
            }
        },
        deleteComment(id) {
         //const path = this.$route.path
         const boardId = this.$route.params.id;
         const params = { id };
         const headers = {
         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
        //  let url;
    //   if (path.includes("/reforme")) {
    //     url = `../../reforme/board/${commentId}/comment`;
    //   } else if (path.includes("reforyou")) {
    //     url = `../../reforyou/board/${commentId}/comment`;
    //   }
            
axios.delete('/reforme/board/' + boardId + '/comment', { params, headers })
        // axios.
        //     delete(url, {
        //     }).then(response => {
        //         const msg = (response.ok) ? "댓글이 삭제되었습니다." : "댓글 삭제 실패";
        //         alert(msg);

            
        //     });
        }
    }
};
</script>
