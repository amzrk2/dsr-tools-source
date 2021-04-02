import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { GuardProvider } from 'react-router-guards';
import guards from './router/guards';

// sentry and ga
import sentry from './plugins/sentry';
import ga from './plugins/ga';
sentry();
ga();

// antd
import 'normalize.css';
import 'antd/lib/style/index.less';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

// app
import './css/global.scss';
import './css/utils.scss';
import App from './App';

ReactDOM.render(
  /* <React.StrictMode> */
  <ConfigProvider autoInsertSpaceInButton={false} locale={zhCN}>
    <BrowserRouter>
      <GuardProvider guards={guards}>
        <App />
      </GuardProvider>
    </BrowserRouter>
  </ConfigProvider>,
  /* </React.StrictMode> */
  document.getElementById('root')
);
