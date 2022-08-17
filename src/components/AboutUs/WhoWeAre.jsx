/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';

export default function WhoWeAre() {
  return (
    <Container>
      <Main>
        <Title>Who We Are</Title>
        <Description style={{ width: '70%' }}>
          In a world where humans are able to connect and meet with people from all over the world, we think its time for the dogs.
          We are here to create a world where dogs can connect, play, and communicate with other dogs from all over the city.
          something like that. let us revise this paragraph later.
        </Description>
      </Main>
      <OurTeamContainer>
        <Half style={{ height: '100%' }}>
          <TeamImg src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" width="100%" height="100%"/>
        </Half>
        <Half style={{ padding: '50px' }}>
          <Title>Our Team</Title>
          <Description>
            We are a team of 7 people from Hack Reactor, where we all share the same goal of blah blah.
            blah blah. something about the team interesting.
          </Description>
        </Half>
      </OurTeamContainer>
    </Container>
  );
}


const Container = styled.div`
  height: 100vh;
  scroll-snap-align: start;
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Main = styled.div`
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 900;
`;

const Description = styled.p`
  font-size: 16px;
  color: #2F2F2F;
`;

const OurTeamContainer = styled.div`
  width: 90%;
  border: 15px solid #F2F2F2;
  height: 60%;
  margin: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const Half = styled.div`
  width: 50%;
  box-sizing: border-box;
`;

const TeamImg = styled.img`
  object-fit: cover;
`;
