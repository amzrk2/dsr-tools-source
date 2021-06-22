import { RESPONSIVE_LG, RESPONSIVE_MD } from './constants';

/**
 * check responsive status
 * @returns {'lg'|'md'|'sm'}
 */
export default () => {
  const width = window.innerWidth || document.documentElement.clientWidth;
  if (!width) {
    return 'lg';
  }
  if (width > RESPONSIVE_LG) {
    return 'lg';
  } else if (width > RESPONSIVE_MD) {
    return 'md';
  } else {
    return 'sm';
  }
};
