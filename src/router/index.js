import { lazy } from '@loadable/component';

export default [
  {
    path: '/',
    component: lazy(() => import('@/views/Home')),
    exact: true,
  },
  {
    path: '/about',
    component: lazy(() => import('@/views/About')),
    exact: true,
  },
  {
    path: '*',
    component: lazy(() => import('@/views/NotFound')),
  },
];
