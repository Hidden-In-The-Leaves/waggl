import React from 'react';
import styled from 'styled-components';

export default function AboutUsMain() {
  return (
    <Main>
      <Title>About Us</Title>
    </Main>
  );
}

const Main = styled.div`
  height: 100vh;
  scroll-snap-align: start;
  /* position: absolute; */
  top: 0;
  width: 100vw;
  z-index: -1;
  opacity: 0.8;
  background-image: url("https://images.unsplash.com/photo-1558929996-da64ba858215?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80");
   background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 900;
  color: white;
`;
