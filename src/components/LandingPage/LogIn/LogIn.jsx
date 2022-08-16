import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar';

export default function LogIn(props) {
  return (
    <div>
      <NavBar type="welcome" />
      <h1>Log in here!</h1>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
    </div>
  );
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
