import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import { ConfigProvider } from 'antd';
import 'antd/lib/style/index.less';

import './css/global.scss';
import './css/utils.scss';
import App from './App';

ReactDOM.render(
  /* <React.StrictMode> */
  <ConfigProvider autoInsertSpaceInButton={false}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>,
  /* </React.StrictMode> */
  document.getElementById('root')
);
