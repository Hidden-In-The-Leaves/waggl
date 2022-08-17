import React from 'react';
import styled from 'styled-components';
import NavBar from '../NavBar/NavBar';
import AboutUsMain from './AboutUsMain';
import WhoWeAre from './WhoWeAre';
import MeetTheTeam from './MeetTheTeam';
import Team from './Team';

// take in a type depending on the login situation. could just be a store state too.
export default function AboutUs({ type }) {
  return (
    <>
      <NavBar type="home" />
      <Container>
        <AboutUsMain />
        <WhoWeAre />
        <MeetTheTeam />
        <Team />
      </Container>
    </>
  );
}

const Main = styled.div`
  height: 100vh;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
`;
