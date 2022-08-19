import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { useCookies } from 'react-cookie';

import { auth, provider } from '../../../Firebase/firebase-config';
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
import { registerCookie } from '../../../lib/cookie';

export default function LogIn() {
  const [cookies, setCookie, removeCookie] = useCookies(['session']);

  // ----------------- Zustand States ------------------
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  // ----------------- States ------------------
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ----------------- Router Navigate ------------------
  const navigate = useNavigate();

  // ----------------- Functions ------------------
  const navigateHome = () => {
    navigate('/HomePage');
  };

  const setZustandUser = ({ id, first_name, last_name, email }) => {
    const user = {
      id: id,
      firstName: first_name,
      lastName: last_name,
      email: email,
    };
    setUserInfo(user);
  };

  // ----------------- Event Handlers ------------------
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
          setZustandUser(response.data[0]);
          (async () => {
            const sessionId = await registerCookie(response.data[0].id);
            setCookie('session', sessionId);
          })();
          navigateHome();
        }
      })
      .catch((error) => {
        console.log('unable to get user information', error);
      });
  };

  const googleLoginClickHandler = () => {
    let gmail;
    signInWithPopup(auth, provider)
      .then((googleUser) => {
        gmail = googleUser._tokenResponse.email;
        return getUser(gmail);
      })
      .then((response) => {
        setZustandUser(response.data[0]);
        (async () => {
          const sessionId = await registerCookie(response.data[0].id);
          setCookie('session', sessionId);
        })();
        navigateHome();
      })
      .catch((error) => {
        alert('Invaild google account');
        console.log('Unable to sign in with Google ', error);
      });
  };

  // ----------------- Render ------------------
  return (
    <div>
      {/* <NavBar type="welcome" /> */}
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
          {/* <br />
          <Link to="/">
            <Button type="button">This is a Link to App "Page"!</Button>
          </Link> */}
        </ContainerHalf>
      </Cols>
    </div>
  );
}
