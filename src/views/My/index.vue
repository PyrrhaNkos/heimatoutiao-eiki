<template>
  <div>
    <!-- 头部 -->
    <header class="header">
      <div v-if="isLogin" class="login-header">
        <van-cell title="单元格" value="内容">
          <template #title>
            <van-image
              round
              width="70"
              height="70"
              :src="$store.state.userInfo.photo"
            />
            <span>{{ $store.state.userInfo.name }}</span>
          </template>
          <button @click="$router.push('/user')">编辑按钮</button>
        </van-cell>
        <van-grid class="msg-header" :border="false">
          <van-grid-item>
            <div>
              <span>0</span>
              <p>头条</p>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div>
              <span>0</span>
              <p>粉丝</p>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div>
              <span>0</span>
              <p>关注</p>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div>
              <span>0</span>
              <p>获赞</p>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 未登录页面 -->
      <div v-else>
        <div class="to-login" @click="$router.push('/login')">
          <van-image
            round
            width="80px"
            height="80px"
            src="../../assets/images/mobile.png"
          />
          <span>登录/注册</span>
        </div>
      </div>
    </header>

    <!-- 中间部分 -->
    <main class="main">
      <!-- 收藏/历史 -->
      <van-grid clickable :column-num="2">
        <van-grid-item>
          <template #icon>
            <van-icon name="star-o" color="#eb5253" size="25"
          /></template>
          <template #text>
            <span> 收藏 </span>
          </template>
        </van-grid-item>

        <van-grid-item>
          <template #icon
            ><van-icon name="underway-o" color="#ff9d1d" size="25" />
          </template>
          <template #text>
            <span> 历史 </span>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 消息通知/小智同学 -->
      <div class="main-msg">
        <van-cell-group>
          <van-cell title="消息通知" is-link />
          <van-cell title="小智同学" is-link />
        </van-cell-group>
      </div>
    </main>

    <!-- 底部退出 -->
    <footer>
      <button v-if="isLogin" @click="logOut" class="logout-btn">退出</button>
    </footer>
  </div>
</template>
<script>
import { getUserInfo } from '@/api'
export default {
  name: '',
  data() {
    return {}
  },
  components: {},
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    logOut() {
      this.$store.commit('SET_TOKEN', {})
    },
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        this.$store.commit('SET_USERINFO', data.data)
        console.log(data)
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取用户信息失败，请刷新')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  position: relative;
  height: 440px;
  background-image: url(../../assets/images/62489764_p0.png);
  background-size: 100% 100%;
  .to-login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    span {
      font-size: 0.37333rem;
      color: rgb(150, 10, 206);
      margin-top: 0.13333rem;
      font-weight: 700;
      padding-left: 20px;
    }
  }
  .login-header {
    :deep(.van-cell) {
      position: absolute;
      top: 50%;
      transform: translateY(-70%);
      display: flex;
      align-items: center;
      background-color: transparent;
      .van-cell__title {
        display: flex;
        align-items: center;
        span {
          margin-left: 20px;
        }
      }
      button {
        background-color: transparent;
        border: 1px solid #333;
        border-radius: 15px;
        color: #000;
      }
    }
    .msg-header {
      position: absolute;
      bottom: 0;
      width: 100%;
      div {
        text-align: center;
        span {
          font-size: 10px;
        }
        p {
          font-size: 14px;
          margin: 0;
        }
      }
      :deep(.van-grid-item__content) {
        background-color: transparent;
      }
    }
  }
}
.main {
  span {
    font-size: 20px;
    color: #646566;
  }
  .main-msg {
    margin-top: 10px;
    .van-cell__title {
      span {
        color: #323233;
        font-size: 30px;
        line-height: 0.64rem;
      }
    }
  }
}
.logout-btn {
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
  border: none;
  color: red;
}
</style>
