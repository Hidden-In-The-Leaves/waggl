import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import {
  Title,
  ChatContainer,
  MessageContainer,
  MessageFromMe,
  MessageFromOther,
  Message,
  MessageInput,
  MessageSendIcon,
  CircleImage,
  MessageFromOtherContainer,
  MessageInputContainer,
} from './Chat.styled';

export default function GroupChat({ sender, pack_id, socket, pack_name }) {
  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const bottomRef = useRef(null);

  socket.emit('join_room', pack_name);
  useEffect(() => {
    axios
      .get(
        `
      http://localhost:5000/api/messages/group?packId=${pack_id}`
      )
      .then(({ data }) => {
        setMessageList(data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:5000/api/messages/pack/user?userid=${sender.id}`)
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
    getLocation();
  }, [pack_id]);
  socket.on('receive_message', (message) => {
    console.log(message, messageList);
    setMessageList([...messageList, message]);
  });
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        console.log('lat: ', p.coords.latitude, 'lng: ', p.coords.longitude);
      });
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);
  const sendGroupMessage = (e) => {
    if (e.keyCode === 13 || (e.type === 'click' && message !== '')) {
      let messageData = {
        users: {
          user_id: sender.id,
          first_name: currentUser.first_name,
          last_name: currentUser.last_name,
          image: currentUser.image,
        },
        roomName: pack_name,
        message_text: message,
        posted_time: new Date(),
      };
      socket.emit('send_group_message', messageData);
      setMessageList([...messageList, messageData]);
      const newData = {
        user_id: sender.id,
        roomName: pack_name,
        message_text: message,
        posted_time: new Date(),
      };
      axios
        .post(
          `http://localhost:5000/api/messages/group?packId=${pack_id}`,
          newData
        )
        .then(() => setMessage(''))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div style={{ width: '100%' }}>
      <Title>{pack_name}</Title>
      <ChatContainer>
        {messageList.length !== 0 &&
          messageList.map((m, index) => (
            <div key={index}>
              {m.users.user_id === sender.id && (
                <MessageContainer>
                  <MessageFromMe>
                    <Message>{m.message_text}</Message>
                  </MessageFromMe>
                </MessageContainer>
              )}
              {m.users.user_id !== sender.id && (
                <div style={{ display: 'flex' }}>
                  <CircleImage src={m.users.image} />
                  <MessageFromOtherContainer>
                    <Message>
                      {m.users.first_name} {m.users.last_name}
                    </Message>
                    <MessageFromOther style={{ width: '100%' }}>
                      <Message>{m.message_text}</Message>
                    </MessageFromOther>
                  </MessageFromOtherContainer>
                </div>
              )}
              <div ref={bottomRef}></div>
            </div>
          ))}
      </ChatContainer>
      <MessageInputContainer>
        <MessageInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={sendGroupMessage}
        />
        <MessageSendIcon
          className="fa-solid fa-paper-plane"
          onClick={sendGroupMessage}
        ></MessageSendIcon>
      </MessageInputContainer>
    </div>
  );
}
