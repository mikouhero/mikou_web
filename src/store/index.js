import vue from 'vue'
import vuex from 'vuex'
import Logger from 'vuex/dist/logger'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
vue.use(vuex)

const debuger = process.env.NODE_ENV !== 'production'

const store = new vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: false,
  plugins: debuger ? [Logger()] : []
})

export default store