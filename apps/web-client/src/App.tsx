import './assets/index.css';
import { App as AntApp, ConfigProvider, Layout } from 'antd';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <ConfigProvider>
      <AntApp>
        <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
          <UsersPage />
        </Layout>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
