import React from 'react';
import renderer from 'react-test-renderer';
import { BigBoard as BigBoardType, emptyArray } from '../../../functions/HelperFunctions';
import BigBoard from '../BigBoard';

it('renders without crashing', () => {
  const arr = emptyArray();
  const boardGame: BigBoardType = [arr, arr, arr, arr, arr, arr, arr, arr, arr];
  const component = (
    <BigBoard
      boardGame={boardGame}
      currentBoard={-1}
      handleClick={() => {}}
    />
  );
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
