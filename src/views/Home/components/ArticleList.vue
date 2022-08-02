<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多内容了"
        :error.sync="error"
        error-text="文章获取失败，点击重新加载"
      >
        <article-Item
          v-for="item in articleList"
          :key="item.art_id"
          :articleInfo="item"
        ></article-Item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticleApi } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: '',
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  data() {
    return {
      articleList: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  components: { ArticleItem },
  computed: {},
  created() {
    this.getFirstArticle()
  },
  methods: {
    async getFirstArticle() {
      try {
        const { data } = await getArticleApi(this.id, +new Date())
        this.articleList = data.data.results
        console.log(data)
        // 保存下一页的时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.$toast.fail('请刷新重新获取文章')
      }
    },
    async loadNextPageArticle() {
      try {
        // if (Math.random() > 0.5) {   //错误测试
        //   console.log(a)
        // }
        // console.log('加载下一页数据')
        // 1.发送请求
        const { data } = await getArticleApi(this.id, this.pre_timestamp)
        console.log(data)
        const timestamp = data.data.pre_timestamp
        if (timestamp === null) {
          this.finished = true
        }
        // 2.存储数据
        if (this.refreshing) {
          this.articleList = [...data.data.results, ...this.articleList]
        } else {
          this.articleList = [...this.articleList, ...data.data.results]
        }

        // 3.保存时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // 4.改变loading 继续请求下一页
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>
<style lang="" scoped></style>
