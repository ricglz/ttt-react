import React from 'react';
import DefaultButton from './DefaultButton';

type Props = {
  onClick: () => void;
};

const ResetButton = (props: Props) => (
  <DefaultButton text="game.reset" {...props} />
);

export default ResetButton;
