// CodeBlock.tsx
import React, { useState } from "react";
import "./CodeBlock.css";
import socketService from "../../Services/SocketService";

interface CodeBlockProps {
  roomName: string;
  code: string;
  updateCode: (code: string, title: string) => void; // Adjust the function signature
  updateTitle: (title: string) => void;
  onRoleReceived: (role: string) => void;
}

function CodeBlock({
  roomName,
  code,
  updateCode,
  onRoleReceived,
}: CodeBlockProps): JSX.Element {
  const [role, setRole] = useState<string>("");

  const joinRoom = () => {
    socketService.socket?.emit("joinedRoom", { roomName });
    socketService.socket?.on("role", (receivedRole: string) => {
      setRole(receivedRole);
      onRoleReceived(receivedRole); // Pass the role information to the parent component
    });
    updateCode(code, roomName);
    console.log(`Connection to room "${roomName}" established!`);
  };

  return (
    <button className="blockButton" onClick={joinRoom}>
      <h3>{roomName}</h3>
      <pre>{code}</pre>
      
    </button>
  );
}

export default CodeBlock;
