import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { Button, Layout, message, PageHeader, Popover } from 'antd';
import 'antd/lib/button/style/index.less';
import 'antd/lib/layout/style/index.less';
import 'antd/lib/message/style/index.less';
import 'antd/lib/page-header/style/index.less';
import 'antd/lib/popover/style/index.less';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShareAltOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import './Header.scss';
import QRCode from './QRCode';

function Header({ collapsed, onCollapsedChange }) {
  // time updater
  const [clock, setClock] = useState(dayjs());
  useEffect(() => {
    const timer = setInterval(() => setClock(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  // copy page link
  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => message.success('已复制链接至剪贴板'),
      () => message.error('复制链接失败')
    );
  };

  return (
    <Layout.Header className='header'>
      <PageHeader
        className='header__content'
        ghost={false}
        backIcon={
          <Button type='primary' icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
        }
        onBack={onCollapsedChange}
        title='首页'
        subTitle='DSRToolS'
        extra={[
          <Button className='header__clock' type='text' key='time'>
            {clock.format('HH:mm:ss')}
          </Button>,
          <Button
            type='primary'
            key='refresh'
            icon={<SyncOutlined />}
            onClick={() => window.location.reload()}
          />,
          <Popover
            key='share'
            trigger='click'
            content={
              <Fragment>
                <QRCode content={window.location.href} />
                <Button
                  className='header__copy'
                  type='primary'
                  block={true}
                  onClick={copyShareLink}
                >
                  复制链接
                </Button>
              </Fragment>
            }
          >
            <Button type='primary' icon={<ShareAltOutlined />} />
          </Popover>,
        ]}
      />
    </Layout.Header>
  );
}

Header.propTypes = {
  collapsed: PropTypes.bool,
  onCollapsedChange: PropTypes.func,
};

export default Header;
