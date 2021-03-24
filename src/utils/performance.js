/**
 * @param {Function} func
 * @param {number} delay
 */
export const throttle = (func, delay = 300) => {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func(...args);
        timer = null;
      }, delay);
    }
  };
};

/**
 * @param {Function} func
 * @param {number} delay
 */
export const debounce = (func, delay = 300) => {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
