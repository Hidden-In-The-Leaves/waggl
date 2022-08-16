import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../NavBar/NavBar';
import SignInWithGoogleButton from '../SignInWithGoogleButton';
import InputEmail from '../InputEmail';
import InputPassword from '../InputPassword';
import SubmitButton from '../SubmitButton';
import InputFirstName from '../inputFirstName';
import InputLastName from '../InputLastName';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const firstnameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };
  const lastnameChangeHandler = (e) => {
    setLastName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const signupClickHandler = () => {
    console.log(email, ' && ', password, ' && ', firstName, ' && ', lastName);
  };
  return (
    <div>
      <NavBar type="welcome" />
      <h1>Sign Up in here!</h1>
      <SignInWithGoogleButton value="Sign up with Google" />
      <p>------------ or ------------</p>
      <form>
        <InputFirstName firstnameChangeHandler={firstnameChangeHandler} />
        <InputLastName lastnameChangeHandler={lastnameChangeHandler} />
        <InputEmail emailChangeHandler={emailChangeHandler} />
        <InputPassword passwordChangeHandler={passwordChangeHandler} />
        <SubmitButton value="Login" buttonClickHandler={signupClickHandler} />
      </form>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
    </div>
  );
}
