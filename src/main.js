// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store/store'
import moment from 'moment'
import VeeValidate from 'vee-validate'


Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.config.productionTip = false


Vue.filter('timeAgo', function(date){
  return moment(date).fromNow()
})

Vue.filter('sliceAndDice', function(string){
  return `${string.slice(0,250)} ... `
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
