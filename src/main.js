import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/fonts/iconfont.css'
import 'amfe-flexible/index.min.js'
import 'github-markdown-css'
import moment from 'moment'
Vue.use(Vant)
Vue.use(moment)
Vue.config.productionTip = false

Vue.filter('formata', (time) => {
  return moment(time).fromNow()
})

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
