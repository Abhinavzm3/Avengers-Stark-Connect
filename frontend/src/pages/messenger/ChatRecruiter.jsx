import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

const socket = io('http://localhost:8000/');

const Chat = ({ sen, rec }) => {
  const { user } = useSelector((store) => store.auth); 
  const [messages, setMessages] = useState([]);
  const receiver=rec; // Receiver's username
  const username=sen // Sender's username

  useEffect(() => {
    if (username) {
      socket.emit('set username', username);
    }

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [username]);

  const handleSendMessage = (message) => {
    if (message && receiver) {
      const msgObj = { msg: message, username, receiver };
      socket.emit('chat message', msgObj);
    }
  };

  return (
    <div id="chat">
      {!username ? (
        <div>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Directly update username state
            placeholder="Enter your username"
            autoComplete="off"
          />
          <button onClick={() => setUsername(username)}>Set Username</button>
        </div>
      ) : (
              <div className="flex flex-col  overflow-y-scroll items-center justify-center  text-center h-[200px] bg-gradient-to-b from-black via-gray-800 to-black  text-white bg-cover">

          
          <MessageList messages={messages} username={username} receiver={receiver} />
          <MessageForm onSubmit={handleSendMessage} />
        </div>
       )} 
    </div>
  );
};

export default Chat;
