import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false); // To handle loading state
    const [error, setError] = useState('');
    const endOfMessagesRef = useRef(null); // Reference to the last message

    // Scroll to the bottom when messages change
    useEffect(() => {
        if (endOfMessagesRef.current) {
            // Ensure the chat scrolls to the last message
            endOfMessagesRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end", // Align the last message to the bottom of the container
            });
        }
    }, [messages]); // Dependency array ensures scroll happens when messages change

    const sendMessage = async () => {
        // Create a user message object
        const userMessage = { text: input, sender: 'user' };
        // Update the messages state with the user message
        setMessages(prevMessages => [...prevMessages, userMessage]);

        // Clear the error if a new message is sent
        setError('');

        try {
            // Set loading to true when awaiting response from the backend
            setLoading(true);

            // Send the user's message to the backend
            const response = await axios.post(
                'http://localhost:8000/api/v1/chat',
                { messages: input },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            // Create a bot's message object
            const botMessage = { text: response.data.reply, sender: 'bot' };
            // Update the messages state with the bot's response
            setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);

        } catch (error) {
            console.log(error);
            setError('Something went wrong! Please try again later.');
        } finally {
            // Set loading to false after the response
            setLoading(false);
        }

        // Clear the input field
        setInput('');
    };

    return (
        <div className="bg-slate-500 text-red-700 p-4">
            {/* Error Message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Messages Display */}
            <div className="bg-slate-500 overflow-auto max-h-80 mb-4 p-2">
                {messages.map((msg, index) => (
                    <p key={index} className={`text-${msg.sender === 'user' ? 'blue' : 'green'}-600 text-left`}>
                        {msg.text}
                    </p>
                ))}

                {/* Loading indicator */}
                {loading && <p className="text-yellow-500">Bot is typing...</p>}

                {/* Empty div to force scroll to the bottom */}
                <div ref={endOfMessagesRef} />
            </div>

            {/* Input Field */}
            <div className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 p-2 border rounded"
                    placeholder="Type a message..."
                    disabled={loading} // Disable input when loading
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 p-2 bg-blue-600 text-white rounded"
                    disabled={loading} // Disable button when loading
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
