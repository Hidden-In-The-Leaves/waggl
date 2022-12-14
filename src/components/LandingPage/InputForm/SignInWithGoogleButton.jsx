import React from 'react';
import PropTypes from 'prop-types';

// import { signInWithGoogle } from '../../../Firebase/firebase-config';
import { GoogleButton, CenterImg, CenterSpan } from '../StyledFormComponents';

export default function SignInWithGoogle({ value, userActionHandler }) {
  return (
    <>
      {/* {GoogleLogo} */}
      <GoogleButton type="button" onClick={userActionHandler}>
        <CenterImg
          src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
          alt="Google Logo"
          height="20"
          width="20"
        />

        <CenterSpan>{value}</CenterSpan>
      </GoogleButton>
    </>
  );
}

SignInWithGoogle.propTypes = {
  value: PropTypes.string.isRequired,
  userActionHandler: PropTypes.func.isRequired,
};
