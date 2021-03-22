import React, { useState, useEffect } from 'react';
import { Layout, PageHeader, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import 'antd/lib/layout/style/index.less';
import 'antd/lib/page-header/style/index.less';
import 'antd/lib/button/style/index.less';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import './App.scss';
import responsive from './utils/responsive';
import { throttle } from './utils/performance';

function App() {
  // sidebar collapsed (tablet) or minimal (mobile) mode
  const [collapsed, setCollapsed] = useState(() => responsive() === 'md');
  const [minimal, setMinimal] = useState(() => responsive() === 'sm');

  // react screen size change
  useEffect(() => {
    const resizeHandler = throttle(() => {
      setCollapsed(responsive() === 'md');
      setMinimal(responsive() === 'sm');
    });
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <Layout className='app'>
      <Sider collapsed={collapsed || minimal} collapsedWidth={minimal ? 0 : 60}>
        Sider
      </Sider>
      <Layout>
        <Header className='header'>
          <PageHeader
            className='header__content'
            ghost={false}
            backIcon={
              <Button
                type='primary'
                icon={collapsed || minimal ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
            }
            onBack={() => setCollapsed((val) => !val)}
            title='首页'
            subTitle='DSRToolS'
            extra={[
              <Button type='primary' key='share'>
                Share
              </Button>,
            ]}
          />
        </Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
