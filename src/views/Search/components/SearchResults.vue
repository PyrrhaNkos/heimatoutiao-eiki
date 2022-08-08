<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="获取失败，点击重新加载"
    >
      <van-cell v-for="item in SearchResults" :key="item.art_id">
        <template #title>
          <span>{{ item.title }}</span>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import { getSearchResApi } from '@/api'
export default {
  name: '',
  props: {
    keywords: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      SearchResults: [],
      page: 1,
      limit: 10,
      loading: false,
      finished: false,
      error: false
    }
  },
  components: {},
  computed: {},
  created() {
    this.getSearchRes()
  },
  methods: {
    async getSearchRes() {
      const { data } = await getSearchResApi({ q: this.keywords })
      console.log(data)
      this.SearchResults = data.data.results
    },
    async onLoad() {
      try {
        this.page++
        const { data } = await getSearchResApi({
          q: this.keywords,
          page: this.page,
          per_page: this.limit
        })
        const total = data.data.total_count
        if (this.page * this.limit >= total) {
          this.finished = true
          this.loading = false
          return
        }
        this.SearchResults = [...this.SearchResults, ...data.data.results]
        this.loading = false
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="" scoped></style>
