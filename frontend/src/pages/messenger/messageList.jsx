import React from 'react';

const MessageList = ({ messages, username, receiver }) => {
    console.log("Messages array:", messages);
    console.log("Username:", username);
    console.log("Receiver:", receiver);

    return (
        <ul id="messages" className="space-y-4 w-auto mb-2">
            {messages.map((message, index) => {
                console.log(`Checking message: ${message.sender} -> ${message.receiver}`);

                const isSenderMessage = message.sender === username && message.receiver === receiver;
                const isReceiverMessage = message.sender === receiver && message.receiver === username;
                console.log("isSenderMessage:", isSenderMessage, "isReceiverMessage:", isReceiverMessage);

                if (isSenderMessage || isReceiverMessage) {
                    return (
                        <li key={index} className={`flex items-center space-x-2 p-4 rounded-lg 
                            ${message.sender === username ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-white'} 
                            max-w-md mx-auto`}>
                            
                            {/* Display sender's name */}
                            <span className="text-cyan-400 font-bold">{message.sender}:</span>
                            
                            {/* Display the message content */}
                            <span className="text-lightgreen">{message.msg}</span>
                        </li>
                    );
                }
                else if(!message.receiver){
                    return(<li key={index}>User is Offline</li>)
                    
                }
               

              

                return null; 
            })}
        </ul>
    );
};

export default MessageList;
