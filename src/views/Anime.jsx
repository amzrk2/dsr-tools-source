import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

// import { Button } from 'antd';
// import 'antd/lib/button/style/index.less';

import './Anime.scss';
import { workers, xhr } from '@/utils/axios';
import { getLS, setLS } from '@/utils/storage';
import { BANGUMI_HASH } from '@/utils/constants';
import bangumi from '@/utils/bangumi';

/**
 * anime page
 * @returns {import('react').ReactElement}
 */
function Anime() {
  // get cdn hash data
  const [hash, setHash] = useState({});

  useEffect(() => {
    (async () => {
      /**
       * fetch bangumi hash from cdn
       */
      async function fetchHash() {
        console.log('load data from remote');
        const res = await xhr.get(BANGUMI_HASH);
        if (res.data) {
          setHash(res.data);
          setLS('bgm-cache-date', dayjs().toJSON());
          setLS('bgm-cache', res.data);
        }
      }
      /**
       * fetch bangumi hash from cache
       * @returns {Promise<boolean>}
       */
      async function fetchCache() {
        const cacheDate = getLS('bgm-cache-date');
        if (cacheDate) {
          try {
            if (dayjs().diff(dayjs(cacheDate), 'day', true) < 7) {
              console.log('load data from cache');
              const cache = getLS('bgm-cache');
              cache && setHash(cache);
              return true;
            }
          } catch {
            return false;
          }
        }
        return false;
      }

      const cacheStatus = await fetchCache();
      if (!cacheStatus) {
        await fetchHash();
      }
    })();
  }, []);

  // get anime calendar data
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      /**
       * parse bangumi api data
       * @param {Array} data
       * @returns {Array} data
       */
      function parseData(data) {
        // replace image with cdn
        data.forEach((val) => {
          val.items.forEach((val) => {
            if (val.images) {
              if (typeof val.images.common === 'string') {
                const image = bangumi(val.images.common, hash);
                val.image = image;
              } else if (typeof val.images === 'string') {
                const image = bangumi(val.images, hash);
                val.image = image;
              } else {
                val.iamge = '';
              }
              delete val.images;
              if (val.image) {
                val.image = val.image.replace('http://', 'https://');
              }
            }
          });
        });
        return data;
      }

      const res = await workers.get('/bgm/calendar');
      if (res.data) {
        const data = parseData(res.data);
        setData(data);
      }
    })();
  }, [hash]);

  return <div className='anime'>{JSON.stringify(data)}</div>;
}

export default Anime;
