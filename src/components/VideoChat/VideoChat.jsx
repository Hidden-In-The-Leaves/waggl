import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
import Room from './Room';
import { useUserStore } from '../Store';
import { Title, Button } from '../../styledComponents';

// useCallback memoizes functions.
// doesn't get redefined everytime this component is rendered/called.

export default function VideoChat() {
  const [pack, setPack] = useState({});
  // console.log(pack)
  const [token, setToken] = useState(null);
  const userInfo = useUserStore((state) => state.userInfo);

  const { packid } = useParams();

  const getToken = useCallback(async () => {
    const config = {
      method: 'GET',
      url: '/api/video/token',
      params: {
        // TODO: should be changed to below after testing phase
        id: `${userInfo.id}:${userInfo.firstName} ${userInfo.lastName}`,
        packname: packid,
      },
    };
    axios(config)
      .then((result) => {
        setToken(result.data.token);
      })
      .catch((err) => console.log(err));
  }, [userInfo]);


  const getPackDetails = () => {
    axios.get(`/api/packs/${packid}`)
      .then((result) => setPack(result.data[0]))
      .catch((err) => console.log('error fetching pack details', err));
  };

  const exit = useCallback(() => {
    setToken(null);
  }, []);

  useEffect(() => {
    if (userInfo.id) {
      getToken();
    }
    getPackDetails();
    return () => exit();
  }, []);

  return (
    <div style={{ width: '66%', margin: 'auto', paddingBottom: '50px' }}>
      <TitleBar>
        <FlexContainer>
          <RoundImg src={pack.pack_profile_pic_url} />
          <FlexColumn>
            <Title style={{ margin: '0' }}>{pack.pack_name}</Title>
            <div style={{ fontSize: '14px' }}>{pack.description}</div>
          </FlexColumn>
        </FlexContainer>
        {token && <Button type="button" onClick={exit}>exit</Button>}
        {!token && (
          <Link to={`/PackGroupChat/${packid}`}>
            <Button type="button">Back to Chat</Button>
          </Link>
        )}
      </TitleBar>
      <Room pack={pack} token={token} />
    </div>
  );
}

const FlexContainer = styled.div`
  display: flex;
  box-sizing:border-box;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 5% 0;
`;

const FlexColumn = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 10vh;
  border-bottom: 1px solid #D9D9D9;
`;

const RoundImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 3%;
`;

const SelfContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;