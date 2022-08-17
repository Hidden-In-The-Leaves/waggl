import React from 'react';
import styled from 'styled-components';
import NavBar from '../NavBar/NavBar';
import Footer from '../NavBar/Footer';
import AboutUsMain from './AboutUsMain';
import WhoWeAre from './WhoWeAre';
import MeetTheTeam from './MeetTheTeam';
import Team from './Team';

// take in a type depending on the login situation. could just be a store state too.
export default function AboutUs({ type = 'welcome' }) {
  return (
    <>
      <NavBar type={type} />
      <Container>
        <AboutUsMain />
        <WhoWeAre />
        <MeetTheTeam />
        <Team />
        <Footer />
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
  /* scroll-snap-type: y mandatory; */
  overflow-y: scroll;
  height: 100vh;
`;
