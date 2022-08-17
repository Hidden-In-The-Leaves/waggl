import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <FooterContainer>
      <Title>Waggl</Title>
      <div style={{ padding: '10px' }}>Copyright©︎ 2022</div>
    </FooterContainer>
  );
}

const Title = styled.div`
  font-size: 20px;
  font-weight: 900;
  padding: 10px 0;
`;

const StyledLink = styled(Link)`
  letter-spacing: 5px;
  text-decoration: none;
  color: white;
  border-bottom: 1px solid white;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #FF8700;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  scroll-snap-align: start;
  justify-content: center;
  border-radius: 10px 10px 0 0;
  padding: 0 3%;
  box-sizing: border-box;
  z-index: 1000;
`;