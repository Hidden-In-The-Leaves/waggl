import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DiscoverChat from './DiscoverChat';
import MatchList from './MatchList';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

export default function Chat() {
  const [user, setUser] = useState('');
  const [id, setId] = useState(1);
  const [receiver, setReceiver] = useState('');
  const [receiverId, setReceiverId] = useState(2);
  const [u, setU] = useState({ id: 1, username: 'test@gmail.com' });
  const [r, setR] = useState({ id: 2, username: 'test2@gmail.com' });
  const [packId, setPackId] = useState(1);
  const clickHandler = () => {
    const sender = { id, username: user };
    setU(sender);
  };
  const clickRHandler = () => {
    const re = { id: receiverId, username: receiver };
    setR(re);
  };
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="login user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="login user id"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
        />
        <button onClick={clickHandler}>Click</button>
        <input
          type="text"
          placeholder="receiver name"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <input
          type="text"
          placeholder="receiver id"
          value={receiverId}
          onChange={(e) => setReceiverId(Number(e.target.value))}
        />
        <button onClick={clickRHandler}>Click</button>
      </div>
      <div style={{ display: 'flex' }}>
        <MatchList />
        {u.id && r.id && <DiscoverChat user1={u} user2={r} socket={socket} />}
      </div>
    </>
  );
}
