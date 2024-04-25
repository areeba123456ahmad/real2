import React, { useState, useEffect, useRef } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { FaEllipsisV, FaSearch, FaTrash, FaUser } from 'react-icons/fa';
import './UserChat.css';
import logo from './logo.png';
const firebaseConfig = {
  apiKey: "AIzaSyC-VvCeAVXtxgtE3B2xeAu0WrvK8Ip5F5Q",
  authDomain: "realtime-8d524.firebaseapp.com",
  projectId: "realtime-8d524",
  storageBucket: "realtime-8d524.appspot.com",
  messagingSenderId: "130900366608",
  appId: "1:130900366608:web:69fe63600c8bb2146a0195",
  measurementId: "G-8Z58VKMZMT"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

function InspectorChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = 'Inspector';
  const messageContainerRef = useRef(null);

  useEffect(() => {
    const q = query(collection(firestore, 'conversations'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(newMessages);
      scrollToBottom(); // Scroll to bottom when new messages are fetched
    });

    return () => {
      unsubscribe();
    };
  }, [firestore]); // Trigger effect when firestore connection changes

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      await addDoc(collection(firestore, 'conversations'), {
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

  // Scroll to bottom on component mount and whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const deleteMessage = async (messageId) => {
    try {
      const messageRef = doc(firestore, 'conversations', messageId);
      await deleteDoc(messageRef);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleSearchClick = () => {
    console.log('Search button clicked');
  };

  const handleOptionsClick = () => {
    console.log('Options button clicked');
  };

  const handleUserClick = () => {
    console.log('User button clicked');
  };

  return (
    <div className="chat-container">

<div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div className="chat-header">
        <div className='nameOfsender'>
          <h1>Sims Inspector</h1>
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

export default InspectorChat;
