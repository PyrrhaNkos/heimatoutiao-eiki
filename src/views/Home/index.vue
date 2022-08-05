<template>
  <div>
    <!-- 头部搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          round
          class="search-btn"
          icon="search"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 频道导航栏 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in myChannels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>

    <!-- 频道弹层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-popup
        :myChannels="myChannels"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></channel-popup>
    </van-popup>
  </div>
</template>
<script>
import {
  getMyChannel as getMyChannelApi,
  delChannel,
  addChannel,
  setMyChannelsTolocal,
  getMyChannelsBylocal
} from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelPopup from './components/ChannelPopup.vue'
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      myChannels: [],
      show: false
    }
  },
  created() {
    this.initMyChannel()
  },
  components: { ArticleList, ChannelPopup },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    // 初始化我的频道
    initMyChannel() {
      // 用户登录了
      if (this.isLogin) {
        // -发送请求获取线上频道
        this.getMyChannel()
      } else {
        //  用户未登录
        if (getMyChannelsBylocal()) {
          // -本地有数据，读取本地
          this.myChannels = getMyChannelsBylocal()
        } else {
          // -本地无数据，重新发请求获取默认频道
          this.getMyChannel()
        }
      }
    },
    async getMyChannel() {
      try {
        const res = await getMyChannelApi()
        this.myChannels = res.data.data.channels
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取频道失败，请刷新')
      }
    },
    // 删除频道
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除频道...',
        forbidClick: true
      })
      try {
        const newChannels = this.myChannels.filter((item) => {
          return item.id !== id
        })
        if (this.isLogin) {
          await delChannel(id)
        } else {
          setMyChannelsTolocal(newChannels)
        }
        this.myChannels = newChannels
        this.$toast.success('删除成功')
      } catch (error) {
        this.$toast.fail('删除失败')
      }
    },
    // 添加频道
    async addChannel(channel) {
      this.$toast.loading({
        message: '正在添加频道...',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          // 线上添加
          await addChannel(channel.id, this.myChannels.length)
        } else {
          setMyChannelsTolocal([...this.myChannels, channel])
        }

        // 视图更新
        this.myChannels.push(channel)
        this.$toast.success('添加成功')
      } catch (error) {
        this.$toast.fail('添加失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.navbar {
  position: sticky;
  top: 0;
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  z-index: 99;
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  // opacity: 0.6;
  border-bottom: 1px solid #eee;
  position: fixed;
  top: 92px;
  background-color: #fff;
  z-index: 999;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}
</style>
