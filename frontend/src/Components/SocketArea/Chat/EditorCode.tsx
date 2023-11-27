import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./EditorCode.css";
import socketIoService from "../../../Services/SocketIoService";

interface EditorCodeProps {
  code: string;
  title: string;
}

function EditorCode({ code, title }: EditorCodeProps): JSX.Element {
  const [editorCode, setEditorCode] = useState<string>("");
  const [editorTitle, setEditorTitle] = useState<string>("");

  useEffect(() => {
    socketIoService.connect(); // Automatically connect to the socket
    setEditorCode(code);
    setEditorTitle(title);

    socketIoService.socket?.on(
      "codeEdited",
      (data: { roomName: string; code: string }) => {
        setEditorCode(data.code);
        setEditorTitle(data.roomName);
      }
    );

    return () => {
      socketIoService.socket?.off("codeEdited");
    };
  }, [code, title]);

  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedCode = e.target.value;
    setEditorCode(updatedCode);
    socketIoService.socket?.emit("codeEdited", {
      roomName: editorTitle,
      code: updatedCode,
    });
  };
  const handleDisconnect = () => {
    socketIoService.disconnect(); // Call the disconnect method from the socketIoService
    console.log("You are disconnected!");
  };

  return (
    <div>
      <div className="editor-header">
        <h1>{editorTitle}</h1>
        <div>
          <button>Save Code</button>
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      </div>

      <h3>Room Name</h3>
      <input
        type="text"
        value={editorTitle}
        onChange={(e) => setEditorTitle(e.target.value)}
        placeholder="Enter Room Name"
      />
      <h3>Code Editor</h3>

      <textarea
        className="code-display"
        value={editorCode}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setEditorCode((prevCode) => prevCode + "\n");
          }
        }}
      />
      {editorCode && (
        <div className="highlighted-code">
          <SyntaxHighlighter language="javascript" style={prism}>
            {editorCode}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}

export default EditorCode;
