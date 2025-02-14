import React, { useState } from 'react';
import axios from 'axios';

const ChatWindow = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);

  const handleQuery = async () => {
    const response = await axios.post('http://localhost:5000/query', { query });
    setMessages([...messages, { text: query, isUser: true }, { text: response.data.response, isUser: false }]);
    setQuery('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.isUser ? 'right' : 'left' }}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleQuery}>Send</button>
    </div>
  );
};

export default ChatWindow;