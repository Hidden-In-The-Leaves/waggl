import React from 'react';
import PropTypes from 'prop-types';

export default function InputUsername({ usernameChangeHandler }) {
  return (
    <>
      {' '}
      <label>
        Username:
        <br />
        <input
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
