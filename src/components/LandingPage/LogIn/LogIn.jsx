import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NavBar from '../../NavBar/NavBar';
import {
  InputEmail,
  InputPassword,
  SignInWithGoogleButton,
  SubmitButton,
} from '../InputForm';
import { SectionTitle, Container_1_2, Button } from '../../../styledComponents';
import {
  Cols,
  CenterText,
  LinkButton,
  ContainerHalf,
} from '../StyledFormComponents';

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
      <Cols>
        <Container_1_2>something</Container_1_2>
        <ContainerHalf>
          <SectionTitle>Login</SectionTitle>
          <SignInWithGoogleButton value="Login with Google" />
          <CenterText>------------ or ------------</CenterText>
          <form>
            <InputEmail emailChangeHandler={emailChangeHandler} />
            <InputPassword passwordChangeHandler={passwordChangeHandler} />
            <SubmitButton
              value="Login"
              buttonClickHandler={loginClickHandler}
            />
          </form>
          <span>Didn't have an account?</span>
          {'    '}
          <Link to="/SignUp">
            <LinkButton type="button">Sign up</LinkButton>
          </Link>
          <br />
          <Link to="/">
            <Button type="button">This is a Link to App "Page"!</Button>
          </Link>
        </ContainerHalf>
      </Cols>
    </div>
  );
}
