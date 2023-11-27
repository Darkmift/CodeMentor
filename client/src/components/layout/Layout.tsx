import { useEffect, useState } from 'react';
import RoomList from '../RoomList';
import './Layout.css';
import socketIoService from '../../Services/SocketIoService';
import EditorCode from '../EditorCode';

function Layout(): JSX.Element {
  const [roomList /*, setRoomList*/] = useState(['html', 'js']);
  const [code, setCode] = useState('');
  const [roomName, setRoomName] = useState('');
  const [role, setRole] = useState<'student' | 'mentor' | null>();

  useEffect(() => {
    console.log('roomName', roomName);
    if (roomName) {
      socketIoService.socket.emit('joinedRoom', { roomName });
    }
  }, [roomName]);

  useEffect(() => {
    socketIoService.socket.on('sendCode', (data) => {
      setCode(data.code);
    });
    socketIoService.socket.on('codeEdited', (data) => {
      console.log('🚀 ~ file: Layout.tsx:25 ~ socketIoService.socket.on ~ data:', data);
      setCode(data.code);
    });
    socketIoService.socket.on('role', (data) => {
      console.log('role', data);
      setRole(data.role);
    });
  }, []);

  useEffect(() => {
    console.log('🚀 ~ file: Layout.tsx:37 ~ Layout ~ code:', code);
  }, [code]);

  const handleCodeChange = (codeStr: string) => {
    if (role === 'student') {
      setCode(codeStr);
      socketIoService.socket.emit('emitCodeChange', { code: codeStr, roomName });
    }
  };

  return (
    <div className="layout">
      <header>
        <h1>Code Mentor</h1>
      </header>
      <div className="main-container">
        <div className="code-editor">
          <h1>{roomName ? `Room: ${roomName.toUpperCase()}` : 'Select a room'}</h1>
          {role && <h2>Role: {role}</h2>}
          {roomName && <EditorCode roomName={roomName} code={code} setCode={handleCodeChange} />}
        </div>
        <div className="sidebar">
          <div className="code-block">
            <RoomList roomList={roomList} setRoomName={setRoomName} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
