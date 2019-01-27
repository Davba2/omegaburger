import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import router from './routes'

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
