import { useForm } from "react-hook-form";
import MessageModel from "../../../Models/MessageModel";
import socketService from "../../../Services/SocketService";
import "./Chat.css";
import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";

function Chat(): JSX.Element {
  const { register, handleSubmit } = useForm<MessageModel>();
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const [code, setCode] = useState<string>("");

  useEffect(() => {

    socketService.socket?.emit("joinedRoom", { roomName: "targil" });
    
    socketService.socket?.on(
      "codeEdited",
      (data: { roomName: string; code: string }) => {
        setCode(data.code);
        // update code state
      }
    );
    socketService.socket?.on(
      "sendCode",
      (data: { code: string }) => {
        setCode(data.code);
        // update code state
      }
    );
    
  }, []);

  function connect(): void {
    //2) client connect to socket.io
    socketService.connect((message: MessageModel) => {
      setMessages((mArray) => [...mArray, message]);
    });
  }

  //send the message to backend
  function sendMessage(message: MessageModel): void {
    socketService.send(message);
  }

  function disconnect(): void {
    socketService.disconnect();
  }

  return (
    <div className="Chat">
      <h1>Mentor-Wiser</h1>
      <CodeEditor></CodeEditor>
      <div className="buttonGroup">
        <button onClick={connect}>Connect</button>
        <button className="redBtn" onClick={disconnect}>
          Disconnect
        </button>
      </div>
      <br />
      <hr />
      <br />
      Chat NOW
      <br />
      <section>
        {messages.map((message, index) => (
          <div key={index} style={{ color: message.color }}>
            <span>{message.username}: </span>
            <span>{message.text}</span>
          </div>
        ))}
      </section>
      <form onSubmit={handleSubmit(sendMessage)} className="inputContainer">
        <div className="inlineInputs">
          <label>Username: </label>
          <input type="text" {...register("username")} />
          <label>Color: </label>
          <input type="color" {...register("color")} />
        </div>
        <div className="inlineInputs">
          <label>Message :</label>
          <textarea {...register("text")} />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
