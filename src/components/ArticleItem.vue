<template>
  <!-- 无图片结构 -->
  <van-cell
    :title="articleInfo.title"
    v-if="articleInfo.cover.type === 0"
    @click="toArticleDetail(articleInfo.art_id)"
  >
    <template #label>
      <span> {{ articleInfo.aut_name }} </span>
      <span> {{ articleInfo.comm_count }} 评论</span>
      <span> {{ articleInfo.pubdate | formata }} </span>
    </template>
  </van-cell>
  <!-- 1张图片结构 -->
  <van-cell
    :title="articleInfo.title"
    value="内容"
    v-else-if="articleInfo.cover.type === 1"
    @click="toArticleDetail(articleInfo.art_id)"
  >
    <template #label>
      <span> {{ articleInfo.aut_name }} </span>
      <span> {{ articleInfo.comm_count }} 评论</span>
      <span> {{ articleInfo.pubdate | formata }} </span>
    </template>
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>
  <!-- 3张图片结构 -->
  <van-cell
    :title="articleInfo.title"
    value="内容"
    v-else
    @click="toArticleDetail(articleInfo.art_id)"
  >
    <template #label>
      <span> {{ articleInfo.aut_name }} </span>
      <span> {{ articleInfo.comm_count }} 评论</span>
      <span> {{ articleInfo.pubdate | formata }} </span>
    </template>
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
  methods: {
    toArticleDetail(id) {
      this.$router.push({
        path: '/detail',
        query: { id }
      })
    }
  }
}
</script>
<style lang="" scoped></style>
