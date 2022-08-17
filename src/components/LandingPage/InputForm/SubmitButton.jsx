import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../styledComponents';

export default function SubmitButton({ value, buttonClickHandler }) {
  return (
    <Button type="button" onClick={buttonClickHandler}>
      {value}
    </Button>
  );
}

SubmitButton.propTypes = {
  value: PropTypes.string.isRequired,
  buttonClickHandler: PropTypes.func.isRequired,
};
