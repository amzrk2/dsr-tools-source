/**
 * @param {Function} func
 * @param {number} delay
 */
export const throttle = (func, delay = 300) => {
  let timer = null;
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        func();
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
  return () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      func();
      timer = null;
    }, delay);
  };
};
