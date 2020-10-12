import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './api/common'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Chat from 'vue-beautiful-chat'

Vue.config.productionTip = false
Api.init()

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Chat)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
