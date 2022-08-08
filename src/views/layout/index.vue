<template>
  <div>
    <transition name="bounce">
      <router-view></router-view>
    </transition>
    <van-tabbar class="footer-content" route>
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="item.to"
      >
        <template #icon>
          <span :class="`toutiao ${item.icon}`"
            ><p>{{ item.text }}</p></span
          >
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      tabbarData: [
        {
          to: '/ ',
          icon: 'toutiao-shouye1',
          text: '首页'
        },
        {
          to: '/video',
          icon: 'toutiao-shipin',
          text: '视频'
        },
        {
          to: '/qa',
          icon: 'toutiao-wenda',
          text: '问答'
        },
        {
          to: '/my',
          icon: 'toutiao-wode',
          text: '我的'
        }
      ]
    }
  },
  components: {},
  computed: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.footer-content {
  text-align: center;
  height: 70px;
  padding-top: 30px;
  p {
    font-size: 22px;
    margin-top: 6px;
  }
  .toutiao {
    font-size: 40px;
  }
}
.bounce-enter-active {
  animation: bounce-in 1s;
}
@keyframes bounce-in {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0px);
  }
}
</style>
