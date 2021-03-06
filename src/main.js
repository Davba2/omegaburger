import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import router from './routes'
import { L } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import Vuex from 'vuex';
import {store} from './store/store'
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.config.productionTip = false
//
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
new Vue({
  render: h => h(App),
  L,
  store,
  router,
}).$mount('#app')
