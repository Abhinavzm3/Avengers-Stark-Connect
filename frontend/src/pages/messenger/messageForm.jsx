import React, { useState } from "react";
import { Button } from '@/components/ui/button';

const MessageForm = ({ onSubmit }) => {
    const [message, setMessage] = useState('');
    const [mymessage,setmy]=useState('')

    const handleSubmit = (e) => {
      e.preventDefault();
      if (message.trim()) {
        onSubmit(message);
        setMessage('');  
      }
    };

    return (<>


        <form onSubmit={handleSubmit} className="space-y-6 h-11">
          
          <input
            type="text"
            value={message}
            onChange={(e) => (setMessage(e.target.value),
            setmy(e.target.value))}
            placeholder="Type your message"
            className="w-full max-w-md border bg-gray-600 text-black border-cyan-500 p-4 rounded-lg  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <Button 
            type="submit" 
            className="w-full max-w-md px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full font-bold transition duration-300"
            disabled={!message.trim()}
          >
            Send
          </Button>
        </form>
      </>
    );
};

export default MessageForm;
