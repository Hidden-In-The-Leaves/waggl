/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Link } from 'react-router-dom';

/*
  include this component as part of your component
  that you want to use this popup for.
  props:
    userId : integer,
    open : boolean (should be set to false initially),
    onClose : callback function
    (what you want to do upon "closing" the popup, probably set the "open state" back to false)
*/
export default function OwnerDetails({ userId, open, onClose }) {
  if (!open) {
    return null;
  }
  const [userInfo, setUserInfo] = useState({});
  const [userPacks, setUserPacks] = useState([]);

  useEffect(() => {
    if (open) {
      const config = {
        method: 'GET',
        url: `/api/users/${userId}`,
      };
      axios(config)
        .then((result) => setUserInfo(result.data[0]))
        .catch((err) => console.log('error getting userinfo', err));

      const config2 = {
        method: 'GET',
        url: '/api/packs',
        params: { user_id: userId },
      };
      axios(config2)
        .then((result) => setUserPacks(result.data))
        .catch((err) => console.log('error getting user pack info', err));
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
        <Flex dir="column" ai="center" ji="center">
          <RoundImg src={userInfo.profile_pic_url} alt="person" size="170px" />
          <Title fontSize="20px">
            <b>{`${userInfo.first_name} ${userInfo.last_name}`}</b>
          </Title>
          <Title>
            {`${userInfo.city}, ${userInfo.state}`}
          </Title>
        </Flex>
        <ListContainer>
          <Flex dir="column" width="30vw" style={{ maxHeight: '40vh' }}>
            <Title>
              <b>Dogs</b>
            </Title>
            <List>
              {userInfo.dogs && userInfo.dogs.map((dog) => (
                <Item key={dog.id}>
                  <Link to={`/Profile/${dog.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <RoundImg src={dog.photos[0]} alt="dog" size="80px" />
                    <Title fontSize="14px">{dog.name}</Title>
                  </Link>
                </Item>
              ))}
            </List>
          </Flex>
          <Flex dir="column" width="30vw" style={{ maxHeight: '40vh' }}>
            <Title>
              <b>Joined Packs</b>
            </Title>
            <List>
              {userPacks && userPacks.filter((pack) => pack.joined).map((pack) => (
                <Item key={pack.id} packId={pack.id}>
                  <Link to={`/PackDetails/${pack.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <RoundImg src={pack.url} alt="a pack" size="80px" />
                    <Title fontSize="14px">{pack.name}</Title>
                  </Link>
                </Item>
              ))}
            </List>
          </Flex>
        </ListContainer>
      </DialogContent>
    </Dialog>
  );
}

const Title = styled.div`
  font-size: ${props => props.fontSize ? props.fontSize : '16px'};
  padding: 10px;
  text-align: center;
`;

const RoundImg = styled.img`
  width: ${props => props.size ? props.size : '30px'};
  height: ${props => props.size ? props.size : '30px'};
  object-fit: cover;
  border-radius: 100%;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.dir ? props.dir : 'row'};
  justify-content: ${props => props.jc ? props.jc : 'inherit'};
  align-items: ${props => props.ai ? props.ai : 'inherit'};
  width: ${props => props.width ? props.width : '100%'};
  height: ${props => props.height ? props.height : '100%'};
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-height: 20vh;
  overflow: auto;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
`;
const ListContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 4%;
  background: #F2F2F2;
  border-radius: 30px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 1 100%;
  max-width: 30%;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;