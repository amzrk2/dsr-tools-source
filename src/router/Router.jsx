import React, { Fragment, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { GuardedRoute } from 'react-router-guards';
import { Helmet } from 'react-helmet';

import { Spin } from 'antd';
import 'antd/lib/spin/style/index.less';

import routes from './index';
import Construction from '@/views/Construction';

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
      <Spin delay={500} size='large' />
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
        <GuardedRoute
          key={route.path}
          exact={route.exact || false}
          path={route.path}
          meta={route.meta}
          render={(props) => (
            <Fragment>
              <Helmet>
                <title>{route.meta?.name || ''} | DSRToolS</title>
              </Helmet>
              <Suspense fallback={<RouteLoading />}>
                {/* show construction when in prod and not finished */}
                {!route.component || (import.meta.env.PROD && route.meta.dev) ? (
                  <Construction {...props} />
                ) : (
                  <route.component {...props} />
                )}
              </Suspense>
            </Fragment>
          )}
        />
      ))}
    </Switch>
  );
}

export default Router;
