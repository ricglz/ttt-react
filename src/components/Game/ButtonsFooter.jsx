import React from 'react';
import DefaultButton from '../Layout/DefaultButton';

const ButtonsFooter = props => (
  <div className="row justify-content-center">
    <DefaultButton text="game.reset" func={props.reset} />
    <DefaultButton text="shared.back" func={props.back} />
  </div>
);

export default ButtonsFooter;
