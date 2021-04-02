import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Logo.scss';
import jsdelivr from '@/utils/jsdelivr';

function Logo({ collapsed }) {
  return (
    <div className='logo'>
      <img
        className={classNames('logo__image', { 'logo__image--collapsed': collapsed })}
        src={jsdelivr('/dsr-tools/home/dsrca_head.webp', 'api')}
        alt='Logo'
      />
    </div>
  );
}

Logo.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

export default memo(Logo);
