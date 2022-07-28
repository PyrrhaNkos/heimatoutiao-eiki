<template>
  <div>
    <!-- 登录页面 -->
    <!-- 头部区域 -->
    <van-nav-bar title="登录" />

    <!-- 用户名密码 -->
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>

      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button>发送验证码</van-button>
        </template>
      </van-field>

      <div style="margin: 0.42rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { mobileRules, codeRules } from './rules'
import { loginApi } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules
    }
  },
  methods: {
    async onSubmit(values) {
      try {
        const res = await loginApi(values)
        console.log(res) //res是axios封装的对象（存着服务端返回的数据），同时也是promise的resolve的值
        this.$toast.success('登录成功')
      } catch (error) {
        //error同上， 是promise的reject的值
        console.log(error);
        const status = error.response.status
        let message = '请重新登录'

        if (status === 400) {
          message = error.response.data.message
        }

        this.$toast.fail(message)
      }
    }
  }
}
</script>
<style lang="less" scoped>
//样式穿透 :deep
:deep(.van-nav-bar__content) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
}
.toutiao {
  font-size: 40px;
}
:deep(.from) {
  .van-field__label {
    flex: 1;
  }
  .van-field__value {
    flex: 20;
  }
}
</style>
