import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Image, Skeleton, Spin } from 'antd';
import 'antd/lib/image/style/index.less';
import 'antd/lib/skeleton/style/index.less';
import 'antd/lib/spin/style/index.less';

import './QRCode.scss';
import { SCRIPT_AWESOME_QR } from '@/utils/constants';

const size = 128;
const errorComponent = <Skeleton.Image className='qrcode qrcode--error' />;
const loadingComponent = (
  <div className='qrcode qrcode--loading'>
    <Spin />
  </div>
);

/**
 * custom qr component
 * @param {Objecr} props
 * @return {import('react').ReactElement}
 */
function QRCode({ content }) {
  const [status, setStatus] = useState('pending');
  const [qrCode, setQRCode] = useState('');

  // load dependency
  useEffect(() => {
    let script = document.getElementById('awesome-qr');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('src', SCRIPT_AWESOME_QR);
      script.setAttribute('id', 'awesome-qr');
      script.addEventListener('load', () => setStatus('fulfilled'));
      script.addEventListener('error', () => setStatus('rejected'));
      document.body.appendChild(script);
    }
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
  return (
    <Image className='qrcode' width={size} height={size} src={qrCode} alt='Share Link QRCode' />
  );
}

QRCode.propTypes = {
  content: PropTypes.string,
};

export default QRCode;
