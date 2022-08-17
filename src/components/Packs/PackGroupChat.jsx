import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GroupChat from "../Discover/DiscoverChat/GroupChat";
import PackMemberList from "./PackMemberList";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

export default function PackGroupChat({ pack }) {
  const [packId, setPackId] = useState(1);
  // const user = { id: 1, username: "test" };
  const [user, setUser] = useState("");
  const [id, setId] = useState(1);
  const [u, setU] = useState({ id: 1, username: "test@gmail.com" });
  const [packName, setPackName] = useState("test pack");

  const updatePackId = (pId, name) => {
    console.log(id, name);
    setPackId(pId);
    setPackName(name);
  };
  const clickHandler = () => {
    const sender = { id, username: user };
    setU(sender);
  };
  return (
    <div>
      <input
        type='text'
        placeholder='login user'
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type='text'
        placeholder='login user id'
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
      />
      <button onClick={clickHandler}>Click</button>
      <div style={{ display: "flex" }}>
        <PackMemberList
          packId={packId}
          user={u}
          pack_name={packName}
          updatePackId={updatePackId}
        />
        <GroupChat
          sender={u}
          socket={socket}
          pack_id={packId}
          pack_name={packName}
        />
      </div>
    </div>
  );
}
