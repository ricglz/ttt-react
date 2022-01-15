import React from 'react';
import DefaultButton from './DefaultButton';

type Props = {
  onClick: () => void
};

const ResetButton = ({ onClick }: Props) => (
  <DefaultButton text="game.reset" defaultText="Back" onClick={onClick} />
);

export default ResetButton;
