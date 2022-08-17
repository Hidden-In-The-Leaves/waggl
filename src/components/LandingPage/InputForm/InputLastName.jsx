import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, Input } from '../../../styledComponents';

export default function InputUsername({ lastnameChangeHandler }) {
  return (
    <>
      {' '}
      <InputLabel>
        Last Name:
        <br />
        <Input
          id="loginEmail"
          type="text"
          name="firstname"
          required
          onChange={lastnameChangeHandler}
        />
      </InputLabel>
      <br />
    </>
  );
}

InputUsername.propTypes = {
  lastnameChangeHandler: PropTypes.func.isRequired,
};
