<template>
  <div>
    <transition name="bounce">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {}
  },
  components: {},
  computed: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.bounce-enter-active {
  animation: bounce-in 1s;
}
@keyframes bounce-in {
  0% {
    transform: translate3d(-100%, 0, 0);
  }

  100% {
    transform: translate3d(0px, 0, 0);
  }
}
</style>
