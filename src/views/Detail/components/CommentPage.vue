<template>
  <div>
    <van-nav-bar
      :title="commentList.length ? `${commentList.length}条回复` : '暂无回复'"
    />
    <CommentItem :comment="commentItem"></CommentItem>
    <van-cell title="全部回复" />
    <CommentList :commentList="commentList"></CommentList>
    <van-button
      type="primary"
      size="large"
      round
      class="comment-btn"
      @click="showAddComment = true"
      >评论</van-button
    >
    <van-popup
      position="bottom"
      :style="{ height: '22%' }"
      v-model="showAddComment"
    >
      <AddComment
        :id="id"
        :art_id="art_id"
        @addCommentPage="addCommentPage"
      ></AddComment>
    </van-popup>
  </div>
</template>
<script>
import CommentList from './CommentList'
import AddComment from './AddComment'
import CommentItem from './CommentItem'
export default {
  name: '',
  props: {
    commentList: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      required: true
    },
    art_id: {
      type: String,
      required: true
    },
    commentItem: {
      type: Object
    }
  },
  data() {
    return {
      showAddComment: false
    }
  },
  components: { CommentList, AddComment, CommentItem },
  computed: {},
  methods: {
    addCommentPage() {
      this.showAddComment = false
    }
  }
}
</script>
<style lang="less" scoped>
.comment-btn {
  position: fixed;
  bottom: 0;
}
</style>
