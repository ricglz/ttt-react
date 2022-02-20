import React from 'react';
import renderer from 'react-test-renderer';
import type { BigBoard as BigBoardType, CurrentBoard } from '../../../@types/general';
import { emptyArray } from '../../../functions/HelperFunctions';
import Board from '../Board';

describe('Board', () => {
  const boardNum = 0;
  let currentBoard: CurrentBoard;

  afterEach(() => {
    const arr = emptyArray();
    const boardGame: BigBoardType = [arr, arr, arr, arr, arr, arr, arr, arr, arr];
    const component = (
      <Board
        boardNum={boardNum}
        boardGame={boardGame}
        currentBoard={currentBoard}
        handleClick={() => {}}
      />
    );
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('currentBoard === -1', () => {
    currentBoard = -1;
  });

  test('currentBoard === boardNum', () => {
    currentBoard = boardNum;
  });

  test('currentBoard !== boardNum', () => {
    currentBoard = boardNum + 1 as CurrentBoard;
  });
})
