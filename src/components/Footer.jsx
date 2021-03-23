import React from 'react';
import dayjs from 'dayjs';

import { CopyrightOutlined } from '@ant-design/icons';

import './Footer.scss';
import { version } from '@/assets/changelog';

function Footer() {
  return (
    <div className='footer'>
      <span>DSRToolS {version}</span>
      <span>
        Copyright <CopyrightOutlined /> {dayjs().year()} DSRKafuU
      </span>
    </div>
  );
}

export default Footer;
