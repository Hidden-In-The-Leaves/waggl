import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import {
  NameTitle,
  ChatContainer,
  MessageContainer,
  MessageFromMe,
  MessageFromOther,
  Message,
  MessageInput,
  MessageSendIcon,
  CloseIcon,
  CircleImage,
} from './Chat.styled';

export default function DiscoverChat({ user1, user2, socket, updateChat }) {
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/messages?user1=${user1.id}&user2=${user2.id}`
      )
      .then(({ data }) => {
        setMessagesList(data);
      })
      .catch((err) => console.log(err));
    socket.emit('user_connected', user1);
    // socket.emit("user_connected", user2);
  }, [socket, user2]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesList]);
  // socket.on("user_connected", (user) => setUserList([...userList, user]));
  socket.on('receive_message', (message) => {
    setMessagesList([...messagesList, message]);
  });

  const sendPrivateMessage = (e) => {
    if (e.keyCode === 13 || (e.type === 'click' && message !== '')) {
      let messageData = {
        sender_id: user1.id,
        receiver_id: user2.id,
        from: user1.username,
        to: user2.username,
        message_text: message,
        posted_time: new Date(),
      };
      socket.emit('send_private_message', messageData);
      setMessagesList([...messagesList, messageData]);
      axios
        .post(`http://localhost:5000/api/messages`, messageData)
        .then(() => setMessage(''))
        .catch((err) => console.log(err));
    }
  };
  const clickHandler = () => {
    navigate(`/ProfileList/${user2.id}`);
  };
  const closeChat = () => {
    updateChat();
    navigate('/DiscoverMain');
  };
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          height: '74px',
          borderBottom: '1px lightgrey solid',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', width: '70%' }}>
          <CircleImage
            src={user2.image}
            alt="img"
            style={{ margin: 'auto 15px auto 10%' }}
          />
          <NameTitle onClick={clickHandler}>{user2.owner} </NameTitle>
        </div>
        <CloseIcon
          className="fa-solid fa-circle-xmark"
          onClick={closeChat}
        ></CloseIcon>
      </div>
      <ChatContainer>
        {messagesList.map((m, index) => (
          <div key={index}>
            {/* <span>{m.posted_time}</span> */}
            {m.sender_id === user1.id && (
              <MessageContainer>
                <MessageFromMe>
                  <Message>{m.message_text}</Message>
                </MessageFromMe>
              </MessageContainer>
            )}
            {m.sender_id === user2.id && (
              <div style={{ display: 'flex' }}>
                <MessageFromOther>
                  <Message>{m.message_text}</Message>
                </MessageFromOther>
              </div>
            )}
            <div ref={bottomRef}></div>
          </div>
        ))}
      </ChatContainer>
      <div style={{ height: '60px' }}>
        <MessageInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={sendPrivateMessage}
        />
        <MessageSendIcon
          className="fa-solid fa-paper-plane"
          onClick={sendPrivateMessage}
        ></MessageSendIcon>
      </div>
    </div>
  );
}
