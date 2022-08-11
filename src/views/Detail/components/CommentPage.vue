<template>
  <div>
    <van-nav-bar
      :title="commentList.length ? `${commentList.length}条回复` : '暂无回复'"
    />
    <CommentItem :comment="commentItem"></CommentItem>
    <van-cell title="全部回复" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      offset="0"
      :error.sync="error"
      error-text="评论获取失败，点击重新加载"
      class="reply-list"
    >
      <CommentList
        :commentList="commentList"
        :showCommentPage="showCommentPage"
      ></CommentList>
    </van-list>

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
import { getArticleCommentsApi } from '@/api'
export default {
  name: '',
  props: {
    commentList: {
      // 二级评论列表
      type: Array,
      default: () => []
    },
    id: {
      // 评论ID
      type: String,
      required: true
    },
    art_id: {
      // 所属文章ID
      type: String,
      required: true
    },
    // 当前评论项
    commentItem: {
      type: Object
    },
    // 控制回复按钮点击状态
    showCommentPage: {
      type: Boolean
    }
  },
  data() {
    return {
      showAddComment: false,
      loading: false,
      finished: false,
      error: false
    }
  },
  components: { CommentList, AddComment, CommentItem },
  computed: {},
  methods: {
    addCommentPage() {
      this.showAddComment = false
    },
    async onLoad() {
      const index = this.commentList.length - 1
      try {
        const { data } = await getArticleCommentsApi({
          type: 'c',
          source: this.id,
          offset: this.commentList[index].com_id,
          limit: 3
        })
        if (
          !data.data.results ||
          data.data.total_count <= this.commentList.length
        ) {
          this.finished = true
          this.loading = false
          return
        }
        this.$parent.$parent.commentList = [
          ...this.$parent.$parent.commentList,
          ...data.data.results
        ]
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.comment-btn {
  position: fixed;
  bottom: 0;
}
.reply-list {
  margin-bottom: 110px;
}
</style>
