import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Spin } from 'antd';
import 'antd/lib/spin/style/index.less';

import routes from './index';

// route loading indicator
function RouteLoading() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin delay={1000} size='large' />
    </div>
  );
}

// wrapper for handling sub-routes
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact || false}
      render={(props) => (
        <Suspense fallback={<RouteLoading />}>
          <route.component {...props} routes={route.routes} />
        </Suspense>
      )}
    />
  );
}

RouteWithSubRoutes.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

function Router() {
  return (
    <Switch>
      {routes.map((route, idx) => (
        <RouteWithSubRoutes key={idx} {...route} />
      ))}
    </Switch>
  );
}

export default Router;
