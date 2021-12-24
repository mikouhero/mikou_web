// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from "./store/index"
import '@/common/css/index.css'
// import '@/common/css/custom.css'
import '@/common/style.css'
import axios from "axios";
import Pagination from "@/components/pagination/index.vue";

Vue.use(ElementUI)
axios.defaults.baseURL = '/api'
/* eslint-disable no-new */
Vue.component('pagination', Pagination);
Vue.use(ElementUI, { size: 'mini' })

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
