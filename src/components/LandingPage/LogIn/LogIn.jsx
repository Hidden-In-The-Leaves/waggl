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
import {
  SectionTitle,
  Container,
  Container_1_2,
  Button,
} from '../../../styledComponents';

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
        <Container_1_2>
          <SectionTitle>Login</SectionTitle>
          <SignInWithGoogleButton value="Login with Google" />
          <SectionTitle>------------ or ------------</SectionTitle>
          <form>
            <InputEmail emailChangeHandler={emailChangeHandler} />
            <InputPassword passwordChangeHandler={passwordChangeHandler} />
            <SubmitButton
              value="Login"
              buttonClickHandler={loginClickHandler}
            />
          </form>
          <Link to="/">
            <Button type="button">This is a Link to App "Page"!</Button>
          </Link>
        </Container_1_2>
      </Cols>
    </div>
  );
}

const Cols = styled.div`
  display: flex;
  flex-direction: row;
`;
