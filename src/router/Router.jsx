import React, { Fragment, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Spin } from 'antd';
import 'antd/lib/spin/style/index.less';

import routes from './index';

/**
 * route loading indicator
 * @return {import('react').ReactElement}
 */
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

/**
 * flatten routes
 * @param {Array<Object>} routes
 * @return {Array<Object>}
 */
function flattenRoutes(routes) {
  return routes.reduce((preItem, item) => {
    return preItem.concat(Array.isArray(item.routes) ? flattenRoutes(item.routes) : item);
  }, []);
}
const flatRoutes = flattenRoutes(routes);

/**
 * app router
 * @return {import('react').ReactElement}
 */
function Router() {
  return (
    <Switch>
      {flatRoutes.map((route) => (
        <Route
          key={route.path}
          exact={route.exact || false}
          path={route.path}
          render={(props) => (
            <Fragment>
              <Helmet>
                <title>{route.name} | DSRToolS</title>
              </Helmet>
              <Suspense fallback={<RouteLoading />}>
                <route.component {...props} />
              </Suspense>
            </Fragment>
          )}
        />
      ))}
    </Switch>
  );
}

export default Router;
