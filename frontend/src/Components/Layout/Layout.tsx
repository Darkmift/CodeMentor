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
  }, []);

  const updateEditorCode = (code: string, title: string) => {
    setEditorCode(code);
    setEditorTitle(title);
  };

  const updateTitle = (title: string) => {
    setEditorTitle(title);
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
