import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
// import NavBar from './components/NavBar/NavBar';
// import { Button } from './styledComponents';

export default function App() {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['session']);
  if (cookies.session) {
    navigate('/HomePage');
  }

  return (
    <Main>
      {/* <NavBar type="welcome" /> */}
      <Center>
        {' '}
        <h1 style={{ fontWeight: '500' }}>Find new pals for your four legged friend!</h1>
        <Link to="/SignUp">
          <Button type="button">Join Today</Button>
        </Link>
      </Center>
      {/* to use react router you can wrap elements in a link component
      and use a route by setting attribute "to" equal
      to a route that is found in index.js */}
      {/* <Link to="/LogIn">
        <button type="button">This is a Link to the Log In page!</button>
      </Link>
      <Link to="/SignUp">
        <button type="button">This is a Link to the Sign Up page!</button>
      </Link>
      <Link to="/HomePage">
        <button type="button">This is a Link to the Home page!</button>
      </Link>
      <Link to="/AboutUs">
        <button type="button">This is a Link to the About Us!</button>
      </Link>
      <Link to="/PackDetails/1">
        <button type="button">This is a Link to the Pack Details page!</button>
      </Link>
      <Link to="/PackGroupChat/2">
        <button type="button">
          This is a Link to the Pack Group Chat page!
        </button>
      </Link>
      <Link to="/EventDetails/1">
        <button type="button">This is a Link to the Event Details page!</button>
      </Link>
      <Link to="/DiscoverMain">
        <button type="button">This is a Link to the Discover Main page!</button>
      </Link>
      {/* <Link to="/DiscoverChat">
        <button type="button">This is a Link to the Discover Chat page!</button>
      </Link> */}
      {/* <Link to="/ProfileList/1">
        <button type="button">This is a Link to the Profile List page!</button>
      </Link>
      <Link to="/Profile/:dogid">
        <button type="button">This is a Link to a profile page!</button>
      </Link>
      <Link to="/ProfileSettings/1">
        <button type="button">
          This is a Link to the Profile Settings page!
        </button>
      </Link>
      <Link to="/AccountSettings/1">
        <button type="button">
          This is a Link to the Account Settings page!
        </button>
      </Link>
      <Link to="/PackVideoChat/:packid">
        <button type="button">
          This is a Link to the Pack Video Chat page!
        </button>
    </Link>{' '} */}
    </Main>
  );
}

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const Main = styled.div`
  height: 100vh;
  top: 0;
  width: 100vw;
  z-index: -1;
  position: absolute;
  background-image: url('https://images.unsplash.com/photo-1597633425046-08f5110420b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80');
  background-size: cover;
  background-position: center;
`;

export const Button = styled.button`
  color: white;
  background-color: #ff8700;
  border-radius: 5px;
  padding: 3px 10px;
  border-color: #ff8700;
  border-style: solid;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
  height: 50px;
  width: 200px;
`;
