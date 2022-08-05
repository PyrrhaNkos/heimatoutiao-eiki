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
      />
    </form>
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-results></search-results> -->
    <!-- 动态组件实现多个组件的条件渲染 -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>
<script>
import SearchHistory from './components/SearchHistory'
import SearchResults from './components/SearchResults'
import SearchSuggestion from './components/SearchSuggestion'
export default {
  name: '',
  data() {
    return {
      keywords: '',
      isShowResults: false // 设置一个变量，储存是否进入搜索结果展示
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
    onSearch() {
      console.log('正在搜索')
      // 用户搜索了，改为true，显示搜索结果
      this.isShowResults = true
    },
    onSearchFocus() {
      console.log(1)
      // 如果keywords为'' 显示搜索历史
      // 如果keywords存值 显示搜索建议
      this.isShowResults = false // 利用计算属性依赖值变化则重新计算的特性
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
