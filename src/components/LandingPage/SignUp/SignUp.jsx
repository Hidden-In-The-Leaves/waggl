import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';

import { auth, provider } from '../../../Firebase/firebase-config';
import {
  SignInWithGoogleButton,
  InputEmail,
  InputPassword,
  SubmitButton,
  InputFirstName,
  InputLastName,
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
import { createUser, createThirdProviderUser } from '../Parse';
import { useUserStore } from '../../Store';

export default function SignUp() {
  // ----------------- Zustand States ------------------
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  // ----------------- States ------------------
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ----------------- Router Navigate ------------------
  const navigate = useNavigate();

  // ----------------- Functions ------------------
  const setZustandUser = ({ user_id }, firstname, lastname, eMail) => {
    const user = {
      id: user_id,
      firstName: firstname,
      lastName: lastname,
      email: eMail,
    };
    setUserInfo(user);
  };

  const validateEmail = (email) =>
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  const navigateHome = () => {
    navigate('/HomePage/:userid');
  };

  // ----------------- Event Handler ------------------
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
    if (password.length > 13) {
      alert("Your password can't be longer than 13 character");
    } else if (validateEmail(email)) {
      createUser(firstName, lastName, password, email)
        .then((response) => {
          setZustandUser(response.data[0], firstName, lastName, email);
          navigateHome();
        })
        .catch((error) => {
          console.log('unable to create user ', error);
        });
    } else {
      alert('invaild email');
    }
  };

  const googleSignupClickHandler = (data) => {
    let gFirstName, gLastName, gmail, photoUrl;
    signInWithPopup(auth, provider)
      .then((googleUser) => {
        const googleUserInfor = googleUser._tokenResponse;
        gFirstName = googleUserInfor.firstName;
        gLastName = googleUserInfor.lastName;
        gmail = googleUserInfor.email;
        photoUrl = googleUserInfor.photoUrl;
        return createThirdProviderUser(gFirstName, gLastName, gmail, photoUrl);
      })
      .then((response) => {
        setZustandUser(response.data[0], gFirstName, gLastName, gmail);
        navigateHome();
      })
      .catch((error) => {
        console.log('Unable to sign up with Google ', error);
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
            src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1100&q=60"
            alt="a sitting dogr"
            height="100%"
            width="100%"
          />
        </ContainerHalfForImage>
        <ContainerHalf>
          <SectionTitle>Sign Up</SectionTitle>
          <SignInWithGoogleButton
            value="Sign up with Google"
            userActionHandler={googleSignupClickHandler}
          />
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
