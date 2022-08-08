<template>
  <div>
    <van-cell title="搜索历史">
      <van-icon name="delete-o" v-if="!isDel" @click="isDel = true" />
      <div v-else>
        <span @click="delAll">全部删除&nbsp;&nbsp;</span>
        <span @click="isDel = false">完成</span>
      </div>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in keywordsList"
      :key="index"
      @click="onSearch(item)"
    >
      <van-icon name="close" v-if="isDel" @click="delKeywords(index)" />
    </van-cell>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    keywordsList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isDel: false
    }
  },
  components: {},
  computed: {},
  methods: {
    delKeywords(index) {
      console.log(index)
      this.$emit('delKeywords', index)
    },
    delAll() {
      this.$emit('delAll')
    },
    onSearch(key) {
      this.$emit('onSearch', key)
    }
  }
}
</script>
<style lang="" scoped></style>
