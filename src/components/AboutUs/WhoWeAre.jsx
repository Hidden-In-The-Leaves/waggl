/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';

export default function WhoWeAre() {
  return (
    <Container>
      <Main>
        <Title style={{ textAlign: 'center' }}>Who We Are</Title>
        <Description>
          In a world where humans are able to connect and meet with people from all over the world, we think its time for the dogs.
          We are here to create a world where dogs can connect, play, and communicate with other dogs from all over the city.
          something like that. let us revise this paragraph later.
        </Description>
      </Main>
      <OurTeamContainer>
        <Half>
          <TeamImg src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" width="100%" height="100%"/>
        </Half>
        <Half>
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
  padding: 8vh 0;
  box-sizing: border-box;
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
  width: 70%;
  @media (max-width: 768px) {
    font-size: 24px;
    /* padding-top: 4vh; */
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #2F2F2F;
  width: 70%;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const OurTeamContainer = styled.div`
  width: 90%;
  border: 15px solid #F2F2F2;
  height: 60%;
  margin: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Half = styled.div`
  height: 100%;
  width: 50%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    box-sizing: border-box;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const TeamImg = styled.img`
  object-fit: cover;
`;
