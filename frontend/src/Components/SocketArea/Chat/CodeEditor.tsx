import React, { useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./CodeEditor.css"; // Import the CSS file for styling

function CodeEditor(): JSX.Element {
  const codeDivRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = React.useState(`  <div className="highlighted-code">
  <SyntaxHighlighter language="javascript" style={prism}>
    {code}
  </SyntaxHighlighter>
</div>`);

  useEffect(() => {
    if (codeDivRef.current) {
      codeDivRef.current.innerHTML = code;
    }
  }, [code]);

  const handleCodeChange = () => {
    if (codeDivRef.current) {
      const newText = codeDivRef.current.innerText;
      setCode(newText);
    }
  };

  // const joinRoom = (roomName, customAttribute) => {
  //   socket.emit('joinRoom', { roomName, customAttribute });
  // };

  return (
    <div>
      <div
        ref={codeDivRef}
        contentEditable
        className="code-display"
        onInput={handleCodeChange}>
        <SyntaxHighlighter language="javascript" style={prism}>
          {code}
        </SyntaxHighlighter>
      </div>
      <div className="highlighted-code">
        <SyntaxHighlighter language="javascript" style={prism}>
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeEditor;
