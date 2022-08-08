<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        background="#3296FA"
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      />
    </form>
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-results></search-results> -->
    <!-- 动态组件实现多个组件的条件渲染 -->
    <component
      :is="componentName"
      :keywords="keywords"
      :keywordsList="keywordsList"
      @delKeywords="delKeywords"
      @delAll="delAll"
      @onSearch="onSearch"
    ></component>
  </div>
</template>
<script>
import SearchHistory from './components/SearchHistory'
import SearchResults from './components/SearchResults'
import SearchSuggestion from './components/SearchSuggestion'
import { getHistory, setHistory } from '@/utils/auth'
export default {
  name: '',
  data() {
    return {
      keywords: '',
      isShowResults: false, // 设置一个变量，储存是否进入搜索结果展示
      keywordsList: getHistory() || []
    }
  },
  components: { SearchHistory, SearchResults, SearchSuggestion },
  computed: {
    componentName() {
      if (!this.keywords) {
        // 展示搜索历史
        return SearchHistory
      }
      if (this.isShowResults) {
        // 展示搜索结果
        return SearchResults
      }
      // 展示搜索建议
      return SearchSuggestion
    }
  },
  methods: {
    onSearch(key) {
      console.log('正在搜索')
      this.keywords = key
      // 用户搜索了，改为true，显示搜索结果
      this.isShowResults = true
      const index = this.keywordsList.indexOf(this.keywords)
      if (index === -1) {
        this.keywordsList.unshift(this.keywords)
        setHistory(this.keywordsList)
        return
      }
      this.keywordsList.splice(index, 1)
      this.keywordsList.unshift(this.keywords)
      setHistory(this.keywordsList)
    },
    onSearchFocus() {
      // 如果keywords为'' 显示搜索历史
      // 如果keywords存值 显示搜索建议
      this.isShowResults = false // 利用计算属性依赖值变化则重新计算的特性
    },
    delKeywords(index) {
      this.keywordsList.splice(index, 1)
      setHistory(this.keywordsList)
    },
    delAll() {
      this.keywordsList = []
      setHistory(this.keywordsList)
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  .van-search__action {
    color: #fff;
  }
}
</style>
