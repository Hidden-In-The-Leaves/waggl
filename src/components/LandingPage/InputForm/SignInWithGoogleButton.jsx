import React from 'react';
import PropTypes from 'prop-types';

import signInWithGoogle from '../../../Firebase/firebase-config';
import { GoogleButton } from '../StyledFormComponents';

export default function SignInWithGoogle({ value }) {
  return (
    <>
      {/* {GoogleLogo} */}
      <GoogleButton type="button" onClick={signInWithGoogle}>
        {/* <img
          src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
          alt="Google Logo"
          height="20"
          width="20"
        /> */}
        {value}
      </GoogleButton>
    </>
  );
}

SignInWithGoogle.propTypes = {
  value: PropTypes.string.isRequired,
};
