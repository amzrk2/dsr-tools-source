import React, { useState, useEffect, useCallback, memo } from 'react';

import { Button } from 'antd';
import 'antd/lib/button/style/index.less';

import './Home.scss';
import jsdelivr from '@/utils/jsdelivr';
import { api } from '@/utils/axios';

const image = jsdelivr('/dsr-tools/home/cover-row.webp', 'api');

function Home() {
  const [data, setData] = useState({
    title: '',
    links: [],
    license: '',
  });

  /**
   * fetch data from remote
   */
  const fetchData = useCallback(async () => {
    const res = await api.get('/dsr-tools/home/index.min.json');
    if (res?.data) {
      setData(res.data);
    }
  }, []);
  useEffect(() => fetchData(), [fetchData]);

  return (
    <div className='home' style={{ backgroundImage: `url(${image})` }}>
      <h1 className='home__title'>{data.title}</h1>
      <div className='home__links'>
        {data.links.map((link) => (
          <Button key={link.src} size='large' ghost={true} href={link.src} target='_blank'>
            {link.name}
          </Button>
        ))}
      </div>
      <div className='home__license'>{data.license}</div>
    </div>
  );
}

export default memo(Home);
