import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import {
  Title,
  ChatContainer,
  MessageContainer,
  MessageFromMe,
  MessageFromOther,
  Message,
  MessageInput,
  MessageSendIcon,
} from "./Chat.styled";

export default function GroupChat({ sender, pack_id, socket, pack_name }) {
  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const bottomRef = useRef(null);

  socket.emit("join_room", pack_name);
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
  }, [pack_id]);
  socket.on("receive_message", (message) => {
    console.log(message, messageList);
    setMessageList([...messageList, message]);
  });
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);
  const sendGroupMessage = (e) => {
    if (e.keyCode === 13 || (e.type === "click" && message !== "")) {
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
      socket.emit("send_group_message", messageData);
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
        .then(() => setMessage(""))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div style={{ width: "100%" }}>
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
                <div style={{ display: "flex" }}>
                  <img
                    src={m.users.image}
                    style={{
                      height: "55px",
                      width: "55px",
                      borderRadius: "50%",
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p style={{ margin: "0", padding: "0 10px" }}>
                      {m.users.first_name} {m.users.last_name}
                    </p>
                    <MessageFromOther>
                      <p style={{ padding: "0 10px" }}>{m.message_text}</p>
                    </MessageFromOther>
                  </div>
                </div>
              )}
              <div ref={bottomRef}></div>
            </div>
          ))}
      </ChatContainer>
      <div style={{ height: "60px" }}>
        <MessageInput
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={sendGroupMessage}
        />
        <MessageSendIcon
          className='fa-solid fa-paper-plane'
          onClick={sendGroupMessage}
        ></MessageSendIcon>
      </div>
    </div>
  );
}
