import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

export default function App() {
  return (
    <div>
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
      <Link to="/HomePage">
        <button type="button">This is a Link to the Home page!</button>
      </Link>
      <Link to=':packid/PackDetails'>
        <button type="button">This is a Link to the Pack Details page!</button>
      </Link>
      <Link to=':chatid/PackGroupChat'>
        <button type="button">This is a Link to the Pack Group Chat page!</button>
      </Link>
      <Link to=':eventid/EventDetails'>
        <button type="button">This is a Link to the Event Details page!</button>
      </Link>
      <Link to="/DiscoverMain">
        <button type="button">This is a Link to the Discover Main page!</button>
      </Link>
      <Link to=':chatid/DiscoverChat'>
        <button type="button">This is a Link to the Discover Chat page!</button>
      </Link>
      <Link to=':userid/ProfileList'>
        <button type="button">This is a Link to the Profile List page!</button>
      </Link>
      <Link to=':userid/Profile'>
        <button type="button">This is a Link to a profile page!</button>
      </Link>
      <Link to=':userid/ProfileSettings'>
        <button type="button">This is a Link to the Profile Settings page!</button>
      </Link>
      <Link to="/AccountSettings">
        <button type="button">This is a Link to the Account Settings page!</button>
      </Link>
    </div>
  );
}
