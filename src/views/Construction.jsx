import React from 'react';
import { useHistory } from 'react-router';

import { Button, Result } from 'antd';
import 'antd/lib/button/style/index.less';
import 'antd/lib/result/style/index.less';

import constructionIcon from '@/assets/svg/construction.min.svg';

/**
 * loading overlay
 * @return {import('react').ReactElement}
 */
function Construction() {
  const history = useHistory();

  return (
    <div className='construction'>
      <Result
        icon={<img style={{ width: '20%' }} src={constructionIcon} alt='Under COnstruction' />}
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
