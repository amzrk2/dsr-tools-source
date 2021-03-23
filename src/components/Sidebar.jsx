import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Menu } from 'antd';
import 'antd/lib/menu/style/index.less';
import 'antd/lib/tooltip/style/index.less';

import './Sidebar.scss';
import routes from '@/router/index';

/**
 * map route to component
 * @param {Object} route
 * @return {import('react').ReactElement}
 */
function mapRoute(route) {
  if (route.icon) {
    // with sub route
    if (route.routes && route.routes.length > 0) {
      return (
        <Menu.SubMenu key={route.path} icon={route.icon} title={route.name}>
          {route.routes.map((route) => mapRoute(route))}
        </Menu.SubMenu>
      );
    }
    // no sub route
    else {
      return (
        <Menu.Item key={route.path} icon={route.icon}>
          <Link to={route.path}>{route.name}</Link>
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
 * @return {import('react').ReactElement}
 */
function Sidebar() {
  // current location
  const loc = useLocation();
  // current opened group
  const openKey = `/${loc.pathname.split('/')[1] || ''}`;

  return (
    <Menu
      className='sidebar'
      mode='inline'
      selectedKeys={[loc.pathname]}
      defaultOpenKeys={[openKey]}
    >
      {routes.map((route) => mapRoute(route))}
    </Menu>
  );
}

export default Sidebar;
