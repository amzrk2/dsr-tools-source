import React, { Fragment, Suspense, memo } from 'react';
import { Switch } from 'react-router-dom';
import { GuardedRoute } from 'react-router-guards';
import { Helmet } from 'react-helmet';

import { Spin } from 'antd';
import 'antd/lib/spin/style/index.less';

import './Router.scss';
import routes from './index';
import Construction from './Construction';
import ErrorBoundary from './ErrorBoundary';

/**
 * flatten routes
 * @param {Array<Object>} routes
 * @returns {Array<Object>}
 */
function flattenRoutes(routes) {
  return routes.reduce((preItem, item) => {
    return preItem.concat(Array.isArray(item.routes) ? flattenRoutes(item.routes) : item);
  }, []);
}
const flatRoutes = flattenRoutes(routes);

/**
 * app router
 * @returns {import('react').ReactElement}
 */
function Router(props) {
  return (
    <Switch>
      {flatRoutes.map((route) => (
        <GuardedRoute
          key={route.path}
          exact={route.exact || false}
          path={route.path}
          meta={route.meta}
          render={() => (
            <Fragment>
              <Helmet>
                <title>{route.meta?.name || ''} | DSRToolS</title>
              </Helmet>
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div className='router__loading'>
                      <Spin delay={500} size='large' />
                    </div>
                  }
                >
                  {/* show construction when in prod and not finished */}
                  {!route.component || (import.meta.env.PROD && route.meta.dev) ? (
                    <Construction {...props} />
                  ) : (
                    <route.component {...props} />
                  )}
                </Suspense>
              </ErrorBoundary>
            </Fragment>
          )}
        />
      ))}
    </Switch>
  );
}

export default memo(Router);
