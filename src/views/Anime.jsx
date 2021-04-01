import React, { useState, useEffect, memo, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';

import { Card, List, Pagination, Button, Image, Rate } from 'antd';
import 'antd/lib/card/style/index.less';
import 'antd/lib/list/style/index.less';
import 'antd/lib/empty/style/index.less'; // list empty
import 'antd/lib/pagination/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/image/style/index.less';
import 'antd/lib/rate/style/index.less';
import { FireOutlined } from '@ant-design/icons';

import './Anime.scss';
import { workers } from '@/utils/axios';
import responsive from '@/utils/responsive';
import { throttle } from '@/utils/performance';

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
  // get anime calendar data
  const [data, setData] = useState([]);
  /**
   * parse bangumi api data
   * @param {Array} data
   * @returns {Array} data
   */
  const parseData = useCallback((data) => {
    data.forEach((val) => {
      val.items.forEach((val) => {
        // replace url
        if (val.url) {
          val.url = val.url.replace('http:', 'https:');
        }
        // fix missing image
        if (!val.images) {
          val.images = { common: '', large: '' };
        } else if (typeof val.images === 'string') {
          val.images = { common: val.images, large: val.images };
        }
        // replace image links
        for (let key of Object.keys(val.images)) {
          val.images[key] = val.images[key].replace('http:', 'https:');
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
  }, []);

  useEffect(() => {
    (async () => {
      const res = await workers.get('/bgm/calendar');
      if (res.data) {
        const data = parseData(res.data);
        setData(data);
      }
    })();
  }, [parseData]);

  // whether show prev weekday and next weekday
  const [showExtend, setShowExtend] = useState(() => responsive() === 'lg');

  useEffect(() => {
    const resizeHandler = throttle(() => {
      setShowExtend(responsive() === 'lg');
    });
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

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
              return (
                <List.Item className='bangumi' key={item.id}>
                  <div className='bangumi__wrapper'>
                    <Image
                      className='bangumi__image'
                      src={item.images.common}
                      preview={{
                        src: item.images.large,
                      }}
                    />
                  </div>
                  <div className='bangumi__meta'>
                    <span className='bangumi__name'>{item.name}</span>
                    <span className='bangumi__sub'>{item.name_cn}</span>
                    <div className='bangumi__stat'>
                      <Rate allowHalf={true} disabled={true} defaultValue={2} />
                      <div>
                        <FireOutlined />
                        &nbsp;
                        {item.collection.doing}
                      </div>
                    </div>
                  </div>
                </List.Item>
              );
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
        {showExtend && <div className='display__item'>{display[day - 2 < 0 ? 6 : day - 2]}</div>}
        <div className='display__item'>{display[day - 1]}</div>
        {showExtend && <div className='display__item'>{display[day > 6 ? 0 : day]}</div>}
      </div>
    </div>
  );
}

export default memo(Anime);
