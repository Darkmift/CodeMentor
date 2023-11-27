import React from 'react';
import './CodeBlock.css';
import CodeBlock from './CodeBlock';
import codeBlocks from './dummyDB';

interface CodeBlockListProps {
  updateCode: (roomName: string, code: string) => void;
  updateTitle: (title: string) => void;
  onRoleReceived: (role: string) => void; // Add the missing prop
}

function CodeBlockList({
  updateCode,
  updateTitle,
  onRoleReceived,
}: CodeBlockListProps): JSX.Element {
  return (
    <div className="codeBlock">
      {codeBlocks.map((block, index) => (
        <CodeBlock
          key={index}
          roomName={block.roomName}
          code={block.code}
          updateCode={updateCode}
          updateTitle={updateTitle}
          onRoleReceived={onRoleReceived} // Pass the onRoleReceived function
        />
      ))}
    </div>
  );
}

export default CodeBlockList;
