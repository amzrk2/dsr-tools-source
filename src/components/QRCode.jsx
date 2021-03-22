import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Skeleton, Spin } from 'antd';
import 'antd/lib/skeleton/style/index.less';
import 'antd/lib/spin/style/index.less';

import './QRCode.scss';

const aQRSrc =
  'https://cdn.jsdelivr.net/gh/SumiMakito/Awesome-qr.js@2.0.1-rc.0/dist/awesome-qr.min.js';
const size = 128;
const errorComponent = <Skeleton.Image className='qrcode qrcode--error' />;
const loadingComponent = (
  <div className='qrcode qrcode--loading'>
    <Spin />
  </div>
);

function QRCode({ content }) {
  const [status, setStatus] = useState('pending');
  const [qrCode, setQRCode] = useState('');

  // load dependency
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('src', aQRSrc);
    script.addEventListener('load', () => setStatus('fulfilled'));
    script.addEventListener('error', () => setStatus('rejected'));
    document.body.appendChild(script);
  }, []);

  // init image
  useEffect(() => {
    const AwesomeQR = window.AwesomeQR?.AwesomeQR;
    if (status && content && AwesomeQR) {
      new AwesomeQR({
        text: content,
        size: size * 2,
        margin: 0,
      })
        .draw()
        .then((dataURL) => setQRCode(dataURL));
    }
  }, [content, status]);

  // renderer
  if (status === 'pending' || (status === 'fulfilled' && !qrCode)) {
    return loadingComponent;
  }
  if (status === 'rejected' || !content) {
    return errorComponent;
  }
  return <img className='qrcode' src={qrCode} alt='Share Link QRCode' />;
}

QRCode.propTypes = {
  content: PropTypes.string,
};

export default QRCode;
