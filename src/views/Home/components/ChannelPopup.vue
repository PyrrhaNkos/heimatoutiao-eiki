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
        v-for="value in 6"
        :key="value"
        text="文字"
        class="mychannel-item"
      >
        <template #icon>
          <van-icon name="cross" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="value in 6"
        :key="value"
        text="文字"
        icon="plus"
        class="recommend-item"
      />
    </van-grid>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      isEdit: false
    }
  },
  components: {},
  computed: {},
  methods: {}
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
}
</style>
