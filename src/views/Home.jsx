import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from 'antd';
import 'antd/lib/button/style/index.less';

import './Home.scss';
import jsdelivr from '@/utils/jsdelivr';
import { api } from '@/utils/axios';

const imageRow = jsdelivr('/dsr-tools/home/cover_row.jpg', 'dsr-cdn-api');
const imageCol = jsdelivr('/dsr-tools/home/cover_col.jpg', 'dsr-cdn-api');

function Home({ isMobile }) {
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
    <div
      className={classNames('home', { 'home--mobile': isMobile })}
      style={{ backgroundImage: `url(${isMobile ? imageCol : imageRow})` }}
    >
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

Home.propTypes = {
  isMobile: PropTypes.bool,
};

export default memo(Home);
