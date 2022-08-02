<template>
  <!-- 无图片结构 -->
  <van-cell
    :title="articleInfo.title"
    :label="label"
    v-if="articleInfo.cover.type === 0"
  />
  <!-- 1张图片结构 -->
  <van-cell
    :title="articleInfo.title"
    value="内容"
    :label="label"
    v-else-if="articleInfo.cover.type === 1"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>
  <!-- 3张图片结构 -->
  <van-cell :title="articleInfo.title" value="内容" :label="label" v-else>
    <van-image
      width="100"
      height="100"
      :src="item"
      v-for="(item, index) in articleInfo.cover.images"
      :key="index"
    />
  </van-cell>
</template>
<script>
export default {
  name: '',
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  components: {},
  computed: {
    label() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  },
  methods: {}
}
</script>
<style lang="" scoped></style>
