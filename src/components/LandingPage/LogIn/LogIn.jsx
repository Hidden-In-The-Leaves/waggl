import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../NavBar/NavBar';
import {
  InputEmail,
  InputPassword,
  SignInWithGoogleButton,
  SubmitButton,
} from '../InputForm';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginClickHandler = () => {
    console.log(email, ' && ', password);
  };
  return (
    <div>
      <NavBar type="welcome" />
      <h3>Login</h3>
      <SignInWithGoogleButton value="Login with Google" />
      <p>------------ or ------------</p>
      <form>
        <InputEmail emailChangeHandler={emailChangeHandler} />
        <InputPassword passwordChangeHandler={passwordChangeHandler} />
        <SubmitButton value="Login" buttonClickHandler={loginClickHandler} />
      </form>
      <Link to="/">
        <button type="button">This is a Link to App "Page"!</button>
      </Link>
    </div>
  );
}
