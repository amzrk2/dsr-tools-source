import React from 'react';

import './Footer.scss';
import { version } from '@/assets/changelog';

function Footer() {
  return (
    <div className='footer'>
      <span>DSRToolS</span>
      <span>{version}</span>
    </div>
  );
}

export default Footer;
