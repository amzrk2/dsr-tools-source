import React, { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { useHistory } from 'react-router';

import { Tabs, Table, Card, Alert, List } from 'antd';
import 'antd/lib/tabs/style/index.less';
import 'antd/lib/table/style/index.less';
import 'antd/lib/empty/style/index.less'; // table empty
import 'antd/lib/card/style/index.less';
import 'antd/lib/alert/style/index.less';
import 'antd/lib/list/style/index.less';

import './FFXIV.scss';
import dayjs from '@/utils/dayjs';
import Loading from '@/components/Loading';
import { workers, api } from '@/utils/axios';

// table configs
const shadowbringers = () => '5.X SHADOWBRINGERS';
const stormblood = () => '4.X STORMBLOOD';

function FFXIV() {
  const [loading, setLoading] = useState(true);

  // metadata and server records
  const [meta, setMeta] = useState({ message: '', update: '', license: '' });
  const [data, setData] = useState({ chocobo: [], moogle: [], fatCat: [] });

  /**
   * fetch data from remote
   */
  const fetchData = useCallback(async () => {
    let res = null;
    res = await workers.get('/dsr-tools/ffxiv/index.min.json');
    if (!res) {
      res = await api.get('/dsr-tools/ffxiv/index.min.json');
    }
    if (res?.data) {
      setMeta({
        message: res.data.message || '',
        update: res.data.update,
        license: res.data.license,
      });
      setData(res.data.data);
      setLoading(false);
    }
  }, []);
  useEffect(() => fetchData(), [fetchData]);

  // tab settings
  const tabPanes = useMemo(
    () => [
      { name: '陆行鸟', key: 'chocobo', records: data.chocobo },
      { name: '莫古力', key: 'moogle', records: data.moogle },
      { name: '猫小胖', key: 'fatcat', records: data.fatCat },
    ],
    [data.chocobo, data.fatCat, data.moogle]
  );

  // table configs
  const curTZ = useMemo(() => dayjs.tz.guess() || 'Asia/Shanghai', []);
  const cstDay = useMemo(() => dayjs().tz('Asia/Shanghai').format('YYYY-MM-DD'), []);
  const render = useCallback(
    (t) => {
      if (!t) {
        return '';
      }
      return dayjs.tz(`${cstDay} ${t}`, 'Asia/Shanghai').tz(curTZ).format('HH:mm');
    },
    [cstDay, curTZ]
  );
  const columns = useMemo(
    () => [
      { title: '服务器', dataIndex: 'server', key: 'server', align: 'center' },
      { title: '早车', dataIndex: ['times', '1'], key: 'times-1', align: 'center', render },
      { title: '午车', dataIndex: ['times', '2'], key: 'times-2', align: 'center', render },
      { title: '晚车', dataIndex: ['times', '3'], key: 'times-3', align: 'center', render },
      { title: '灵车', dataIndex: ['times', '0'], key: 'times-0', align: 'center', render },
      { title: '始发地', dataIndex: 'origin', key: 'origin', align: 'center' },
      { title: '路线', dataIndex: 'route', key: 'route', align: 'center' },
      { title: '备注', dataIndex: 'comment', key: 'comment', align: 'center' },
    ],
    [render]
  );
  const tableProps = useMemo(
    () => ({
      size: 'small',
      columns,
      pagination: false,
      scroll: { x: 'max-content' },
      rowKey: (record) => record.server,
    }),
    [columns]
  );

  // settings panel data
  const metaList = useMemo(
    () => [
      {
        title: '数据更新',
        desc: '数据更新后 CDN 缓存需要约 10-15 分钟全球刷新，若出现问题则最高需要 12 小时',
      },
      {
        title: '错误反馈',
        desc: '请使用右下角按钮直接进行客服提问反馈，或至 NGA 原帖回帖反馈',
      },
      {
        title: '感谢访问',
        desc: '如果觉得本站对您有所帮助还请多多分享，用户的使用是我更新的最大动力',
      },
      {
        title: 'NGA 原帖',
        desc: (
          <a href={meta.license} target='_blank'>
            {meta.license}
          </a>
        ),
      },
    ],
    [meta.license]
  );
  const updateMessage = useMemo(() => {
    let text = `更新于 ${dayjs(meta.update).format('YYYY-MM-DD HH:mm:ss')} | 时区 ${curTZ}`;
    if (dayjs().isDST()) {
      text += ' (DST)';
    }
    return text;
  }, [curTZ, meta.update]);

  // router selected tab detector
  const history = useHistory();
  const curTab = useMemo(() => {
    const search = new URLSearchParams(history.location.search);
    return search.get('tab') || 'settings';
  }, [history.location.search]);
  /**
   * @param {string} key
   */
  const onTabChange = useCallback(
    (key) => {
      const search = new URLSearchParams();
      search.set('tab', key);
      history.replace({
        search: '?' + search.toString(),
      });
    },
    [history]
  );

  return (
    <Loading loading={loading}>
      <div className='ffxiv'>
        <Tabs
          type='card'
          size='large'
          centered={true}
          animated={true}
          onChange={onTabChange}
          defaultActiveKey={curTab}
          activeKey={curTab}
        >
          <Tabs.TabPane tab='设置' key='settings' className='tabs-settings'>
            <Card>
              <div className='messages'>
                {meta.message && <Alert message={meta.message} type='error' showIcon={true} />}
                <Alert message={updateMessage} type='success' showIcon={true} />
              </div>
              <List
                dataSource={metaList}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta title={item.title} description={item.desc} />
                  </List.Item>
                )}
              ></List>
            </Card>
          </Tabs.TabPane>
          {tabPanes.map((dataCenter) => (
            <Tabs.TabPane tab={dataCenter.name} key={dataCenter.key}>
              <Table {...tableProps} dataSource={dataCenter.records[0]} title={shadowbringers} />
              <Table {...tableProps} dataSource={dataCenter.records[1]} title={stormblood} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </Loading>
  );
}

export default memo(FFXIV);
