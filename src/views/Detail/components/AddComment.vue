<template>
  <div class="comment-post">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button type="default" @click="sendComment">发布</van-button>
  </div>
</template>
<script>
import { postCommentsApi } from '@/api'
export default {
  name: 'AddComment',
  props: {
    id: {
      type: String,
      required: true
    },
    art_id: {
      type: String
    }
  },
  data() {
    return {
      message: ''
    }
  },
  components: {},
  computed: {},
  methods: {
    async sendComment() {
      try {
        this.$toast.loading({
          message: '正在发布评论',
          forbidClick: true
        })
        if (this.id.length <= 4) {
          const { data } = await postCommentsApi({
            target: this.id, // 文章ID
            content: this.message
          })
          const item = data.data.new_obj
          this.$emit('addComment', item)
        } else {
          const { data } = await postCommentsApi({
            target: this.id, // 评论ID
            content: this.message,
            art_id: this.art_id // 文章ID
          })
          const item = data.data.new_obj
          this.$emit('addCommentPage')
          this.$bus.$emit('addReplyCount', this.id)
          this.$bus.$emit('addCommentList', item)
        }
        this.message = ''
        this.$toast.success('评论成功')
      } catch (error) {
        this.$toast.fail('评论失败，请刷新后重试')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
  :deep(.van-cell) {
    flex: 17.5;
    background-color: #f5f7f9;
  }
  :deep(.van-button) {
    flex: 2.5;
    border: none;
    .van-button__text {
      color: #6ba3d8 !important;
    }
  }
}
</style>
