import React, { useCallback, useEffect, useState, memo } from 'react';

import { Affix, Layout } from 'antd';
import 'antd/lib/affix/style/index.less';
import 'antd/lib/layout/style/index.less';

import './App.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Router from './router/Router';
import Footer from './components/Footer';
import responsive from './utils/responsive';
import { throttle } from './utils/performance';

/**
 * root app component
 * @returns {import('react').ReactElement}
 */
function App() {
  // sidebar collapsed (tablet) or minimal (mobile) mode
  const [collapsed, setCollapsed] = useState(() => responsive() !== 'lg');
  const [minimal, setMinimal] = useState(() => responsive() === 'sm');

  // react screen size change
  useEffect(() => {
    const resizeHandler = throttle(() => {
      setMinimal(responsive() === 'sm');
    });
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  /**
   * collapse navbar when route change/click out on mobile
   * @param {Event} e
   */
  const doCollapse = useCallback((e) => {
    if (responsive() === 'sm') {
      e.stopPropagation();
      setCollapsed(true);
    }
  }, []);
  /**
   * switch collapse status when click button
   * @param {Event} e
   */
  const switchCollapse = useCallback((e) => {
    // prevent immedate sidebar collapse when click show button
    e.stopPropagation();
    setCollapsed((val) => !val);
  }, []);

  return (
    <Layout className='app'>
      <Layout.Sider
        className='sidebar__layout'
        collapsed={collapsed}
        collapsedWidth={minimal ? 0 : 80}
        width={220}
      >
        <Sidebar collapsed={collapsed} onRouteClick={doCollapse} />
      </Layout.Sider>
      <Layout onClick={doCollapse}>
        <Affix className='header__affix'>
          <Layout.Header className='header__layout'>
            <Header collapsed={collapsed} onCollapsedChange={switchCollapse} />
          </Layout.Header>
        </Affix>
        <Layout.Content className='content__layout'>
          <Router />
          <Footer />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default memo(App);
