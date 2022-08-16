import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../NavBar/NavBar';
import InputUsername from '../InputUsername';
import InputPassword from '../InputPassword';
import SignInWithGoogleButton from '../SignInWithGoogleButton';
import SubmitButton from '../SubmitButton';

export default function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginClickHandler = () => {
    console.log(username, ' && ', password);
  };
  return (
    <div>
      <NavBar type="welcome" />
      <h3>Login</h3>
      <SignInWithGoogleButton />
      <p>------------ or ------------</p>
      <form>
        <InputUsername usernameChangeHandler={usernameChangeHandler} />
        <InputPassword passwordChangeHandler={passwordChangeHandler} />
        <SubmitButton value="Login" buttonClickHandler={loginClickHandler} />
      </form>
      <Link to="/">
        <button type="button">This is a Link to App "Page"!</button>
      </Link>
    </div>
  );
}
