import React from 'react';
import { useHistory } from 'react-router';

import { Button, Result } from 'antd';
import 'antd/lib/button/style/index.less';
import 'antd/lib/result/style/index.less';

import { ReactComponent as ConstructionIcon } from '@/assets/svg/construction.svg';

/**
 * loading overlay
 * @return {import('react').ReactElement}
 */
function Construction() {
  const history = useHistory();

  return (
    <div className='construction'>
      <Result
        icon={<ConstructionIcon style={{ width: '12rem', height: '12rem' }} />}
        title='页面施工中'
        extra={
          <Button type='primary' onClick={() => history.goBack()}>
            返回
          </Button>
        }
      />
    </div>
  );
}

export default Construction;
