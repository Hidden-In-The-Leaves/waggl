import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  SignInWithGoogleButton,
  InputEmail,
  InputPassword,
  SubmitButton,
  InputFirstName,
  InputLastName,
} from '../InputForm';
import { SectionTitle, Container_1_2, Button } from '../../../styledComponents';
import {
  Cols,
  CenterText,
  LinkButton,
  ContainerHalf,
} from '../StyledFormComponents';
import NavBar from '../../NavBar/NavBar';
import { createUser } from '../Parse';
import useUserStore from '../../../UserStore';

export default function SignUp() {
  const setUserId = useUserStore((state) => state.setUserId);
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
    // console.log(email, ' && ', password, ' && ', firstName, ' && ', lastName);
    createUser(firstName, lastName, password, email)
      .then((response) => {
        console.log(response.data);
        setUserId(response.data[0].user_id);
      })
      .catch((error) => {
        console.log('unable to create user ', error);
      });
  };
  return (
    <div>
      <NavBar type="welcome" />
      <Cols>
        <Container_1_2>Something</Container_1_2>
        <ContainerHalf>
          <SectionTitle>Sign Up</SectionTitle>
          <SignInWithGoogleButton value="Sign up with Google" />
          <CenterText>------------ or ------------</CenterText>
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
          <span>Already have an account</span>
          {'   '}
          <Link to="/LogIn">
            <LinkButton type="button">Login</LinkButton>
          </Link>
          <br />
          <Link to="/">
            <Button>This is a Link to App "Page"!</Button>
          </Link>
        </ContainerHalf>
      </Cols>
    </div>
  );
}
