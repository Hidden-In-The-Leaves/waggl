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
  HalfImg,
} from '../StyledFormComponents';
import NavBar from '../../NavBar/NavBar';
import { getUser } from '../Parse';
import { useUserStore } from '../../Store';

export default function LogIn() {
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = ({ id, first_name, last_name, email }) => {
    const user = {
      id: id,
      firstName: first_name,
      lastName: last_name,
      email: email,
    };
    console.log(user);
    setUserInfo(user);
  };
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
          setUser(response.data[0]);
        }
        console.log(response.data);
        console.log(userInfo);
      })
      .catch((error) => {
        console.log('unable to get user information', error);
      });
  };

  const googleLoginClickHandler = (data) => {
    //     /**
    //      *{_tokenResponse:
    //       {
    //         email: string
    //         firstName: string
    //         lastName: string
    //         photoUrl:string
    //         displayName:string
    //         fullName: string
    //       }
    getUser(data.email)
      .then((response) => {
        setUser(response.data[0]);
        console.log('Login ', response.data);
      })
      .catch((error) => {
        console.log('unable to get user information', error);
      });
  };
  const something = {
    position: 'absolute',
    'align-self': 'start',
  };
  return (
    <div>
      <NavBar type="welcome" />
      <Cols>
        <ContainerHalfForImage>
          <HalfImg
            // sizes="(max-width: 767px) 100vw, 100vw"
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80"
            alt="yellow Labrador retriever biting yellow tulip flower"
            height="100%"
            width="100%"
          />
        </ContainerHalfForImage>
        <ContainerHalf>
          <SectionTitle>Login</SectionTitle>
          <SignInWithGoogleButton
            value="Login with Google"
            userActionHandler={googleLoginClickHandler}
          />
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
