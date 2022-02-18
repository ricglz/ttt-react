import React from 'react';
import ReactDOM from 'react-dom';
import { BigBoard as BigBoardType, emptyArray } from '../../../functions/HelperFunctions';
import BigBoard from '../BigBoard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const arr = emptyArray()
  const boardGame: BigBoardType = [arr, arr, arr, arr, arr, arr, arr, arr, arr]
  const component = (
    <BigBoard
      boardGame={boardGame}
      currentBoard={-1}
      handleClick={() => {}}
    />
  )
  ReactDOM.render(component, div);
});
