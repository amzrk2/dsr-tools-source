import React, { Fragment } from 'react';

export default {
  show: false,
  key: 'notification-auto-redirect',
  type: 'warning',
  title: '自动路径跳转即将取消',
  content: (
    <Fragment>
      <p>在过去的行为中，对以下任一网址：</p>
      <ul>
        <li>
          <code>https://amzrk2.cc/ffxiv</code>
        </li>
        <li>
          <code>https://amzrk2.cc/game/ffxiv</code>
        </li>
        <li>
          <code>https://dsrca.amzrk2.cc/ffxiv</code>
        </li>
        <li>
          <code>https://dsrca.amzrk2.cc/game/ffxiv</code>
        </li>
      </ul>
      <p>
        的访问均会被重定向至 <code>https://tools.dsrkafuu.su/game/ffxiv</code>；
      </p>
      <p>
        该行为将在 <code>2021-04-30</code>
        被移除，请需要访问本站的用户更新收藏链接以避免链接失效。
      </p>
    </Fragment>
  ),
};
