import React from 'react';
import PropTypes from 'prop-types';

import { InputLabel, Input } from '../../../styledComponents';

export default function InputUsername({ emailChangeHandler }) {
  return (
    <>
      {' '}
      <InputLabel>
        Email:
        <br />
        <Input
          id="loginEmail"
          type="text"
          name="email"
          required
          onChange={emailChangeHandler}
        />
      </InputLabel>
      <br />
    </>
  );
}

InputUsername.propTypes = {
  emailChangeHandler: PropTypes.func.isRequired,
};
