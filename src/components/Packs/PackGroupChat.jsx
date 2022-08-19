import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GroupChat from '../Discover/GroupChat';
import PackMemberList from './PackMemberList';
import { useUserStore } from '../Store';
import io from 'socket.io-client';
const socket = io();

export default function PackGroupChat() {
  const [packName, setPackName] = useState('');
  const { packid } = useParams();
  const [packId, setPackId] = useState(packid);

  const userInfo = useUserStore((state) => state.userInfo);

  const updatePackId = (pId, name) => {
    setPackId(pId);
    setPackName(name);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <PackMemberList
          packId={packId}
          user={userInfo}
          pack_name={packName}
          updatePackId={updatePackId}
        />
        <GroupChat
          sender={userInfo}
          socket={socket}
          pack_id={packId}
          pack_name={packName}
        />
      </div>
    </div>
  );
}
