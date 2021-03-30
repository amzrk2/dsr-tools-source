import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import { Tabs, Table, Card, Alert, List } from 'antd';
import 'antd/lib/tabs/style/index.less';
import 'antd/lib/table/style/index.less';
import 'antd/lib/empty/style/index.less'; // table
import 'antd/lib/card/style/index.less';
import 'antd/lib/alert/style/index.less';
import 'antd/lib/list/style/index.less';

import './FFXIV.scss';
import Loading from '@/components/Loading';
import { api } from '@/utils/axios';

const shadowbringers = () => '5.X SHADOWBRINGERS';
const stormblood = () => '4.X STORMBLOOD';

/**
 * ffxiv page
 * @return {import('react').ReactElement}
 */
function FFXIV() {
  const [loading, setLoading] = useState(true);

  // metadata
  const [meta, setMeta] = useState({ lastUpdate: '', license: '' });
  const metaList = useMemo(
    () => [
      {
        title: '数据更新',
        desc: '数据更新后 CDN 缓存需要约 10-15 分钟全球刷新, 若出现问题则最高需要 12 小时',
      },
      {
        title: '错误反馈',
        desc: '请使用右下角按钮直接进行客服提问反馈, 或至 NGA 原帖回帖反馈',
      },
      {
        title: '感谢访问',
        desc: '如果觉得本站对您有所帮助还请多多分享, 用户的使用是我更新的最大动力',
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

  // server records
  const [data, setData] = useState({ chocobo: {}, moogle: {}, fatCat: {} });
  useEffect(() => {
    (async () => {
      const res = await api.get('/dsr-tools/ffxiv/index.json');
      if (res.data) {
        setMeta({ lastUpdate: res.data.lastUpdate, license: res.data.license });
        setData(res.data.huntingData);
        setLoading(false);
      }
    })();
  }, []);

  // table configs
  const columns = useMemo(
    () => [
      { title: '服务器', dataIndex: 'server', key: '服务器', align: 'center' },
      { title: '早车', dataIndex: ['timeTable', '0'], key: '早车', align: 'center' },
      { title: '午车', dataIndex: ['timeTable', '1'], key: '午车', align: 'center' },
      { title: '晚车', dataIndex: ['timeTable', '2'], key: '晚车', align: 'center' },
      { title: '灵车', dataIndex: ['timeTable', '3'], key: '灵车', align: 'center' },
      { title: '始发地', dataIndex: 'origin', key: '始发地', align: 'center' },
      { title: '路线', dataIndex: 'route', key: '路线', align: 'center' },
    ],
    []
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
  const tabPanes = useMemo(
    () => [
      { name: '陆行鸟', records: data.chocobo },
      { name: '莫古力', records: data.moogle },
      { name: '猫小胖', records: data.fatCat },
    ],
    [data.chocobo, data.fatCat, data.moogle]
  );

  return (
    <Loading loading={loading}>
      <div className='ffxiv'>
        <Tabs type='card' size='large' centered={true}>
          <Tabs.TabPane tab='关于' key='about' className='tabs-about'>
            <Alert
              message={`最后更新于 ${dayjs(meta.lastUpdate).format('YYYY-MM-DD HH:mm:ss')}`}
              type='success'
              showIcon={true}
            />
            <Card>
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
            <Tabs.TabPane tab={dataCenter.name} key={dataCenter.name}>
              <Table
                {...tableProps}
                dataSource={dataCenter.records.shadowbringers}
                title={shadowbringers}
              />
              <Table
                {...tableProps}
                dataSource={dataCenter.records.stormblood}
                title={stormblood}
              />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </Loading>
  );
}

export default FFXIV;
