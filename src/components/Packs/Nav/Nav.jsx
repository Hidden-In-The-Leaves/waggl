import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Container_1_3, Button, SubTitle, TextArea, Title,
} from '../../../styledComponents';
import BannerImage from './BannerImage';
import Calendar from './Calendar';
import MemberRow from './MemberRow';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function Nav({ packData, fakeUsers, setShowAddEventPopUp }) {
  return (
    <Container_1_3>
      <BannerImage bannerUrl={packData.bannerUrl} />
      <Title>About</Title>
      <p>{packData.aboutPack}</p>
      <Row>
        <Title>Events</Title>
        <Button type="button" onClick={() => { setShowAddEventPopUp(true); }}>Add Event</Button>
      </Row>
      <Calendar calendarId={packData.calendarId} />
      <Row>
        <Title>Group Members</Title>
        <Button type="button">Group Chat</Button>
      </Row>
      {fakeUsers.map((user) => (<MemberRow member={user} />))}
    </Container_1_3>
  );
}

export default Nav;
