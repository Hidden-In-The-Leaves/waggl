import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function EventMessage({message}) {
  const [profilePic, setProfilePic] = useState('https://media.istockphoto.com/photos/dog-uses-laptop-picture-id1391430520');
  const [posterInfo, setPosterInfo] = useState({});

  const getPosterInfo = async (user_id) => {
    try {
      const config = {
        method: 'GET',
        url: 'http://localhost:3000/api/accountSettings/userInfo',
        params: { user_id },
      };
      const response = await axios(config);
      console.log(response.data[0]);
      setPosterInfo(response.data[0]);
      setProfilePic(response.data[0].profile_pic_url);
    } catch (e) {
      console.log('error getting poster info', e);
    }
  };

  useEffect(() => {
    getPosterInfo(message.poster_id);
  }, []);

  return (
    <div style={{ margin: '10px 20px' }}>
      <RoundImg src={profilePic} />
      <span style={{ marginRight: '20px' }}>{posterInfo.first_name}</span>
      <span>{message.posted_time}</span>
      <p>{message.text}</p>
      <img style={{ height: '100px' }} src={message.photo_url || null} alt="pic in posted message" />
    </div>
  );
}

const RoundImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 3%;
`;
