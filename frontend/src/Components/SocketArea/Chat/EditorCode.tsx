import React, { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './EditorCode.css';
import socketIoService from '../../../Services/SocketIoService';

import Editor from 'react-simple-code-editor';
import Prism from 'prismjs'; // Import Prism library
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python'; // Import Python syntax support

interface EditorCodeProps {
  code: string;
  title: string;
}

function EditorCode({ code, title }: EditorCodeProps): JSX.Element {
  const [role, setRole] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const [editorCode, setEditorCode] = useState<string>(code);
  const [editorTitle, setEditorTitle] = useState<string>(title);

  useEffect(() => {
    socketIoService.socket?.on('codeEdited', (data: { roomName: string; code: string }) => {
      setEditorCode(data.code);
      setEditorTitle(data.roomName);
      setRoomName(data.roomName);
    });
    socketIoService.socket?.on('role', (data: { role: string }) => {
      setRole(data.role);
    });

    return () => {
      socketIoService.socket?.off('codeEdited');
    };
  }, []);

  const handleInput = (e: string) => {
    const newCode = e;
    console.log('🚀 ~ file: EditorCode.tsx:40 ~ handleInput ~ newCode:', newCode);

    setEditorCode(newCode);
    socketIoService.socket?.emit('emitCodeChange', { code: newCode, roomName });
  };

  return (
    <div>
      <div className="editor-header">
        <h1>{editorTitle}</h1>
        {/* <div>
          <button>Save Code</button>
        </div> */}
      </div>
      {role.length ? (
        <div className="editor-menu">
          <h3>Room Name: {roomName}</h3>
          <h3>Your role: {role}</h3>

          <h3>Code Editor</h3>

          <div className="highlighted-code">
            <Editor
              value={editorCode}
              onValueChange={handleInput}
              highlight={(code) => Prism.highlight(code, Prism.languages[roomName], roomName)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            />
          </div>
        </div>
      ) : (
        <h1>Please select a code block to edit</h1>
      )}
    </div>
  );
}

export default EditorCode;
