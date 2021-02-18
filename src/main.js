import 'normalize.css';
import './scss/global.scss';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
Vue.config.productionTip = false;

import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import { version } from './assets/changelog';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    Vue,
    dsn: 'https://9c3ce0eb84764dbabc65508570b46ec4@o526740.ingest.sentry.io/5642179',
    tracesSampleRate: 1.0,
    integrations: [new Integrations.BrowserTracing()],
    release: `dsr-tools@${/^v([0-9.]*)-?/.exec(version)[1]}`,
  });
}

import axios from './plugins/axios';
Vue.use(axios);
import message from './plugins/message';
Vue.use(message);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
