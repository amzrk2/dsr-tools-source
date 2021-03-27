import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { Tabs, Table, Card, Alert, List } from 'antd';
import 'antd/lib/tabs/style/index.less';
import 'antd/lib/table/style/index.less';
import 'antd/lib/empty/style/index.less';
import 'antd/lib/card/style/index.less';
import 'antd/lib/alert/style/index.less';
import 'antd/lib/list/style/index.less';

import './FFXIV.scss';
import { api } from '@/utils/axios';

const shadowbringers = () => '5.X SHADOWBRINGERS';
const stormblood = () => '4.X STORMBLOOD';

/**
 * ffxiv page
 * @return {import('react').ReactElement}
 */
function FFXIV() {
  const [meta, setMeta] = useState({ lastUpdate: '', license: '' });

  const metaList = [
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
  ];

  const [chocobo, setChocobo] = useState({ shadowbringers: [], stormblood: [] });
  const [moogle, setMoogle] = useState({ shadowbringers: [], stormblood: [] });
  const [fatCat, setFatCat] = useState({ shadowbringers: [], stormblood: [] });

  useEffect(() => {
    (async () => {
      const res = await api.get('/dsr-tools/ffxiv/index.json');
      if (res.data) {
        setMeta({ lastUpdate: res.data.lastUpdate, license: res.data.license });
        setChocobo(res.data.huntingData.chocobo);
        setMoogle(res.data.huntingData.moogle);
        setFatCat(res.data.huntingData.fatCat);
      }
    })();
  }, []);

  const columns = [
    { title: '服务器', dataIndex: 'server', key: 'server', align: 'center' },
    { title: '早车', dataIndex: ['timeTable', '0'], key: 'time-0', align: 'center' },
    { title: '午车', dataIndex: ['timeTable', '1'], key: 'time-1', align: 'center' },
    { title: '晚车', dataIndex: ['timeTable', '2'], key: 'time-2', align: 'center' },
    { title: '灵车', dataIndex: ['timeTable', '3'], key: 'time-3', align: 'center' },
    { title: '始发地', dataIndex: 'origin', key: 'origin', align: 'center' },
    { title: '路线', dataIndex: 'route', key: 'route', align: 'center' },
  ];

  const tableProps = {
    size: 'small',
    columns,
    pagination: false,
    scroll: { x: 'max-content' },
  };
  const tabPanes = [
    { name: '陆行鸟', key: 'chocobo', data: chocobo },
    { name: '莫古力', key: 'moogle', data: moogle },
    { name: '猫小胖', key: 'fatCat', data: fatCat },
  ];

  return (
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
        {tabPanes.map((server) => (
          <Tabs.TabPane tab={server.name} key={server.key}>
            <Table
              {...tableProps}
              dataSource={server.data.shadowbringers}
              loading={server.data.shadowbringers.length <= 0}
              title={shadowbringers}
            />
            <Table
              {...tableProps}
              dataSource={server.data.stormblood}
              loading={server.data.stormblood.length <= 0}
              title={stormblood}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default FFXIV;
