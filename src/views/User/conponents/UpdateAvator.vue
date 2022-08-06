<template>
  <div class="update-avator">
    <img :src="photoUrl" class="img" ref="image" />

    <footer>
      <span>取消</span>
      <span @click="uploadAvator">完成</span>
    </footer>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadAvator } from '@/api'
export default {
  props: {
    photoUrl: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      myCropper: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 第一个参数 添加裁剪框的对象 第二个参数 是裁剪框的相关配置项
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    uploadAvator() {
      console.log(1)
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '图片正在上传',
          forbidClick: true
        })
        try {
          const { data } = await uploadAvator(blob)
          // 更改父组件的头像
          this.$emit('upload-avator', data.data.photo)
          // 关闭弹层
          this.$parent.$parent.isShowAvator = false
          this.$toast.success('图片上传成功')
        } catch (error) {
          this.$toast.fail('图片上传失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-avator {
  height: 100%;
  position: relative;

  .img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 65%;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 40px;
  }
}
</style>
