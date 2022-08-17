import React from 'react';
import PropTypes from 'prop-types';

import { BigButton } from '../StyledFormComponents';

export default function SubmitButton({ value, buttonClickHandler }) {
  return (
    <BigButton type="button" onClick={buttonClickHandler}>
      {value}
    </BigButton>
  );
}

SubmitButton.propTypes = {
  value: PropTypes.string.isRequired,
  buttonClickHandler: PropTypes.func.isRequired,
};
