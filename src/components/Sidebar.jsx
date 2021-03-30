import React from 'react';
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
 * @return {import('react').ReactElement}
 */
function mapRoute(route) {
  if (route.meta.icon) {
    // with sub route
    if (route.routes && route.routes.length > 0) {
      return (
        <Menu.SubMenu key={route.path} icon={route.meta.icon} title={route.meta.name}>
          {route.routes.map((route) => mapRoute(route))}
        </Menu.SubMenu>
      );
    }
    // no sub route
    else {
      return (
        <Menu.Item key={route.path} icon={route.meta.icon}>
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
function Sidebar({ collapsed }) {
  // current route
  const route = useRoute();
  // current opened group
  const active = route?.path;
  let opened = ['/' + active?.split('/')[1] || ''];
  if (responsive() === 'md') {
    opened = [];
  }

  return (
    <Menu className='sidebar' mode='inline' selectedKeys={[active]} defaultOpenKeys={opened}>
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
