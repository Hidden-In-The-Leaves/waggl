import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DiscoverChat from './DiscoverChat';
import MatchList from './MatchList';
import MainSection from './MainSection';
import { useUserStore } from '../../Store.js';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

export default function Chat() {
  const [user, setUser] = useState('');
  const [receiver, setReceiver] = useState({});
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [match, setMatch] = useState({});
  const [showInfo, setShowInfo] = useState(true);
  const [updateList, setUpdateList] = useState(true);
  const userInfo = useUserStore((state) => state.userInfo);

  const getDefaultMatch = (data) => {
    setMatch(data);
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        setLat(p.coords.latitude);
        setLng(p.coords.longitude);
      });
    }
  };
  useEffect(() => {
    getLocation();
  });
  const updateReceiver = (data) => {
    setShowInfo(false);
    setReceiver(data);
  };
  const updateChat = () => {
    setShowInfo(true);
  };
  const updateMatchList = () => {
    setUpdateList(!updateList);
  };
  return (
    <>
      <div style={{ display: 'flex' }}>
        <MatchList
          user={userInfo}
          updateReceiver={updateReceiver}
          updateList={updateList}
        />
        {showInfo && (
          <MainSection
            lat={lat}
            lng={lng}
            getDefaultMatch={getDefaultMatch}
            updateMatchList={updateMatchList}
          />
        )}
        {!showInfo && (
          <DiscoverChat
            user1={userInfo}
            user2={receiver}
            socket={socket}
            updateChat={updateChat}
          />
        )}
      </div>
    </>
  );
}
