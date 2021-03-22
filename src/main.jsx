import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import { ConfigProvider } from 'antd';
import 'antd/lib/style/index.less';

import './css/global.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider autoInsertSpaceInButton={false}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
