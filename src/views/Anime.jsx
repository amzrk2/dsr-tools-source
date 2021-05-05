import React, { useState, useEffect, memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Card, List, Pagination, Button, Image, Rate, Tooltip, Radio } from 'antd';
import 'antd/lib/card/style/index.less';
import 'antd/lib/list/style/index.less';
import 'antd/lib/empty/style/index.less'; // list empty
import 'antd/lib/pagination/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/image/style/index.less';
import 'antd/lib/rate/style/index.less';
import 'antd/lib/tooltip/style/index.less';
import 'antd/lib/radio/style/index.less';
import { FireOutlined } from '@ant-design/icons';

import './Anime.scss';
import dayjs from '@/utils/dayjs';
import { workers } from '@/utils/axios';
import responsive from '@/utils/responsive';
import { throttle } from '@/utils/performance';
import { IMAGE_FALLBACK } from '@/utils/constants';
import Loading from '@/components/Loading';

/**
 * format weekday from idx to cn string
 * @param {number} day
 */
function formatWeekday(day) {
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
  return '星期' + (dayNames[day] || '');
}

/**
 * format score to 5 star rating
 * @param {Array<Number>} score
 */
function formatRating(score = 0) {
  const rating = (Math.ceil(score) / 2).toFixed(1);
  const _score = score.toFixed(1);
  return [_score, rating];
}

/**
 * format hot number to string
 * @param {number} hot
 * @returns {string}
 */
function formatHot(hot = 0) {
  if (hot > 10000) {
    hot = (hot / 1000).toFixed(2).split('');
    // remove end 0
    while (hot[hot.length - 1] === '.' || hot[hot.length - 1] === '0') {
      hot.pop();
    }
    hot = hot.join('');
    return `${hot}k`;
  } else if (hot) {
    return `${hot}`;
  }
}

/**
 * weekday selector renderer
 */
const Weekday = memo(function Weekday({ day, today, onDayChange }) {
  return (
    <div className='weekday'>
      <Pagination
        defaultCurrent={today}
        total={7}
        pageSize={1}
        current={day}
        onChange={(day) => onDayChange(day)}
        itemRender={(cur, type, original) => {
          if (type === 'page') {
            if (cur === today) {
              return <b>{formatWeekday(cur - 1)}</b>;
            }
            return formatWeekday(cur - 1);
          }
          return original;
        }}
      />
      <Button onClick={() => onDayChange(today)}>今天</Button>
    </div>
  );
});

Weekday.propTypes = {
  day: PropTypes.number.isRequired,
  today: PropTypes.number.isRequired,
  onDayChange: PropTypes.func.isRequired,
};

/**
 * meta data renderer
 */
const Meta = memo(function Meta({ totalCount, todayCount, sortRule, onSortRuleChange }) {
  return (
    <div className='meta'>
      <div className='meta__info'>
        本季度共 {totalCount} 部番组 | 今日上映 {todayCount} 部
      </div>
      <div className='meta__sort'>
        <Radio.Group
          options={[
            { label: '未排序', value: 'native' },
            { label: '评分排序', value: 'ranking' },
            { label: '热度排序', value: 'hot' },
          ]}
          onChange={(e) => onSortRuleChange(e.target.value || 'native')}
          value={sortRule}
        />
      </div>
    </div>
  );
});

Meta.propTypes = {
  totalCount: PropTypes.number.isRequired,
  todayCount: PropTypes.number.isRequired,
  sortRule: PropTypes.string.isRequired,
  onSortRuleChange: PropTypes.func.isRequired,
};

/**
 * bangumi list renderer
 */
const Bangumi = memo(function Bangumi({ items, weekday, sortRule }) {
  const sortedItems = useMemo(() => {
    const res = [...items];
    if (!sortRule || sortRule === 'native') {
      return res;
    }
    if (sortRule === 'ranking') {
      res.sort((a, b) => b.rating.score - a.rating.score);
    } else if (sortRule === 'hot') {
      res.sort((a, b) => b.collection.doing - a.collection.doing);
    }
    return res;
  }, [items, sortRule]);

  /**
   * @param {React.BaseSyntheticEvent} e
   * @param {string} url
   */
  const handleClick = useCallback((e, url) => {
    e.stopPropagation();
    window.open(url);
  }, []);

  return (
    <Card title={weekday}>
      <List>
        {sortedItems.map((item) => {
          const url = item.url;
          const previewImage = item.images.common;
          const largeImage = item.images.large;
          const jpName = item.name;
          const cnName = item.name_cn;
          const [rating10, rating5] = formatRating(item.rating.score);
          const hot = formatHot(item.collection.doing);

          return (
            <List.Item className='bangumi' key={item.id}>
              <div className='bangumi__wrapper'>
                <Image
                  className='bangumi__image'
                  src={previewImage}
                  preview={{ src: largeImage }}
                  fallback={IMAGE_FALLBACK}
                  alt='Bangumi Preview Image'
                />
              </div>
              <div className='bangumi__meta' onClick={(e) => handleClick(e, url)}>
                <Tooltip title={jpName}>
                  <span className='bangumi__name'>{jpName}</span>
                </Tooltip>
                <Tooltip title={cnName}>
                  <span className='bangumi__sub'>{cnName}</span>
                </Tooltip>
                <div className='bangumi__stat'>
                  <Tooltip title={Number(rating10) ? rating10 : '暂无数据'}>
                    <div>
                      <Rate allowHalf={true} disabled={true} defaultValue={Number(rating5)} />
                    </div>
                  </Tooltip>
                  <div>
                    {hot}&nbsp;
                    <FireOutlined />
                  </div>
                </div>
              </div>
            </List.Item>
          );
        })}
      </List>
    </Card>
  );
});

Bangumi.propTypes = {
  items: PropTypes.array.isRequired,
  weekday: PropTypes.string.isRequired,
  sortRule: PropTypes.string.isRequired,
};

/**
 * anime page
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

  // date control
  const today = useMemo(() => dayjs().day() + 1, []);
  const [day, setDay] = useState(today);

  // total count and today count
  const totalCount = useMemo(() => {
    let sum = 0;
    data.forEach((weekday) => (sum += weekday?.items?.length || 0));
    return sum;
  }, [data]);
  const todayCount = useMemo(() => data[today - 1]?.items?.length || 0, [data, today]);

  // weekday sort rule
  const [sortRule, setSortRule] = useState('hot');
  // weekday renderers
  const display = useMemo(() => {
    const ret = [];
    data.forEach((val, idx) => {
      ret.push(<Bangumi items={val.items} weekday={formatWeekday(idx)} sortRule={sortRule} />);
    });
    return ret;
  }, [data, sortRule]);

  return (
    <Loading loading={data.length === 0}>
      <div className='anime'>
        <Weekday day={day} today={today} onDayChange={setDay} />
        <Meta
          totalCount={totalCount}
          todayCount={todayCount}
          sortRule={sortRule}
          onSortRuleChange={setSortRule}
        />
        <div className='display'>
          {showExtend && <div className='display__item'>{display[day - 2 < 0 ? 6 : day - 2]}</div>}
          <div className='display__item'>{display[day - 1]}</div>
          {showExtend && <div className='display__item'>{display[day > 6 ? 0 : day]}</div>}
        </div>
      </div>
    </Loading>
  );
}

export default memo(Anime);
