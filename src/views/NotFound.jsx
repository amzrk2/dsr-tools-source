import React from 'react';

import { Button, Result } from 'antd';
import 'antd/lib/button/style/index.less';
import 'antd/lib/result/style/index.less';

/**
 * not found page
 * @return {import('react').ReactElement}
 */
function NotFound() {
  return (
    <div className='not-found'>
      <Result
        status='warning'
        title='404 NOT FOUND'
        extra={<Button type='primary'>返回首页</Button>}
      />
    </div>
  );
}

export default NotFound;
