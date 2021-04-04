import React, { useCallback, useEffect, useState, memo } from 'react';

import { Layout } from 'antd';
import 'antd/lib/layout/style/index.less';
import 'antd/lib/alert/style/index.less';

import './App.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Router from './router/Router';
import Footer from './components/Footer';
import responsive from './utils/responsive';
import { throttle } from './utils/performance';
import { NotificationBanner } from './views/Notification';

const App = memo(function App() {
  // dynamic height for support of mobile devices
  const [height, setHeight] = useState(() =>
    window.innerHeight ? `${window.innerHeight}px` : '100vh'
  );

  // sidebar collapsed (tablet) or minimal (mobile) mode
  const [collapsed, setCollapsed] = useState(() => responsive() !== 'lg');
  const [minimal, setMinimal] = useState(() => responsive() === 'sm');

  // react screen size change
  useEffect(() => {
    const resizeHandler = throttle(() => {
      setHeight(window.innerHeight ? `${window.innerHeight}px` : '100vh');
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
    <Layout className='app' style={{ height }}>
      <Layout.Sider
        collapsed={collapsed}
        collapsedWidth={minimal ? 0 : 80}
        width={220}
        style={{ height }}
      >
        <Sidebar collapsed={collapsed} onRouteClick={doCollapse} />
      </Layout.Sider>
      <Layout onClick={doCollapse} style={{ height }}>
        <NotificationBanner />
        <Layout.Header className='header__layout'>
          <Header collapsed={collapsed} onCollapsedChange={switchCollapse} />
        </Layout.Header>
        <Layout.Content className='content__layout'>
          <Router />
          <Footer />
        </Layout.Content>
      </Layout>
    </Layout>
  );
});

export default App;
