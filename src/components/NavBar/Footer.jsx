import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <FooterContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Title>Waggl</Title>
        <div style={{ padding: '10px' }}>Copyright©︎ 2022 Waggl</div>
      </div>
      <StyledLink to="/AboutUs">About Us</StyledLink>
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
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  padding: 0 3%;
  box-sizing: border-box;
`;