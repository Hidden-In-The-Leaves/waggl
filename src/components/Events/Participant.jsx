import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function Participant ({ user_id }) {
  const [participantCity, setParticipantCity] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [participantURL, setParticipantURL] = useState('https://media.istockphoto.com/photos/its-a-paddle-board-time-picture-id1327654972');

  const getParticipantInfo = async (user_id) => {
    try {
      const config = {
        method: 'GET',
        url: '/api/accountSettings/userInfo',
        params: { user_id },
      };
      const response = await axios(config);
      setParticipantCity(response.data[0].city);
      setParticipantName(response.data[0].first_name);
      if (response.data[0].profile_pic_url) {
        setParticipantURL(response.data[0].profile_pic_url);
      }
    } catch (e) {
      console.log('error getting participant info', e);
    }
  };

  useEffect(() => {
    getParticipantInfo(user_id);
  }, []);

  return (
    <div>
      <RoundImg src={participantURL} style={{ display: 'inline-block' }} />
      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        <p>{participantName}</p>
        <p>{participantCity}</p>
      </div>
    </div>
  );
}

const RoundImg = styled.img`
  display: inline-block;
  width: 75px;
  height: 75px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 15px;
`;