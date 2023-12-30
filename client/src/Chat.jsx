import React, { useEffect } from "react";
import { IoSend } from "react-icons/io5";


const Chat = () => {
    useEffect(() => {
        new WebSocket("ws://localhost:8080")
    },[])
  return (
    <div className="flex h-screen">
      <div className="bg-blue-100 w-1/3">contacts</div>
      <div className="flex flex-col bg-blue-200 w-2/3 p-2">
        <div className="flex-grow">messages with selected person</div>
        <div className="flex gap-2 ">
          <input
            type="text"
            placeholder="type your message"
            className="bg-white flex-grow border rounded-sm p-2 "
          />
          <button className=" mx-2 py-1 rounded-sm"><IoSend /></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
