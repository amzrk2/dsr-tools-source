import React from 'react';
import dayjs from 'dayjs';

import { CopyrightOutlined } from '@ant-design/icons';

import './Footer.scss';
import { version } from '@/assets/changelog';
import reactIcon from '@/assets/svg/react.svg';

/**
 * custom footer
 * @return {import('react').ReactElement}
 */
function Footer() {
  return (
    <div className='footer'>
      <span>DSRToolS {version}</span>
      <span>
        Copyright <CopyrightOutlined /> {dayjs().year()} DSRKafuU
      </span>
      <img className='footer__icon' src={reactIcon} alt='React Icon' />
    </div>
  );
}

export default Footer;
