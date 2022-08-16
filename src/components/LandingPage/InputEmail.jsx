import React from 'react';
import PropTypes from 'prop-types';

export default function InputUsername({ usernameChangeHandler }) {
  return (
    <>
      {' '}
      <label>
        Email:
        <br />
        <input
          id="loginEmail"
          type="text"
          name="username"
          required
          onChange={usernameChangeHandler}
        />
      </label>
      <br />
    </>
  );
}

InputUsername.propTypes = {
  usernameChangeHandler: PropTypes.func.isRequired,
};
