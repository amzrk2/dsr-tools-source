import { lazy } from 'react';

import {
  HomeOutlined,
  InfoCircleOutlined,
  CloudSyncOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  FieldTimeOutlined,
  CalendarOutlined,
  CloudServerOutlined,
  StarOutlined,
  MacCommandOutlined,
} from '@ant-design/icons';

export default [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('@/views/Home')),
    meta: {
      name: '首页',
      icon: HomeOutlined,
    },
  },
  {
    path: '/anime',
    exact: true,
    component: lazy(() => import('@/views/Anime')),
    meta: {
      name: '番组每日放送',
      short: '每日番组',
      icon: CalendarOutlined,
    },
  },
  {
    path: '/bilive',
    exact: true,
    component: null,
    meta: {
      name: '哔哩哔哩录播地址获取工具',
      short: '哔哩哔哩录播',
      icon: CloudServerOutlined,
    },
  },
  {
    path: '/game',
    exact: true,
    meta: {
      name: '游戏工具',
      icon: PlayCircleOutlined,
    },
    routes: [
      {
        path: '/game/ffxiv',
        exact: true,
        component: lazy(() => import('@/views/Game/FFXIV')),
        meta: {
          name: 'FF14 国服狩猎车时间表',
          short: 'FF14 狩猎时间表',
          icon: FieldTimeOutlined,
        },
      },
      {
        path: '/game/minecraft',
        exact: true,
        component: null,
        meta: {
          name: 'Minecraft DSRCA 整合包',
          short: 'MC 整合包',
          icon: MacCommandOutlined,
        },
      },
      {
        path: '/game/sdv',
        exact: true,
        component: null,
        meta: {
          name: '星露谷物语 DSR 非侵入式整合包',
          short: '星露谷整合包',
          icon: StarOutlined,
        },
      },
    ],
  },
  {
    path: '/about',
    exact: true,
    meta: {
      name: '关于',
      icon: InfoCircleOutlined,
    },
    routes: [
      {
        path: '/about/changelog',
        exact: true,
        component: lazy(() => import('@/views/About/Changelog')),
        meta: {
          name: '更新记录',
          icon: CloudSyncOutlined,
        },
      },
      {
        path: '/about/info',
        exact: true,
        component: lazy(() => import('@/views/About/Info')),
        meta: {
          name: '站点信息',
          icon: FileTextOutlined,
        },
      },
    ],
  },
  {
    path: '/**',
    component: lazy(() => import('@/views/NotFound')),
    meta: {
      name: '404 NOT FOUND',
    },
  },
];
