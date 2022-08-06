<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="nav-bar"
    />
    <!-- accept限制上传文件的类型  hidden隐藏input表单-->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width=".8rem" height=".8rem" :src="userInfo.photo" />
      <input
        type="file"
        hidden
        accept=".jpg,.png,.jpeg"
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>

    <!-- 图片弹层 -->
    <van-popup
      v-model="isShowAvator"
      closeable
      :style="{ height: '100%', width: '100%' }"
      class="avator-popup"
    >
      <update-avator
        :photoUrl="photoUrl"
        v-if="isShowAvator"
        -
        @upload-avator="userInfo.photo = $event"
      ></update-avator>
    </van-popup>
  </div>
</template>
<script>
import { getUserInfo } from '@/api'
import { resolveToBase64 } from '@/utils/index'
import UpdateAvator from './conponents/UpdateAvator'

export default {
  name: '',
  data() {
    return {
      userInfo: {},
      isShowAvator: false,
      photoUrl: ''
    }
  },
  components: { UpdateAvator },
  computed: {},
  created() {
    this.getUserInfo()
  },

  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(data)
      } catch (error) {
        this.$toast.fail('获取用户信息失败，请刷新')
      }
    },
    async selectPhoto(e) {
      /*
      用户选择图片后如何显示图片?
      // 1. 获取file对象  --> e.target.files
      // 2. 把file对象转成img的src可识别的格式
      //    - objectUrl  --> URL.createObjectUrl(file对象)
      // - 缺点: 内存泄露  因为跟document绑定在一起
      // - 优点: 写法简单
      //    - Base64   --> FileReader(读文件对象)
      // - fr.readAsDataURL(file)
      // - fr.onload = (e)=>{  e.target.result  }
      */

      // 1.获取用户选择的图片的文件对象
      // - e.target触发事件的元素
      // - 原型对象上有个files属性（伪数组），存储用户选择的所有的文件对象
      // console.dir(e.target)
      // const file = e.target.files[0]

      // 2.把file文件对象处理成img标签可识别的url
      // - URL.createObjectURL(file对象)
      // const url = window.URL.createObjectURL(file)  内存泄漏的风险

      // BASE64
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (el) => {
      //   this.photoUrl = el.target.result
      //   console.log(el.target)
      //   e.target.value = ''
      //   this.isShowAvator = true
      // }

      // 3.传递url
      // this.photoUrl = url

      // // 4.置空input的value值，使得每次选择都能触发change事件
      // e.target.value = ''

      // // 选择图片 触发input change事件 展示头像弹层
      // this.isShowAvator = true

      // 封装为promise用法
      const file = e.target.files[0]
      const url = await resolveToBase64(file)
      this.photoUrl = url

      e.target.value = ''

      this.isShowAvator = true
    }
  }
}
</script>
<style lang="less" scoped>
:deep(.nav-bar) {
  .van-nav-bar__content {
    background-color: #3296fa;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.avator-popup {
  background-color: #000;
}
</style>
