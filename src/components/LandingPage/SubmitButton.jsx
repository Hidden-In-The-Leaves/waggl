import React from 'react';
import PropTypes from 'prop-types';

export default function SubmitButton({ value }) {
  return <button type="button">{value}</button>;
}

SubmitButton.propTypes = {
  value: PropTypes.string.isRequired,
};
