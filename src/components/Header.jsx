import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { Button, message, PageHeader, Popover } from 'antd';
import 'antd/lib/button/style/index.less';
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
import useRoute from '@/hooks/useRoute';
import QRCode from './QRCode';

/**
 * custom header
 * @param {Object} props
 * @returns {import('react').ReactElement}
 */
function Header({ collapsed, onCollapsedChange }) {
  // title
  const route = useRoute();
  const title = useMemo(() => route?.meta?.name || '', [route?.meta?.name]);

  // time updater
  const [clock, setClock] = useState(dayjs());
  useEffect(() => {
    const timer = setInterval(() => setClock(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  // copy page link
  const copyShareLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(
      () => message.success('已复制链接至剪贴板'),
      () => message.error('复制链接失败')
    );
  }, []);

  return (
    <PageHeader
      className='header'
      ghost={false}
      backIcon={
        <Button type='primary' icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
      }
      onBack={onCollapsedChange}
      title={title}
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
              <QRCode className='header__qrcode' content={window.location.href} />
              <Button className='header__copy' block={true} type='primary' onClick={copyShareLink}>
                复制链接
              </Button>
            </Fragment>
          }
        >
          <Button type='primary' icon={<ShareAltOutlined />} />
        </Popover>,
      ]}
    />
  );
}

Header.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onCollapsedChange: PropTypes.func.isRequired,
};

export default Header;
