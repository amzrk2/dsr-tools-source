import React, { useEffect, useState } from 'react';

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

function App() {
  // sidebar collapsed (tablet) or minimal (mobile) mode
  const [collapsed, setCollapsed] = useState(() => responsive() !== 'lg');
  const [minimal, setMinimal] = useState(() => responsive() === 'sm');

  // react screen size change
  useEffect(() => {
    const resizeHandler = throttle(() => {
      setCollapsed(responsive() !== 'lg');
      setMinimal(responsive() === 'sm');
    });
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <Layout className='app'>
      <Layout.Sider
        className='sidebar__layout'
        collapsed={collapsed}
        collapsedWidth={minimal ? 0 : 80}
      >
        <Sidebar />
      </Layout.Sider>
      <Layout>
        <Affix className='header__affix'>
          <Layout.Header className='header__layout'>
            <Header collapsed={collapsed} onCollapsedChange={() => setCollapsed((val) => !val)} />
          </Layout.Header>
        </Affix>
        <Layout.Content className='content__layout'>
          <Router />
        </Layout.Content>
        <Layout.Footer className='footer__layout'>
          <Footer />
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default App;
