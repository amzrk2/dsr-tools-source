import React, { memo, useCallback, useState, useMemo } from 'react';

import { Input, Button, Space, message, Card, List, Typography } from 'antd';
import 'antd/lib/input/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/space/style/index.less';
import 'antd/lib/message/style/index.less';
import 'antd/lib/card/style/index.less';
import 'antd/lib/list/style/index.less';
import 'antd/lib/typography/style/index.less';
import { LeftOutlined, RightOutlined, DeleteOutlined } from '@ant-design/icons';

import './KataCode.scss';
import { encodeKata, decodeKata } from '@/utils/katacode';

const KataCodeInfo = memo(function KataCodeInfo() {
  const infoList = useMemo(
    () => [
      {
        title: '密文格式',
        desc: (
          <Typography style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
            请注意相同的明文可能会产生不同的密文，例如密文 <code>ィゾヮイダ</code> 和{' '}
            <code>ィゾヲイダ</code> 均对应明文 <code>12</code>
          </Typography>
        ),
      },
      {
        title: '数据支持',
        desc: '支持任意格式 Unicode 字符，例如 emoji 表情等',
      },
      {
        title: '免责声明',
        desc: '本站点作者 DSRKafuU 不对使用此工具造成的任何结果负相关法律责任',
      },
    ],
    []
  );
  return (
    <div className='kata-code-info'>
      <Card>
        <List
          dataSource={infoList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={item.title} description={item.desc} />
            </List.Item>
          )}
        ></List>
      </Card>
    </div>
  );
});

function KataCode() {
  const [srcValue, setSrcValue] = useState('');
  const [encValue, setEncValue] = useState('');

  const clearValue = useCallback(() => {
    setSrcValue('');
    setEncValue('');
    message.info('已清空内容');
  }, []);
  const encodeValue = useCallback(async (val = '') => {
    try {
      const res = await encodeKata(val);
      setEncValue(res);
      message.success('加密成功');
    } catch {
      message.error('加密失败 请检查输入字符');
    }
  }, []);
  const decodeValue = useCallback(async (val = '') => {
    try {
      val = val.trim();
      const res = await decodeKata(val);
      setSrcValue(res);
      message.success('解密成功');
    } catch {
      message.error('解密失败 请检查输入字符');
    }
  }, []);

  return (
    <div className='kata-code'>
      <div className='kata-code-func'>
        <div className='kata-code-source'>
          <Input.TextArea value={srcValue} onChange={(e) => setSrcValue(e.target.value)} />
        </div>
        <div className='kata-code-ctrl'>
          <Space direction='vertical'>
            <Button type='primary' icon={<RightOutlined />} onClick={() => encodeValue(srcValue)}>
              加密
            </Button>
            <Button type='primary' icon={<LeftOutlined />} onClick={() => decodeValue(encValue)}>
              解密
            </Button>
            <Button type='danger' icon={<DeleteOutlined />} onClick={clearValue}>
              清空
            </Button>
          </Space>
        </div>
        <div className='kata-code-encoded'>
          <Input.TextArea value={encValue} onChange={(e) => setEncValue(e.target.value)} />
        </div>
      </div>
      <KataCodeInfo />
    </div>
  );
}

export default memo(KataCode);
