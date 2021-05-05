import React, { memo } from 'react';

import { CopyrightOutlined } from '@ant-design/icons';

import './Footer.scss';
import dayjs from '@/utils/dayjs';
import { version } from '@/assets/changelog';
import { ReactComponent as ReactIcon } from '@/assets/svg/react.svg';

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

export default memo(Footer);
