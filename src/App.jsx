import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

export default function App() {
  return (
    <div>
      {/* <NavBar type='welcome' /> */}
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
      <Link to="/HomePage/1">
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
      <Link to="/DiscoverMain/1">
        <button type="button">This is a Link to the Discover Main page!</button>
      </Link>
      <Link to="/DiscoverChat/1">
        <button type="button">This is a Link to the Discover Chat page!</button>
      </Link>
      <Link to="/ProfileList/1">
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
    </div>
  );
}
