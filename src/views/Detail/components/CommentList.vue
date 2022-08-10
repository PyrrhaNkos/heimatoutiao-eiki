<template>
  <div>
    <CommentItem
      v-for="(item, index) in commentList"
      :key="index"
      :comment="item"
    ></CommentItem>
  </div>
</template>
<script>
import CommentItem from './CommentItem'
export default {
  name: 'CommentList',
  props: {
    commentList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  components: { CommentItem },
  computed: {},
  created() {
    console.log(this.commentList)
  },
  methods: {}
}
</script>
<style lang="" scoped></style>
