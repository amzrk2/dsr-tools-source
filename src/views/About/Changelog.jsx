import React, { memo } from 'react';

import { Timeline } from 'antd';
import 'antd/lib/timeline/style/index.less';

import './Changelog.scss';
import { changelog } from '@/assets/changelog';

function Changelog() {
  return (
    <div className='changelog'>
      <Timeline className='changelog__list' mode='left'>
        {changelog.map((item, idx) => (
          <Timeline.Item label={item.date} key={item.version} color={idx === 0 ? 'green' : 'blue'}>
            <p>{item.version}</p>
            {item.logs.map((t, idx) => (
              <p key={idx}>{t}</p>
            ))}
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
}

export default memo(Changelog);
