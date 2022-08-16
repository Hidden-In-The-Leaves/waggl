import React from 'react';
import PropTypes from 'prop-types';

export default function InputUsername({ passwordChangeHandler }) {
  return (
    <>
      <label>
        Password:
        <br />
        <input
          type="text"
          name="password"
          required
          onChange={passwordChangeHandler}
        />
      </label>
      <br />
    </>
  );
}

InputUsername.propTypes = {
  passwordChangeHandler: PropTypes.func.isRequired,
};
