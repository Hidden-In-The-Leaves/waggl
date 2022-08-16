import React from 'react';
import PropTypes from 'prop-types';

export default function InputUsername({ firstnameChangeHandler }) {
  return (
    <>
      {' '}
      <label>
        First Name:
        <br />
        <input
          id="loginEmail"
          type="text"
          name="firstname"
          required
          onChange={firstnameChangeHandler}
        />
      </label>
      <br />
    </>
  );
}

InputUsername.propTypes = {
  firstnameChangeHandler: PropTypes.func.isRequired,
};
