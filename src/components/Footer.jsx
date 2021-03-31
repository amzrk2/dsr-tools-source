import React from 'react';
import dayjs from 'dayjs';

import { CopyrightOutlined } from '@ant-design/icons';

import './Footer.scss';
import { version } from '@/assets/changelog';
import { ReactComponent as ReactIcon } from '@/assets/svg/react.svg';

/**
 * custom footer
 * @returns {import('react').ReactElement}
 */
function Footer() {
  return (
    <div className='footer'>
      <span>DSRToolS {version}</span>
      <span>
        Copyright <CopyrightOutlined /> {dayjs().year()} DSRKafuU
      </span>
      <ReactIcon className='footer__icon' />
    </div>
  );
}

export default Footer;
