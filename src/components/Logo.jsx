import React from 'react';

import './Logo.scss';
import jsdelivr from '@/utils/jsdelivr';

function Logo() {
  return (
    <div className='logo'>
      <img
        className='logo__image'
        src={jsdelivr('/dsr-tools/home/dsrca_head.webp', 'api')}
        alt='Logo'
      />
    </div>
  );
}

export default Logo;
