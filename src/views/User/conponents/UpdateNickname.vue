<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-cell>
      <van-field
        v-model="nickName"
        rows="2"
        autosize
        type="textarea"
        maxlength="15"
        placeholder="请输入留言"
        show-word-limit
        ref="username"
      />
    </van-cell>
  </div>
</template>
<script>
import { uploadProfile } from '@/api'
export default {
  name: '',
  data() {
    return {
      nickName: this.$store.state.userInfo.name,
      userInfo: this.$store.state.userInfo
    }
  },
  components: {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$parent.$parent.showNickname = false
      this.nickName = this.$store.state.userInfo.name
    },
    async onClickRight() {
      console.log(this.$refs.username) // 只能分别存用户信息了//坚持用v-model
      this.$toast.loading({
        message: '正在修改昵称',
        forbidClick: true
      })
      try {
        this.userInfo.name = this.$refs.username.value
        this.$store.commit('SET_USERINFO', this.userInfo)
        await uploadProfile({
          name: this.$store.state.userInfo.name
        })
        this.$parent.$parent.showNickname = false
        this.$toast.success('修改昵称成功')
      } catch (error) {
        this.$toast.success('修改昵称失败')
      }
    }
  }
}
</script>
<style lang="" scoped></style>
