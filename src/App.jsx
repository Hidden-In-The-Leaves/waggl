import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './components/NavBar/NavBar';

export default function App() {
  return (
    <Main>
      <NavBar type="welcome" />
      <h1>This is the app!</h1>
      {/* to use react router you can wrap elements in a link component
      and use a route by setting attribute "to" equal
      to a route that is found in index.js */}
      <Link to="/LogIn">
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
      </Link>
    </Main>
  );
}

const Main = styled.div`
  height: 100vh;
  scroll-snap-align: start;
  top: 0;
  width: 100vw;
  z-index: -1;
  opacity: 0.8;
  background-image: url('https://images.unsplash.com/photo-1597633425046-08f5110420b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80');
  background-size: cover;
`;
