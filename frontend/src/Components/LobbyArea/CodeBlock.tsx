// CodeBlock.tsx
import React, { useState } from 'react';
import './CodeBlock.css';
import socketIoService from '../../Services/SocketIoService';

interface CodeBlockProps {
  roomName: string;
  code: string;
  updateCode: (code: string, title: string) => void; // Adjust the function signature
  updateTitle: (title: string) => void;
  onRoleReceived: (role: string) => void;
}

function CodeBlock({ roomName, code, updateCode, onRoleReceived }: CodeBlockProps): JSX.Element {
  const joinRoom = () => {
    socketIoService.socket?.emit('joinedRoom', { roomName });
    socketIoService.socket?.on('role', (data) => {
      onRoleReceived(data.role); // Pass the role information to the parent component
    });
    updateCode(code, roomName);
    console.log(`Connection to room "${roomName}" established!`);
  };

  return (
    <button className="blockButton" onClick={joinRoom}>
      <h3>{roomName}</h3>
    </button>
  );
}

export default CodeBlock;
