<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in heilightSuggestions"
      :key="index"
    >
      <template>
        <span v-html="item"> </span>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { getSuggestionsApi } from '@/api'
import { debounce } from 'lodash'
// 1.动态正则
//  - new RegExp(变量,'ig')

// 2.字符串的replace
// - 第一个参数可以是正则
// - 第二个参数可以是函数，函数的返回值是替换后的字符串
// - 函数可以接受几个参数 match:匹配到的字符
/*
  'Auglar'.replace(/a/ig,function(match){
    return `<span>${match}</span>`
  })
  <span>A</span>ugl<span>a</span>
 */
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
      suggestionsList: []
    }
  },
  components: {},
  computed: {
    heilightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      // map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
      return this.suggestionsList.map((item) =>
        item.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      )
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsApi(this.keywords)
        console.log(data)
        this.suggestionsList = data.data.options.filter(Boolean) // 等同于filter(item=>Boolean(item)) Boolean强转为布尔值 配合filter去除数组中的假值
      } catch (error) {
        this.$toast.fail('获取搜索建议失败')
      }
    }, 500)
  },
  watch: {
    keywords: {
      immediate: true, // 父组件计算属性渲染搜索建议组件时，keywords已经变化了，无法监听到，此时需要立即监听
      handler() {
        this.getSuggestions()
      }
    }
  }
}
</script>
<style lang="" scoped></style>
