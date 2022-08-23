import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import {
  Container, Container_1_3, Button, SubTitle, TextArea, Title,
} from '../../../styledComponents';
import BannerImage from './BannerImage';
import Calendar from './Calendar';
import MemberRow from './MemberRow';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function Nav({ packData, setShowAddEventPopUp }) {
  const [packUsers, setPackUsers] = useState([]);
  const { packid } = useParams();

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/packs/users',
      params: {
        pack_id: packid,
      },
    })
      .then((result) => setPackUsers(result.data))
      .catch((err) => console.log('Error getting pack users', err));
  }, []);

  useEffect(() => {
    console.log(packUsers);
  }, [packUsers])

  if (!packData) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <NavContainer>
      <BannerImage bannerUrl={packData.pack_profile_pic_url} />
      <Container>
        <SubTitle>About</SubTitle>
        <p>{packData.description}</p>
        <Row>
          <SubTitle>Events</SubTitle>
          <Button type="button"  style={{ margin: '20px 0' }} onClick={() => { setShowAddEventPopUp(true); }}>Add Event</Button>
        </Row>
        <Calendar calendarId={packData.calendar_id} />
        <Row>
          <SubTitle>Group Members</SubTitle>
          <Link to={`/PackGroupChat/${packid}`}>
            <Button type="button" style={{ margin: '20px 0' }}>Group Chat</Button>
          </Link>
        </Row>
        {packUsers.map((user) => (<MemberRow member={user} />))}
      </Container>
    </NavContainer>
  );
}

export default Nav;


const NavContainer = styled(Container_1_3)`
  padding: 0;
  overflow: auto;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
`;