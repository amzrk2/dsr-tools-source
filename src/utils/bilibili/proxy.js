const API_URL = 'https://api.live.bilibili.com/xlive/web-room/v1';
const ALLOWED_ORIGIN = [
  /^https?:\/\/tools\.dsrkafuu\.su/,
  /^https?:\/\/dsr-tools-bili\.dsrkafuu\.workers\.dev/,
  /^https?:\/\/localhost/,
];

/**
 * 验证 Origin
 * @param {Request} request
 */
function validateOrigin(request) {
  const origin = request.headers.get('Origin');
  if (origin) {
    for (let i = 0; i < ALLOWED_ORIGIN.length; i++) {
      if (ALLOWED_ORIGIN[i].exec(origin)) {
        return true; // 通过
      }
    }
  }
  return false; // 拒绝所有无 Origin 请求
}

/**
 * 添加 CORS 头
 * @param {Request} request 源请求
 */
async function handleRequest(request) {
  const rawURL = new URL(request.url);
  const rawOrigin = request.headers.get('Origin');
  const rawPathname = rawURL.pathname;
  const rawSearchParams = rawURL.searchParams;

  const reqURL = new URL(API_URL);
  reqURL.pathname = reqURL.pathname + rawPathname;
  for (const [key, value] of rawSearchParams) {
    reqURL.searchParams.append(key, value);
  } // 迁移 searchParams

  request = new Request(reqURL, request); // 覆盖源 request
  request.headers.set('Origin', reqURL.origin); // 伪装 Origin

  let res = await fetch(request); // 获取响应
  res = new Response(res.body, res); // 覆盖响应 response
  res.headers.set('Access-Control-Allow-Origin', rawOrigin); // 设置 CORS 头
  res.headers.append('Vary', 'Origin'); // 设置 Vary 头使浏览器正确进行缓存
  return res;
}

addEventListener('fetch', (event) => {
  // 获取请求的信息
  const request = event.request;
  // 验证和解析
  const validOrigin = validateOrigin(request);
  if (validOrigin) {
    event.respondWith(handleRequest(request));
  } else {
    event.respondWith(new Response('[bilibili-proxy] request not allowed', { status: 403 }));
  }
});
