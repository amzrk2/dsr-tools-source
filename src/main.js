import 'normalize.css';
import './scss/global.scss';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

import axios from './plugins/axios';
Vue.use(axios);
import message from './plugins/message';
Vue.use(message);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
