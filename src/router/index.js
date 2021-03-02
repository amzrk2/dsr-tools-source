import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

import useAofuji from 'aofuji-tracker';

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

if (process.env.NODE_ENV === 'production') {
  const aoid = process.env.VUE_APP_AOID;
  const { aoView, aoLeave } = useAofuji(aoid, 'https://demo.aofuji.ink/api');

  // route view and leave
  router.afterEach((to, from) => {
    if (process.env.NODE_ENV === 'production') {
      if (!window._vector) {
        // if first view
        window._vector = true;
        aoView(to.path, document.referrer);
      } else {
        // report view
        aoView(to.path);
      }
      // report leave
      if (window._vector && from.name !== null) {
        aoLeave(from.path);
      }
    }
  });

  // leave when page unload
  // [safari fix]
  // safari doesn't fire the `visibilitychange` and `beforeunload`
  // when navigating away from a document
  window.addEventListener('pagehide', () => {
    aoLeave(window.location.pathname);
  });
}

export default router;
