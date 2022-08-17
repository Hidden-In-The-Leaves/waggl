import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../NavBar/NavBar';
import {
  SignInWithGoogleButton,
  InputEmail,
  InputPassword,
  SubmitButton,
  InputFirstName,
  InputLastName,
} from '../InputForm';
import {
  SectionTitle,
  Container,
  Container_1_2,
  Button,
} from '../../../styledComponents';

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
      <Cols>
        <Container_1_2>Something</Container_1_2>
        <Container_1_2>
          <SectionTitle>Sign Up in here!</SectionTitle>
          <SignInWithGoogleButton value="Sign up with Google" />
          <SectionTitle>------------ or ------------</SectionTitle>
          <form>
            <InputFirstName firstnameChangeHandler={firstnameChangeHandler} />
            <InputLastName lastnameChangeHandler={lastnameChangeHandler} />
            <InputEmail emailChangeHandler={emailChangeHandler} />
            <InputPassword passwordChangeHandler={passwordChangeHandler} />
            <SubmitButton
              value="Sign Up"
              buttonClickHandler={signupClickHandler}
            />
          </form>
          <Link to="/">
            <Button>This is a Link to App "Page"!</Button>
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
