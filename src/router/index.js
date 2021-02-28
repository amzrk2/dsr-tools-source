import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

import useVector from 'vector-tracker';

const { vecView, vecLeave } = useVector(
  '603b6904be1b2b0008e5bb6b',
  'https://analytics.appvector.icu/api'
);

// Same route error
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  // change title
  if (to.meta.name) {
    document.title = `${to.meta.name} | DSRToolS`;
  } else {
    document.title = 'DSRToolS';
  }
  // remove trailing slash
  if (to.path !== '/' && /\/$/gi.exec(to.path)) {
    const exp = /^(.*)\/$/gi.exec(to.path);
    if (exp && exp[1]) {
      next(exp[1]);
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  if (process.env.NODE_ENV === 'production') {
    if (!window._vector) {
      // if first view
      window._vector = true;
      vecView(to.path, document.referrer);
    } else {
      // report view
      vecView(to.path);
    }
    // report leave
    if (window._vector && from.name !== null) {
      vecLeave(from.path);
    }
  }
});

export default router;
