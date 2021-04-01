/*! Bangumi-OSS | Copyright (c) czy0729 */

const HOST_CDN = 'https://cdn.jsdelivr.net';
const I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');

/**
 * @param {string|Array} input
 * @returns {string}
 */
function hash(input) {
  let hash = 5381;
  let i = input.length - 1;
  if (typeof input == 'string') {
    for (; i > -1; i -= 1) hash += (hash << 5) + input.charCodeAt(i);
  } else {
    for (; i > -1; i -= 1) hash += (hash << 5) + input[i];
  }
  let value = hash & 0x7fffffff;
  let retValue = '';
  do {
    retValue += I64BIT_TABLE[value & 0x3f];
  } while ((value >>= 6));
  return retValue;
}

const subjectCache = Object.create(null);
/**
 * @param {string} src
 * @param {Object} HASH_SUBJECT
 * @returns {string}
 */
const CDN_OSS_SUBJECT = (src, HASH_SUBJECT) => {
  if (!src || typeof src !== 'string') {
    return src;
  }
  if (subjectCache[src]) {
    return subjectCache[src];
  }

  // format src
  let _src = src.split('?')[0];
  _src = _src.replace('http://', 'https://');

  // https image hash with quality `/c/`
  const _hash = hash(_src);
  if (_hash in HASH_SUBJECT) {
    const path = _hash.slice(0, 1).toLocaleLowerCase();
    const cdnSrc = `${HOST_CDN}/gh/czy0729/Bangumi-OSS@master/data/subject/c/${path}/${_hash}.jpg`;
    subjectCache[src] = cdnSrc;
    return cdnSrc;
  }
  subjectCache[src] = src;
  return src;
};

export default CDN_OSS_SUBJECT;
