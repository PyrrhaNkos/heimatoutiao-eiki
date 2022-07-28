import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login';

Vue.use(VueRouter)


//一级路由渲染在App
const routes = [
  {
    path:'/login',
    //路由懒加载，路径改变时再去请求页面，优化首屏加载速度
    component:()=> import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
