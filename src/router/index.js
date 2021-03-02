import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

import useVector from 'vector-tracker';

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

const { vecView, vecLeave } = useVector(
  '603e00eb53cb27529085714f',
  'https://analytics.appvector.icu/api'
);

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
// leave when page unload
// [safari fix]
// safari doesn't fire the `visibilitychange` and `beforeunload`
// when navigating away from a document
window.addEventListener('pagehide', () => {
  vecLeave(window.location.pathname);
});

export default router;
