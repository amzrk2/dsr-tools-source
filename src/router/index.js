import Home from '@/views/Home';
import About from '@/views/About';
import NotFound from '@/views/NotFound';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/about',
    component: About,
    exact: true,
  },
  {
    path: '*',
    component: NotFound,
  },
];
