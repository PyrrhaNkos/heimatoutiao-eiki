<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      :default-index="userInfo.gender"
      @confirm="onConfirm"
      @cancel="onCancel"
      ref="gender"
    />
  </div>
</template>
<script>
import { uploadProfile } from '@/api'
export default {
  name: '',
  data() {
    return {
      columns: ['男', '女'],
      userInfo: this.$store.state.userInfo
    }
  },
  components: {},
  computed: {},
  methods: {
    async onConfirm() {
      //   console.log(this.$refs.gender.getIndexes())
      this.$toast.loading({
        message: '正在修改性别',
        forbidClick: true
      })
      try {
        const index = this.$refs.gender.getIndexes()[0]
        this.userInfo.gender = index
        this.$store.commit('SET_USERINFO', this.userInfo)
        await uploadProfile({
          gender: index
        })
        this.$parent.$parent.showGender = false
        this.$toast.success('修改性别成功')
      } catch (error) {
        this.$toast.success('修改性别失败')
      }
    },
    onCancel() {
      this.$parent.$parent.showGender = false
    }
  }
}
</script>
<style lang="" scoped></style>
