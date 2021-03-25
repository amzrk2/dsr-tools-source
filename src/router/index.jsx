import React from 'react';
import { lazy } from '@loadable/component';

import {
  HomeOutlined,
  InfoCircleOutlined,
  CloudSyncOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';

export default [
  {
    name: '首页',
    path: '/',
    exact: true,
    component: lazy(() => import('@/views/Home')),
    icon: <HomeOutlined />,
  },
  {
    name: '游戏工具',
    path: '/game',
    exact: true,
    icon: <PlayCircleOutlined />,
    routes: [
      {
        name: 'FF14 国服狩猎车时间表',
        short: 'FF14 狩猎时间表',
        path: '/game/ffxiv',
        exact: true,
        component: lazy(() => import('@/views/Game/FFXIV')),
        icon: <FieldTimeOutlined />,
      },
    ],
  },
  {
    name: '关于',
    path: '/about',
    exact: true,
    icon: <InfoCircleOutlined />,
    routes: [
      {
        name: '更新记录',
        path: '/about/changelog',
        exact: true,
        component: lazy(() => import('@/views/About/Changelog')),
        icon: <CloudSyncOutlined />,
      },
      {
        name: '站点信息',
        path: '/about/info',
        exact: true,
        component: lazy(() => import('@/views/About/Info')),
        icon: <FileTextOutlined />,
      },
    ],
  },
  {
    name: '404 NOT FOUND',
    path: '*',
    component: lazy(() => import('@/views/NotFound')),
    hide: true,
  },
];
