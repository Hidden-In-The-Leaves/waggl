import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './components/NavBar/NavBar';
// import { Button } from './styledComponents';

export default function App() {
  return (
    <Main>
      <NavBar type="welcome" />
      <Center>
        {' '}
        <h1>This is the app!</h1>
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
      <Link to="/HomePage/:userid">
        <button type="button">This is a Link to the Home page!</button>
      </Link>
      <Link to="/AboutUs">
        <button type="button">This is a Link to the About Us!</button>
      </Link>
      <Link to="/PackDetails/:packid">
        <button type="button">This is a Link to the Pack Details page!</button>
      </Link>
      <Link to="/PackGroupChat/:packid">
        <button type="button">
          This is a Link to the Pack Group Chat page!
        </button>
      </Link>
      <Link to="/EventDetails/:eventid">
        <button type="button">This is a Link to the Event Details page!</button>
      </Link>
      <Link to="/DiscoverMain/:userid">
        <button type="button">This is a Link to the Discover Main page!</button>
      </Link>
      <Link to="/DiscoverChat/:chatid">
        <button type="button">This is a Link to the Discover Chat page!</button>
      </Link>
      <Link to="/ProfileList/:userid">
        <button type="button">This is a Link to the Profile List page!</button>
      </Link>
      <Link to="/Profile/:dogid">
        <button type="button">This is a Link to a profile page!</button>
      </Link>
      <Link to="/ProfileSettings/:userid">
        <button type="button">
          This is a Link to the Profile Settings page!
        </button>
      </Link>
      <Link to="/AccountSettings/:userid">
        <button type="button">
          This is a Link to the Account Settings page!
        </button>
      </Link> */}
    </Main>
  );
}

const Center = styled.div`
  top: 45%;
  left: 45%;
  text-align: center;
  position: absolute;
`;

const Main = styled.div`
  height: 100vh;
  top: 0;
  width: 100vw;
  z-index: -1;
  background-image: url('https://images.unsplash.com/photo-1600077029182-92ac8906f9a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
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
