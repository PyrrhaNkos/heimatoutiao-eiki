<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      ref="birthday"
      @confirm="confirm"
      @cancel="cancel"
    />
  </div>
</template>
<script>
import { uploadProfile } from '@/api'
export default {
  name: '',
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.$store.state.userInfo.birthday),
      userInfo: this.$store.state.userInfo
    }
  },
  components: {},
  computed: {},
  methods: {
    async confirm() {
      this.$toast.loading({
        message: '正在修改生日',
        forbidClick: true
      })
      try {
        const date = this.$refs.birthday.getPicker().getValues().join('-')
        this.userInfo.birthday = date
        this.$store.commit('SET_USERINFO', this.userInfo)
        await uploadProfile({
          birthday: date
        })
        this.$parent.$parent.showBirthday = false
        this.$toast.success('修改生日成功')
      } catch (error) {
        console.log(error)
        this.$toast.success('修改生日失败')
      }
    },
    cancel() {
      this.$parent.$parent.showBirthday = false
    }
  }
}
</script>
<style lang="" scoped></style>
