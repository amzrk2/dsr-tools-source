import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Menu } from 'antd';
import 'antd/lib/menu/style/index.less';
import 'antd/lib/tooltip/style/index.less';

import './Sidebar.scss';
import useRoute from '@/hooks/useRoute';
import routes from '@/router/index';
import responsive from '@/utils/responsive';
import Logo from './Logo';

/**
 * map route to component
 * @param {Object} route
 * @param {Object} onRouteClick
 * @return {import('react').ReactElement}
 */
function mapRoute(route, onRouteClick) {
  if (route.meta.icon) {
    // with sub route
    if (route.routes && route.routes.length > 0) {
      return (
        <Menu.SubMenu key={route.path} icon={<route.meta.icon />} title={route.meta.name}>
          {route.routes.map((route) => mapRoute(route, onRouteClick))}
        </Menu.SubMenu>
      );
    }
    // no sub route
    else {
      return (
        <Menu.Item
          key={route.path}
          icon={<route.meta.icon />}
          onClick={(d) => onRouteClick(d.domEvent)}
        >
          <Link to={route.path}>{route.meta.short || route.meta.name}</Link>
        </Menu.Item>
      );
    }
  }
  // do not render hided routes
  else {
    return null;
  }
}

/**
 * navidation sidebar
 * @param {Object} props
 * @return {import('react').ReactElement}
 */
function Sidebar({ collapsed, onRouteClick }) {
  // current route
  const route = useRoute();
  // current opened group
  const active = useMemo(() => route?.path, [route?.path]);
  const [opened] = useState(() => {
    let arr = ['/' + active?.split('/')[1] || ''];
    if (responsive() !== 'lg') {
      arr = [];
    }
    return arr;
  });

  return (
    <Menu className='sidebar' mode='inline' selectedKeys={[active]} defaultOpenKeys={opened}>
      <Menu.Item className='sidebar__icon' key='icon'>
        <Logo collapsed={collapsed} />
      </Menu.Item>
      {routes.map((route) => mapRoute(route, onRouteClick))}
    </Menu>
  );
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onRouteClick: PropTypes.func.isRequired,
};

export default Sidebar;
