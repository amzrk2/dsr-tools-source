import React, { useEffect, useState } from 'react';

import { Tabs, Table } from 'antd';
import 'antd/lib/tabs/style/index.less';
import 'antd/lib/table/style/index.less';

import './FFXIV.scss';
import { api } from '@/utils/axios';

function FFXIV() {
  const [chocobo, setChocobo] = useState({ shadowbringers: [], stormblood: [] });
  const [moogle, setMoogle] = useState({ shadowbringers: [], stormblood: [] });
  const [fatCat, setFatCat] = useState({ shadowbringers: [], stormblood: [] });

  useEffect(() => {
    (async () => {
      const res = await api.get('/dsr-tools/ffxiv/index.json');
      if (res.data) {
        setChocobo(res.data.huntingData.chocobo);
        setMoogle(res.data.huntingData.moogle);
        setFatCat(res.data.huntingData.fatCat);
      }
    })();
  }, []);

  const columns = [
    { title: '服务器', dataIndex: 'server', key: 'server' },
    { title: '早车', dataIndex: ['timeTable', '0'], key: 'time-0' },
    { title: '午车', dataIndex: ['timeTable', '1'], key: 'time-1' },
    { title: '晚车', dataIndex: ['timeTable', '2'], key: 'time-2' },
    { title: '灵车', dataIndex: ['timeTable', '3'], key: 'time-3' },
    { title: '始发地', dataIndex: 'origin', key: 'origin' },
    { title: '路线', dataIndex: 'route', key: 'route' },
  ];

  return (
    <div className='ffxiv'>
      <Tabs type='card' size='large' centered={true}>
        <Tabs.TabPane tab='关于' key='about'>
          <p>Content of Tab Pane 1</p>
          <p>Content of Tab Pane 1</p>
          <p>Content of Tab Pane 1</p>
        </Tabs.TabPane>
        <Tabs.TabPane tab='陆行鸟' key='chocobo'>
          <Table
            size='small'
            columns={columns}
            dataSource={chocobo.shadowbringers}
            pagination={false}
            loading={true}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab='莫古力' key='moogle'>
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
        </Tabs.TabPane>
        <Tabs.TabPane tab='猫小胖' key='fatcat'>
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default FFXIV;
