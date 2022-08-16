import React from 'react';
import signInWithGoogle from '../../Firebase/firebase-config';

export default function SignInWithGoogle() {
  return (
    <button type="button" onClick={signInWithGoogle}>
      Signn in with google
    </button>
  );
}
