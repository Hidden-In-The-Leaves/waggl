import React from 'react';
import PropTypes from 'prop-types';

export default function InputUsername({ emailChangeHandler }) {
  return (
    <>
      {' '}
      <label>
        Email:
        <br />
        <input
          id="loginEmail"
          type="text"
          name="email"
          required
          onChange={emailChangeHandler}
        />
      </label>
      <br />
    </>
  );
}

InputUsername.propTypes = {
  emailChangeHandler: PropTypes.func.isRequired,
};
