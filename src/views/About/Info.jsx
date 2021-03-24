import React from 'react';

import { Row, Col, Card, Image } from 'antd';
import 'antd/lib/grid/style/index.less';
import 'antd/lib/card/style/index.less';
import 'antd/lib/image/style/index.less';
import {
  PaperClipOutlined,
  FileTextOutlined,
  TwitterOutlined,
  GithubOutlined,
} from '@ant-design/icons';

import './Info.scss';
import jsdelivr from '@/utils/jsdelivr';

function Personal() {
  return (
    <div className='personal'>
      <img
        className='personal__avatar'
        alt='Personal Avatar'
        src={jsdelivr('/images/avatars/dsrkafuu_256p.jpg', 'cdn')}
      />
      <span className='personal__id'>DSRKafuU</span>
    </div>
  );
}

function Info() {
  return (
    <div className='info'>
      <Row gutter={[64, 64]}>
        <Col xs={24} md={12}>
          <Card
            cover={<Personal />}
            actions={[
              <PaperClipOutlined key='homepage' />,
              <FileTextOutlined key='blog' />,
              <TwitterOutlined key='twitter' />,
              <GithubOutlined key='github' />,
            ]}
          >
            <Image alt='Personal Image' />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          col-12
        </Col>
      </Row>
    </div>
  );
}

export default Info;
