/**
 * @param {string} key
 * @param {any} value
 */
export const setLS = (key, value) => {
  try {
    localStorage.setItem(`dsr-tools_${key}`, JSON.stringify(value));
  } catch {
    return;
  }
};

/**
 * @param {string} key
 * @returns {any}
 */
export const getLS = (key) => {
  try {
    const data = JSON.parse(localStorage.getItem(`dsr-tools_${key}`));
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
