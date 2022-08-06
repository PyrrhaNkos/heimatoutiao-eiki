<template>
  <div>
    <!-- 头部 -->
    <header>
      <div v-if="isLogin">
        登录页面
        <button @click="$router.push('/user')">编辑按钮</button>
      </div>
      <div v-else>未登录页面</div>
    </header>

    <!-- 中间部分 -->
    <main>收藏/历史/消息通知/小智同学</main>

    <!-- 底部退出 -->
    <footer>
      <button v-if="isLogin" @click="logOut">退出</button>
    </footer>
  </div>
</template>
<script>
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
  methods: {
    logOut() {
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>
<style lang="" scoped></style>
