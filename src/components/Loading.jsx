import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Spin } from 'antd';
import 'antd/lib/spin/style/index.less';

import './Loading.scss';

function Loading({ loading, children }) {
  if (loading) {
    return (
      <div className='loading'>
        <div className='loading__overlay'>
          <Spin size='large' />
        </div>
        {loading ? null : children}
      </div>
    );
  } else {
    return children;
  }
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.element,
};

export default memo(Loading);
