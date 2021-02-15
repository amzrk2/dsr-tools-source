/**
 * @param {string} path
 * @param {string} repo
 * @param {string} version
 */
function CDN(path, repo = 'dsr-api', version = '1.1') {
  const base = `https://cdn.jsdelivr.net/gh/amzrk2/${repo}@${version}`;

  let exp = /^\.?\/?(.*)/.exec(path);
  let cleanPath;
  if (exp && exp[1]) {
    cleanPath = exp[1];
  }

  if (process.env.NODE_ENV === 'production') {
    return cleanPath ? `${base}/${cleanPath}` : path;
  } else {
    console.info(`try fetching '${cleanPath}' from ${repo}@${version}`);
    return `/mock/${path}`;
  }
}

export default CDN;
