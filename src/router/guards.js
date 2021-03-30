import { aoView, aoLeave } from '@/plugins/aofuji';

/**
 * @param {Object} to
 * @param {Object} from
 * @param {Function} next
 */
function guard(to, from, next) {
  // report leave first
  if (window._aofuji) {
    aoLeave(from.location.pathname);
  }
  // then report view
  if (!window._aofuji) {
    // if first view
    window._aofuji = true;
    aoView(to.location.pathname, document.referrer);
  } else {
    aoView(to.location.pathname);
  }

  next();
}

export default [guard];
