<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        class="edit-btn"
        round
        size="small"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>

    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannels"
        :key="item.id"
        :text="item.name"
        :class="['mychannel-item', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recommend-item"
        @click="$emit('add-channel', item)"
      />
    </van-grid>
  </div>
</template>
<script>
import { getAllChannels as getAllChannelsApi } from '@/api'
export default {
  props: {
    myChannels: {
      type: Array,
      require: true
    }
  },
  name: '',
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  components: {},
  // return this.allChannels.filter(
  //   (aItem) => !this.myChannels.find((mItem) => aItem.id === mItem.id)
  // )
  computed: {
    recommendChannels() {
      return this.allChannels.reduce((newArr, nextAitem) => {
        const item = this.myChannels.find((mItem) => mItem.id === nextAitem.id)
        if (!item) {
          newArr.push(nextAitem)
        }
        // newArr.push(item)
        // console.log(item)
        return newArr
      }, [])
    }
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelsApi()
      console.log(data)
      this.allChannels = data.data.channels
    },
    changeActive(index, item) {
      if (this.isEdit) {
        if (item.name === '推荐') return
        // 删除我的频道功能
        this.$emit('del-channel', item.id)
      } else {
        // 关闭弹窗
        this.$parent.$parent.show = false
        // 切换tab active
        this.$emit('change-active', index)
      }
    }
  },
  created() {
    this.getAllChannels()
  }
}
</script>
<style lang="less" scoped>
.channel {
  padding-top: 1.3333rem;
  .edit-btn {
    width: 102px;
    height: 48px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  .recommend-item {
    :deep(.van-grid-item__content) {
      flex-direction: row;
    }
    :deep(.van-grid-item__icon) {
      font-size: 40px;
    }
    :deep(.van-grid-item__text) {
      margin-top: 0.02rem;
    }
  }
  :deep(.mychannel-item) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(45%, -50%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
  .active {
    :deep(.van-grid-item__text) {
      color: red;
    }
  }
}
</style>
