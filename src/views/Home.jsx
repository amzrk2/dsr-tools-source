import React, { useState, useEffect } from 'react';

import { Button } from 'antd';
import 'antd/lib/message/style/index.less';

import './Home.scss';
import jsdelivr from '@/utils/jsdelivr';
import { api } from '@/utils/axios';

/**
 * home page
 * @return {import('react').ReactElement}
 */
function Home() {
  const image = jsdelivr('/dsr-tools/home/cover-row.webp', 'api');
  const [data, setData] = useState({
    title: '',
    links: [],
    license: '',
  });

  useEffect(() => {
    (async () => {
      const res = await api.get('/dsr-tools/home/index.json');
      if (res.data) {
        setData(res.data);
      }
    })();
  }, []);

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

export default Home;
