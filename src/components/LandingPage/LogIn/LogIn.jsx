import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../NavBar/NavBar';
import InputUsername from '../InputUsername';
import InputPassword from '../InputPassword';
import SignInWithGoogleButton from '../SignInWithGoogleButton';
import SubmitButton from '../SubmitButton';

export default function LogIn(props) {
  return (
    <div>
      <NavBar type="welcome" />
      <h3>Login</h3>
      <SignInWithGoogleButton />
      <p>------------ or ------------</p>
      <form>
        <InputUsername />
        <InputPassword />
        <SubmitButton value="Login" />
      </form>
      <Link to="/">
        <button type="button">This is a Link to App "Page"!</button>
      </Link>
    </div>
  );
}
