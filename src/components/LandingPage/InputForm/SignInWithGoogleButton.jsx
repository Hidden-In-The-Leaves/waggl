import React from 'react';
import PropTypes from 'prop-types';

import signInWithGoogle from '../../../Firebase/firebase-config';

export default function SignInWithGoogle({ value }) {
  return (
    <button type="button" onClick={signInWithGoogle}>
      {value}
    </button>
  );
}

SignInWithGoogle.propTypes = {
  value: PropTypes.string.isRequired,
};
