import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function App () {
  return (
    <div>
      <h1>This is the app!</h1>
      {/* to use react router you can wrap elements in a link component
      and use a route by setting attribute "to" equal
      to a route that is found in index.js*/}
      <Link to="/LogIn">
        <Button>This is a Link to the Log In page!</Button>
      </Link>
      <Link to="/SignUp">
        <Button>This is a Link to the Sign Up page!</Button>
      </Link>
      <Link to="/HomePage">
        <Button>This is a Link to the Home page!</Button>
      </Link>
      <Link to="/PackDetails">
        <Button>This is a Link to the Pack Details page!</Button>
      </Link>
      <Link to="/PackGroupChat">
        <Button>This is a Link to the Pack Group Chat page!</Button>
      </Link>
      <Link to="/EventDetails">
        <Button>This is a Link to the Event Details page!</Button>
      </Link>
      <Link to="/DiscoverMain">
        <Button>This is a Link to the Discover Main page!</Button>
      </Link>
      <Link to="/DiscoverChat">
        <Button>This is a Link to the Discover Chat page!</Button>
      </Link>
      <Link to="/ProfileList">
        <Button>This is a Link to the Profile List page!</Button>
      </Link>
      <Link to="/Profile">
        <Button>This is a Link to a profile page!</Button>
      </Link>
      <Link to="/ProfileSettings">
        <Button>This is a Link to the Profile Settings page!</Button>
      </Link>
    </div>
  )
}

const Button = styled.button`
  padding: 10px;
  margin: 10px;
`;