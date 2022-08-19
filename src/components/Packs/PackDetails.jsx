import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Feed from './Feed/Feed';
import Nav from './Nav/Nav';
import AddEventModal from './AddEventModal';

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

const fakeUsers = [{ userName: 'Patt', userImageUrl: 'https://res.cloudinary.com/duzrmpk7h/image/upload/v1660860725/images/Ellipse_17_mcwn2c.png', userLocation: 'New York' }, { userName: 'Matt', userImageUrl: 'https://res.cloudinary.com/duzrmpk7h/image/upload/v1660860725/images/Ellipse_18_muu5bv.png', userLocation: 'Jersey City' }];

export default function PackDetails(props) {
  const [showAddEventPopUp, setShowAddEventPopUp] = useState(false);

  return (
    <PageContainer>
      <Cols>
        <Nav
          packData={dummyData}
          fakeUsers={fakeUsers}
          setShowAddEventPopUp={setShowAddEventPopUp}
        />
        <Feed packData={dummyData} />
      </Cols>
      {showAddEventPopUp ? <AddEventModal setShowAddEventPopUp={setShowAddEventPopUp} /> : null}
    </PageContainer>
  );
}
