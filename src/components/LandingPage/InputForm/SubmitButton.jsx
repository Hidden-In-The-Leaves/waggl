import React from 'react';
import PropTypes from 'prop-types';

export default function SubmitButton({ value, buttonClickHandler }) {
  return (
    <button type="button" onClick={buttonClickHandler}>
      {value}
    </button>
  );
}

SubmitButton.propTypes = {
  value: PropTypes.string.isRequired,
  buttonClickHandler: PropTypes.func.isRequired,
};
