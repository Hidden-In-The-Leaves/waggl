import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { InputLabel, Input } from '../../../styledComponents';

export default function InputUsername({ passwordChangeHandler }) {
  const passwordRef = createRef();

  function togglePassword() {
    const x = passwordRef.current;
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

  return (
    <>
      <InputLabel>
        Password:
        <br />
        <Input
          ref={passwordRef}
          id="loginPassword"
          type="password"
          name="password"
          required
          onChange={passwordChangeHandler}
        />
      </InputLabel>
      <input type="checkbox" onClick={togglePassword} />
      <span>Show Password</span>
      <br />
    </>
  );
}

InputUsername.propTypes = {
  passwordChangeHandler: PropTypes.func.isRequired,
};
