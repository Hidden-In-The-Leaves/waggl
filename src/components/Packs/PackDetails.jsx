import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../NavBar/NavBar';
import Feed from './Feed/Feed';
import Nav from './Nav/Nav';

export default function PackDetails(props) {
  return (
    <PageContainer>
      <NavBar type="home" />
      <Cols>
        <Nav packData={dummyData} fakeUsers={fakeUsers} />
        <Feed />
      </Cols>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  overflow-y: hidden;
  max-height: 100vh;
`;

const Cols = styled.div`
  display: flex;
  flex-direction: row;
`;

const dummyData = {
  bannerUrl: 'https://res.cloudinary.com/duzrmpk7h/image/upload/v1660849582/images/Rectangle_101_oiaach.png',
  packName: 'Cool Canines',
  aboutPack: 'The Cool Canines pack is a group of dog lovers who enjoy getting together for playdates and coffee.',
  calendarId: 'kpljvvfi7tlljvrjg334lcgvio@group.calendar.google.com',
};

const fakeUsers = [{ userName: 'Patt', userImageUrl: 'https://res.cloudinary.com/duzrmpk7h/image/upload/v1660860725/images/Ellipse_17_mcwn2c.png', userLocation: 'New York' }, { userName: 'Matt', userImageUrl: 'https://res.cloudinary.com/duzrmpk7h/image/upload/v1660860725/images/Ellipse_18_muu5bv.png', userLocation: 'New York' }];
