import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../styledComponents';

export default function NavBar({ type }) {
    return (
      <HeaderContainer>
        <Flex flexDirection="row" alignItems="center" margin="0 4%" justifyContent="space-between">
          <NameLink to={type === 'home' ? "/HomePage" : "/"}>
            Waggl
          </NameLink>
          <Flex className="nav" flexDirection="row" justifyContent="flex-end" alignItems="center">
            {type === 'home' && (
              homeNavs.map((nav) => (
                <NavItem to={nav.to} key={nav.text}>
                  <Icon src={nav.src} alt={nav.alt} />
                <NavText>{nav.text}</NavText>
                </NavItem>
              ))
            )}
            {type === 'welcome' && (
              <>
                <NavItem to="/LogIn">
                  <NavText>Login</NavText>
                </NavItem>
                <ButtonLink to="/SignUp" role="button">
                    Sign Up
                </ButtonLink>
              </>
            )}
          </Flex>
        </Flex>
      </HeaderContainer>
    );
}

const homeNavs = [
  {
    to: '/DiscoverMain',
    src: 'https://img.icons8.com/glyph-neue/64/ff8700/dog-park.png',
    alt: 'icon of a dog catching a ball',
    text: 'Discover',
  },
  {
    to: '/DiscoverChat',
    src: 'https://img.icons8.com/ios-glyphs/30/ff8700/chat.png',
    alt: 'chat icon',
    text: 'Chat',
  },
  {
    to: '/ProfileList',
    src: 'https://img.icons8.com/ios-glyphs/30/ff8700/dog-tag.png',
    alt: 'an icon of a person in a circle',
    text: 'Profiles',
  },
  {
    to: '/ProfileSettings',
    src: 'https://img.icons8.com/ios-glyphs/30/ff8700/settings--v1.png',
    alt: 'an icon of a gear wheel',
    text: 'Setting',
  },
];

const NameLink = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #FF8700;
  text-decoration: none;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;

const Icon = styled.img`
  height: 25px;
  width: 25px;
`;

const NavText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #FF8700;
`;

const HeaderContainer = styled.div`
  border-bottom: 1px solid #FF8700;
  border-radius: 30px;
  padding: 10px 0;
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10%;
  text-decoration: none;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;

const ButtonLink = styled(Link)`
  border-radius: 30px;
  font-size: 14px;
  color: white;
  background-color: #FF8700;
  padding: 3% 0;
  width: 120px;
  text-align: center;
  text-decoration: none;
  margin-left: 10px;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;