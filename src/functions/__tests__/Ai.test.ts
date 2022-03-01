import { Board } from '../../@types/general';
import { Cell, Difficulty } from '../../@types/general_enums';
import Ai from '../Ai';
import { emptyArray } from '../HelperFunctions';

type Args = ConstructorParameters<typeof Ai>[0];

describe('Ai', () => {
  const args: Args = {
    board: emptyArray(),
    currentBoard: 0,
    currentDifficulty: Difficulty.EASY,
  };
  let ai: Ai;

  beforeEach(() => {
    ai = new Ai(args);
  });

  test('setVariables', () => {
    const newCurrentBoard = 1;
    ai.setVariables({ ...args, currentBoard: newCurrentBoard });
    expect(ai.currentBoard).toBe(newCurrentBoard);
  });

  test('getProperties', () => {
    const properties = ai.getProperties();
    expect(properties.board).toBe(args.board);
    expect(properties.currentBoard).toBe(args.currentBoard);
    expect(properties.currentDifficulty).toBe(args.currentDifficulty);
    expect(properties.amountOccupied).toBe(ai.amountOccupied);
    expect(properties.avoidBox).toBe(ai.avoidBox);
  });

  describe('playerMadeAMove', () => {
    const boardId = 1;
    const amountOccupiedValue = 0;
    const avoidBoxValue = 0;

    afterEach(() => {
      expect(ai.amountOccupied[boardId]).not.toBe(amountOccupiedValue);
      expect(ai.amountOccupied[boardId]).toBe(3);
    });

    it('considers avoiding the box', () => {
      const board: Board = [...args.board];
      board[0] = Cell.O;
      board[1] = Cell.O;
      ai.playerMadeAMove(boardId, board);
      expect(ai.avoidBox[boardId]).not.toBe(avoidBoxValue);
    });

    it('does not consider avoiding the box', () => {
      ai.playerMadeAMove(boardId, args.board);
      expect(ai.avoidBox[boardId]).toBe(avoidBoxValue);
    });
  });

  describe('aIMadeAMove', () => {
    const boardId = args.currentBoard;
    const amountOccupiedValue = 0;
    const avoidBoxValue = 0;

    afterEach(() => {
      expect(ai.amountOccupied[boardId]).not.toBe(amountOccupiedValue);
      expect(ai.amountOccupied[boardId]).toBe(1);
    });

    it('considers avoiding the box', () => {
      const board: Board = [...args.board];
      board[0] = Cell.O;
      board[1] = Cell.O;
      ai.aiMadeAMove(board);
      expect(ai.avoidBox[boardId]).not.toBe(avoidBoxValue);
    });

    it('does not consider avoiding the box', () => {
      ai.aiMadeAMove(args.board);
      expect(ai.avoidBox[boardId]).toBe(avoidBoxValue);
    });
  });

  test('cleanVariables', () => {
    const boardId = args.currentBoard;
    expect(ai.amountOccupied[boardId]).toBe(0);
    ai.aiMadeAMove(args.board);
    expect(ai.amountOccupied[boardId]).not.toBe(0);
    ai.cleanVariables();
    expect(ai.amountOccupied[boardId]).toBe(0);
  });

  describe('makeMove', () => {
    test('Easy difficulty', () => {
      const move = ai.makeMove(args);
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThanOrEqual(9);
    });

    test('Normal or Hard difficulty', () => {
      const move = ai.makeMove({ ...args, currentDifficulty: Difficulty.HARD });
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThanOrEqual(9);
    });
  });
});
