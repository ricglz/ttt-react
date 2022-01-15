import React from 'react';
import BackButton from '../Layout/BackButton';
import ResetButton from '../Layout/ResetButton';

type Props = {
  reset: () => void,
  back: string,
};

const ButtonsFooter = ({ reset, back }: Props) => (
  <div className="row justify-content-center">
    <ResetButton onClick={reset} />
    <BackButton text="shared.back" url={back} />
  </div>
);

export default ButtonsFooter;
