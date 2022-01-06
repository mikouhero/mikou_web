import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import ERR404 from '@/view/layout/404.vue'
import Index from '@/view/layout/index.vue'
import adminUser from './adminUser'
import adminRole from './adminRole'
import menu from './menu'
import schedule from './schedule'



Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/404',
    component: ERR404,
    name: '404',
    leaf: true,
    hidden: true,
  },
  ...adminUser,
  ...adminRole,
  ...menu,
  ...schedule
]

export { routes }

export default new Router({
  routes
})
