import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, Input } from '../../../styledComponents';

export default function InputUsername({ passwordChangeHandler }) {
  return (
    <>
      <InputLabel>
        Password:
        <br />
        <Input
          id="loginPassword"
          type="text"
          name="password"
          required
          onChange={passwordChangeHandler}
        />
      </InputLabel>
      <br />
    </>
  );
}

InputUsername.propTypes = {
  passwordChangeHandler: PropTypes.func.isRequired,
};
