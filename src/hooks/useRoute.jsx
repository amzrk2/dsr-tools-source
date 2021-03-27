import { useLocation } from 'react-router-dom';
import minimatch from 'minimatch';

import routes from '@/router/index';

/**
 * recursively match routes
 * @param {Array<Object>} routes
 * @param {string} path
 * @return {Object|null}
 */
function matchRoute(routes, path) {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const pattern = route.path;
    if (minimatch(path, pattern)) {
      return route;
    }
    // recursive match
    if (route.routes) {
      for (let j = 0; j < route.routes.length; j++) {
        const match = matchRoute(route.routes, path);
        if (match) {
          return match;
        }
      }
    }
  }
  return null;
}

// match cache
const cache = Object.create(null);

export default function useRoute() {
  const location = useLocation();
  const path = location.pathname;
  if (cache[path]) {
    return cache[path];
  } else {
    const matched = matchRoute(routes, location.pathname);
    cache[path] = matched;
    return matched;
  }
}
