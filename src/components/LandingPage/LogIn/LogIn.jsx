import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  InputEmail,
  InputPassword,
  SignInWithGoogleButton,
  SubmitButton,
} from '../InputForm';
import { SectionTitle, Button } from '../../../styledComponents';
import {
  Cols,
  CenterText,
  LinkButton,
  ContainerHalf,
  ContainerHalfForImage,
} from '../StyledFormComponents';
import NavBar from '../../NavBar/NavBar';
import { getUser } from '../Parse';
import useUserStore from '../../../UserStore';

export default function LogIn() {
  const userId = useUserStore((state) => state.userId);
  const setUserId = useUserStore((state) => state.setUserId);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginClickHandler = () => {
    getUser(email)
      .then((response) => {
        if (
          response.data.length === 0 ||
          password !== response.data[0].password ||
          password.length > 13
        ) {
          alert('invaild username or password');
        } else {
          setUserId(response.data[0].id);
        }
        console.log(response.data);
        console.log(userId);
      })
      .catch((error) => {
        console.log('unable to get user information', error);
      });
  };
  return (
    <div>
      <NavBar type="welcome" />
      <Cols>
        <ContainerHalfForImage>
          <img
            sizes="(max-width: 767px) 100vw, 100vw"
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80"
            alt="yellow Labrador retriever biting yellow tulip flower"
          />
        </ContainerHalfForImage>
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
