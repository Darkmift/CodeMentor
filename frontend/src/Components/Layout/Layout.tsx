import React, { useEffect, useState } from 'react';
import './Layout.css';
import EditorCode from '../SocketArea/Chat/EditorCode';
import ParticipantsList from '../LobbyArea/ParticipantsList';
import CodeBlockList from '../LobbyArea/CodeBlockList';
import socketIoService from '../../Services/SocketIoService';

function Layout(): JSX.Element {
  const [editorCode, setEditorCode] = useState<string>('');
  const [editorTitle, setEditorTitle] = useState<string>('');

  useEffect(() => {
    socketIoService.connect();
    socketIoService.socket?.on('sendCode', (data: { roomName: string; code: string }) => {
      setEditorCode(data.code);
    });
  }, []);

  useEffect(() => {
    console.log('🚀 ~ file: Layout.tsx:17 ~ updateEditorCode ~ title:', {
      editorCode,
      editorTitle,
    });
  }, [editorCode, editorTitle]);

  const updateEditorCode = (code: string, title: string) => {
    console.log('🚀 ~ file: Layout.tsx:17 ~ updateEditorCode ~ title:', title);
    setEditorCode(code);
    setEditorTitle(title);
    socketIoService.socket?.emit('joinedRoom', { roomName: title });
  };

  const updateTitle = (title: string) => {
    console.log('🚀 ~ file: Layout.tsx:23 ~ updateTitle ~ title:', title);
    setEditorTitle(title);
    socketIoService.socket?.emit('joinedRoom', { roomName: title });
  };

  const onRoleReceived = (role: string) => {
    console.log(`Received role: ${role}`);
  };

  return (
    <div className="layout">
      <header>
        <h1>Code Mentor</h1>
      </header>
      <div className="main-container">
        <div className="code-editor">
          <EditorCode code={editorCode} title={editorTitle} />
        </div>
        <div className="sidebar">
          <div className="code-block">
            <CodeBlockList
              updateCode={updateEditorCode}
              updateTitle={updateTitle}
              onRoleReceived={onRoleReceived}
            />
          </div>
          <div className="participants-list">
            <ParticipantsList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
