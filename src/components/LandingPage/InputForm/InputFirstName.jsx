import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, Input } from '../../../styledComponents';

export default function InputUsername({ firstnameChangeHandler }) {
  return (
    <>
      {' '}
      <InputLabel>
        First Name:
        <br />
        <Input
          id="loginEmail"
          type="text"
          name="firstname"
          required
          onChange={firstnameChangeHandler}
        />
      </InputLabel>
      <br />
    </>
  );
}

InputUsername.propTypes = {
  firstnameChangeHandler: PropTypes.func.isRequired,
};
