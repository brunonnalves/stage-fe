import ReactDOM from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';

// project imports
import App from './App';
import { BASE_PATH } from './config/config';
import { ConfigProvider } from './contexts/ConfigContext';

// style + assets
import './assets/scss/style.scss';

// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider>
    <BrowserRouter basename={BASE_PATH}>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
