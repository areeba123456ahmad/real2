import React, { useState, useEffect, useRef } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app'; // Import initializeApp from Firebase
import { FaEllipsisV, FaSearch, FaTrash, FaUser } from 'react-icons/fa'; // Import icons
import './UserChat.css'; // Import CSS for styling
import logo from './logo.png';

// New Firebase configuration for your new database
const newFirebaseConfig = {
  apiKey: "AIzaSyDXf7nweLURkhBJ8oIjnqj67hqTh50rgd4",
  authDomain: "realtimedusri.firebaseapp.com",
  projectId: "realtimedusri",
  storageBucket: "realtimedusri.appspot.com",
  messagingSenderId: "885162211561",
  appId: "1:885162211561:web:67fcd0ee0f62f17fc91878",
  measurementId: "G-K3VEDEGP5L"
};

// Initialize Firebase app outside the component
const newApp = initializeApp(newFirebaseConfig);
const newFirestore = getFirestore(newApp);

function UserChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = 'User'; // Simulated current user (replace with actual logic)

  const messageContainerRef = useRef(null);

  useEffect(() => {
    const q = query(collection(newFirestore, 'conversations'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(newMessages);

      // Scroll to bottom after messages update
      scrollToBottom();
    });

    return () => {
      unsubscribe();
    };
  }, []); // Only trigger once on component mount

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      await addDoc(collection(newFirestore, 'conversations'), {
        content: newMessage,
        sender: currentUser,
        timestamp: new Date().getTime(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const messageRef = doc(newFirestore, 'conversations', messageId);
      await deleteDoc(messageRef);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleSearchClick = () => {
    // Implement search functionality
    console.log('Search button clicked');
  };

  const handleOptionsClick = () => {
    // Implement options menu functionality
    console.log('Options button clicked');
  };

  const handleUserClick = () => {
    // Implement user menu functionality
    console.log('User button clicked');
  };

  return (
    <div className="chat-container">

      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>

      <div className="chat-header">

        <div className='nameOfsender'>

          <h1>Current User</h1>
        </div>
        <div className="chat-controls">
          <button className="control-button" onClick={handleOptionsClick}>
            <FaEllipsisV />
          </button>
          <button className="control-button" onClick={handleSearchClick}>
            <FaSearch />
          </button>
          <button className="control-button" onClick={handleUserClick}>
            <FaUser />
          </button>
        </div>
      </div>

      <div className="message-list" ref={messageContainerRef}>
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender === currentUser ? 'user-message' : 'other-message'}`}>
            {message.sender === currentUser && (
              <button className='delete-button' onClick={() => deleteMessage(message.id)}>
                <FaTrash />
              </button>
            )}
            <p className="message-text">{message.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="button">😊</button>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default UserChat;
