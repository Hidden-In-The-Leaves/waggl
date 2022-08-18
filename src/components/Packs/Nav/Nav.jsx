import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Container_1_3, Button, SubTitle, TextArea,
} from '../../../styledComponents';
import BannerImage from './BannerImage';
import Calendar from './Calendar';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function Nav({ packData }) {
  return (
    <Container_1_3>
      <BannerImage bannerUrl={packData.bannerUrl} />
      <SubTitle>About</SubTitle>
      <p>{packData.aboutPack}</p>
      <Row>
        <SubTitle>Events</SubTitle>
        <Button type="button">Add Event</Button>
      </Row>
      <Calendar calendarId={packData.calendarId} />
      <SubTitle>Group Members</SubTitle>
      <div>Group members list goes here</div>
    </Container_1_3>
  );
}

export default Nav;
