/**
 * resolve cdn path
 * @param {string} src
 * @param {string} type
 */
export default (src, repo, version = '1') => {
  if (repo) {
    return `https://cdn.jsdelivr.net/gh/dsrkafuu/${repo}@${version}${src}`;
  }
  return 'https://example.org';
};
