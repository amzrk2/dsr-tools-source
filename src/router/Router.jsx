import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import routes from './index';

// wrapper for handling sub-routes
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact || false}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

RouteWithSubRoutes.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  component: PropTypes.func.isRequired,
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
