import React, { useState, useEffect, memo, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';

import { Card, List, Pagination, Button } from 'antd';
import 'antd/lib/card/style/index.less';
import 'antd/lib/list/style/index.less';
import 'antd/lib/empty/style/index.less'; // list empty
import 'antd/lib/pagination/style/index.less';
import 'antd/lib/button/style/index.less';

import './Anime.scss';
import { workers, xhr } from '@/utils/axios';
import { getLS, setLS } from '@/utils/storage';
import { BANGUMI_HASH } from '@/utils/constants';
import bangumi from '@/utils/bangumi';

/**
 * @param {number} day
 */
function formatWeekday(day) {
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
  return '星期' + (dayNames[day] || '');
}

/**
 * anime page
 * @returns {import('react').ReactElement}
 */
function Anime() {
  // get cdn hash data
  const [hash, setHash] = useState({});
  /**
   * fetch bangumi hash from cdn
   */
  const fetchHash = useCallback(async () => {
    const res = await xhr.get(BANGUMI_HASH);
    if (res.data) {
      setHash(res.data);
      setLS('bgm-cache-date', dayjs().toJSON());
      setLS('bgm-cache', res.data);
    }
  }, []);
  /**
   * fetch bangumi hash from cache
   * @returns {Promise<boolean>}
   */
  const fetchHashCache = useCallback(async () => {
    const cacheDate = getLS('bgm-cache-date');
    if (cacheDate) {
      try {
        if (dayjs().diff(dayjs(cacheDate), 'day', true) < 7) {
          const cache = getLS('bgm-cache');
          cache && setHash(cache);
          return true;
        }
      } catch {
        return false;
      }
    }
    return false;
  }, []);

  useEffect(() => {
    (async () => {
      const cacheStatus = await fetchHashCache();
      if (!cacheStatus) {
        await fetchHash();
      }
    })();
  }, [fetchHash, fetchHashCache]);

  // get anime calendar data
  const [data, setData] = useState([]);
  /**
   * parse bangumi api data
   * @param {Array} data
   * @returns {Array} data
   */
  const parseData = useCallback(
    (data) => {
      data.forEach((val) => {
        val.items.forEach((val) => {
          // replace url
          if (val.url) {
            val.url = val.url.replace('http://', 'https://');
          }
          // replace image with cdn
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
          // fix missing rating and collection
          if (!val.rating?.score) {
            val.rating = { score: 0 };
          }
          if (!val.collection?.doing) {
            val.collection = { doing: 0 };
          }
        });
      });
      data.unshift(data.pop());
      return data;
    },
    [hash]
  );

  useEffect(() => {
    (async () => {
      const res = await workers.get('/bgm/calendar');
      if (res.data) {
        const data = parseData(res.data);
        setData(data);
      }
    })();
  }, [parseData]);

  // dayjs instance
  const date = dayjs();
  const today = date.day() + 1;
  // date control
  const [day, setDay] = useState(today);

  // weekday renderers
  const display = useMemo(() => {
    const ret = [];
    data.forEach((val, idx) => {
      const items = val.items;
      const element = (
        <Card title={formatWeekday(idx)}>
          <List>
            {items.map((item) => {
              return <List.Item key={item.id}>{item.name}</List.Item>;
            })}
          </List>
        </Card>
      );
      ret.push(element);
    });
    return ret;
  }, [data]);

  // const d = [
  //   {
  //     title: 'Title 1',
  //   },
  //   {
  //     title: 'Title 2',
  //   },
  //   {
  //     title: 'Title 3',
  //   },
  //   {
  //     title: 'Title 4',
  //   },
  //   {
  //     title: 'Title 5',
  //   },
  //   {
  //     title: 'Title 6',
  //   },
  // ];
  return (
    <div className='anime'>
      <div className='weekday'>
        <Pagination
          defaultCurrent={today}
          total={7}
          pageSize={1}
          current={day}
          onChange={(day) => setDay(day)}
          itemRender={(cur, type, original) => {
            if (type === 'page') {
              if (cur - 1 === date.day()) {
                return <b>{formatWeekday(cur - 1)}</b>;
              }
              return formatWeekday(cur - 1);
            }
            return original;
          }}
        />
        <Button onClick={() => setDay(today)}>今天</Button>
      </div>

      <div className='display'>
        <div className='display-item'>{display[day - 2 < 0 ? 6 : day - 2]}</div>
        <div className='display-item'>{display[day - 1]}</div>
        <div className='display-item'>{display[day > 6 ? 0 : day]}</div>
      </div>
    </div>
  );
}

export default memo(Anime);
