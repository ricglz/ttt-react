import React from 'react';
import PropTypes from 'prop-types';
import DefaultButton from './DefaultButton';

const ResetButton = ({ onClick }) => (
  <DefaultButton text="game.reset" defaultText="Back" onClick={onClick} />
);

ResetButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ResetButton;
