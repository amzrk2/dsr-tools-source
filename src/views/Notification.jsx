import React, { memo, useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import { Button, Result, Alert, Typography, Space } from 'antd';
import 'antd/lib/button/style/index.less';
import 'antd/lib/result/style/index.less';
import 'antd/lib/alert/style/index.less';
import 'antd/lib/typography/style/index.less';
import 'antd/lib/space/style/index.less';

import { setLS, getLS } from '@/utils/storage';
import notification from '@/notification';
const { show, key, type, title, content } = notification;

export const NotificationBanner = memo(function NotificationBanner() {
  const history = useHistory();

  const [showBanner, setShowBanner] = useState(show && !getLS(key));
  const closeBanner = useCallback(() => {
    setShowBanner(false);
    setLS(key, true);
  }, []);

  if (showBanner) {
    return (
      <Alert
        type={type}
        message={title}
        banner={true}
        action={
          <Space>
            <Button size='small' onClick={() => history.push('/notification')}>
              了解详情
            </Button>
            <Button size='small' danger={true} onClick={closeBanner}>
              忽略通知
            </Button>
          </Space>
        }
      />
    );
  } else {
    return null;
  }
});

const Notification = memo(function Notification() {
  const history = useHistory();

  return (
    <div className='notification'>
      <Result
        type={type}
        title={title}
        extra={
          <Button type='primary' onClick={() => history.goBack()}>
            返回
          </Button>
        }
      >
        <Typography>{content}</Typography>
      </Result>
    </div>
  );
});

export default Notification;
