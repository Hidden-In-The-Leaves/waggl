import React from 'react';
import PropTypes from 'prop-types';

export default function InputUsername({ lastnameChangeHandler }) {
  return (
    <>
      {' '}
      <label>
        Last Name:
        <br />
        <input
          id="loginEmail"
          type="text"
          name="firstname"
          required
          onChange={lastnameChangeHandler}
        />
      </label>
      <br />
    </>
  );
}

InputUsername.propTypes = {
  lastnameChangeHandler: PropTypes.func.isRequired,
};
