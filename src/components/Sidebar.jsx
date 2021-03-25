import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Menu } from 'antd';
import 'antd/lib/menu/style/index.less';
import 'antd/lib/tooltip/style/index.less';

import './Sidebar.scss';
import routes from '@/router/index';
import Logo from './Logo';

/**
 * map route to component
 * @param {Object} route
 * @return {import('react').ReactElement}
 */
function mapRoute(route) {
  if (!route.hide) {
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
          <Link to={route.path}>{route.short || route.name}</Link>
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
function Sidebar({ collapsed }) {
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
      <Menu.Item className='sidebar__icon' key='icon'>
        <Logo collapsed={collapsed} />
      </Menu.Item>
      {routes.map((route) => mapRoute(route))}
    </Menu>
  );
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

export default Sidebar;
