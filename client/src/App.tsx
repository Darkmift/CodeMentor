import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import socketIoService from './Services/SocketIoService';

function App() {
  useEffect(() => {
    socketIoService.connect();
  }, []);

  return <Layout />;
}

export default App;
