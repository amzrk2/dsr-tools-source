import React, { memo, useState, useEffect, useCallback } from 'react';

import { Row, Col, Card, Image, Carousel, List, Button, Alert } from 'antd';
import 'antd/lib/grid/style/index.less';
import 'antd/lib/card/style/index.less';
import 'antd/lib/image/style/index.less';
import 'antd/lib/carousel/style/index.less';
import 'antd/lib/list/style/index.less';
import 'antd/lib/empty/style/index.less'; // list empty
import 'antd/lib/button/style/index.less';
import 'antd/lib/alert/style/index.less';

import './Minecraft.scss';
import Loading from '@/components/Loading';
import { api } from '@/utils/axios';
import jsdelivr from '@/utils/jsdelivr';
import { IMAGE_FALLBACK } from '@/utils/constants';

function Minecraft() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  /**
   * fetch data from remote
   */
  const fetchData = useCallback(async () => {
    const res = await api.get('/dsr-tools/minecraft/index.min.json');
    if (res?.data) {
      setData(res.data);
      setLoading(false);
    }
  }, []);
  useEffect(() => fetchData(), [fetchData]);

  return (
    <Loading loading={loading}>
      <div className='mc'>
        <Row gutter={[32, 32]}>
          <Col className='mc__card' xs={24} md={12}>
            <Alert message={`更新日期：${data?.date}`} type='success' showIcon={true} />
            <Card>
              <div className='preview'>
                <Carousel autoplay>
                  {data?.slides.map((pic, idx) => {
                    return (
                      <div key={pic}>
                        <Image
                          className='preview__image'
                          alt={`Preview Image ${idx}`}
                          src={jsdelivr(`/dsr-tools/minecraft/${pic}`, 'dsr-cdn-api')}
                          fallback={IMAGE_FALLBACK}
                          preview={false}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
              <div className='download'>
                <Button
                  size='large'
                  type='primary'
                  block={true}
                  href={data?.download}
                  target='_blank'
                >
                  下载
                </Button>
              </div>
            </Card>
            <Card title='关于整合'>
              <List
                size='small'
                dataSource={data?.info}
                renderItem={(item) => (
                  <List.Item className='list__item'>
                    <span dangerouslySetInnerHTML={{ __html: item }}></span>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col className='mc__card' xs={24} md={12}>
            <Card title='版本信息'>
              <List
                size='small'
                dataSource={data?.mods}
                renderItem={(item) => (
                  <List.Item className='list__item'>
                    <span>{item}</span>
                  </List.Item>
                )}
              />
            </Card>
            <Card title='相关链接'>
              <div className='blist'>
                {data?.links?.map((link) => (
                  <Button className='blist__item' key={link[1]} href={link[1]} target='_blank'>
                    {link[0]}
                  </Button>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Loading>
  );
}

export default memo(Minecraft);
