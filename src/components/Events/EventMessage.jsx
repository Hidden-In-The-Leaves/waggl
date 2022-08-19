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
        url: '/api/events/user',
        params: { user_id },
      };
      const response = await axios(config);
      setPosterInfo(response.data[0]);
      setProfilePic(response.data[0].profile_pic_url);
    } catch (e) {
      console.log('error getting poster info', e);
    }
  };

  useEffect(() => {
    getPosterInfo(message.poster_id);
  }, []);

  const picture = ((message.photo_url) ? <img style={{ height: '100px', marginTop: '100px', marginLeft: '20%' }} src={message.photo_url} alt="pic in posted message" /> : null);

  return (
    <div style={{ margin: '10px 20px' }}>
      <RoundImg src={profilePic} style={{ display: 'inline-block', marginTop: '20px' }} />
      <span style={{ margin: '50px', fontSize: '40px' }}>{message.text}</span>
      {picture}
      <div style={{ marginTop: '20px', marginLeft: '20px' }}>
        <span style={{ marginRight: '20px', display: 'inline', fontSize: '25px' }}><u>{posterInfo.first_name}</u></span>
        <span>{message.posted_time}</span>
      </div>
    </div>
  );
}

const RoundImg = styled.img`
  width: 75px;
  height: 75px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 3%;
`;
