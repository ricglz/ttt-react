import React from 'react';
import renderer from 'react-test-renderer';
import type { CurrentBoard } from '../../../@types/general';
import { newBoard } from '../../../functions/HelperFunctions';
import Board from '../Board';

describe('Board', () => {
  const boardNum = 0;
  let currentBoard: CurrentBoard;

  afterEach(() => {
    const boardGame = newBoard();
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

  describe('currentBoard value', () => {
    test('currentBoard === -1', () => {
      currentBoard = -1;
    });

    test('currentBoard === boardNum', () => {
      currentBoard = boardNum;
    });

    test('currentBoard !== boardNum', () => {
      currentBoard = boardNum + 1 as CurrentBoard;
    });
  });
})
