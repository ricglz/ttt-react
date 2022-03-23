import { toast } from "react-hot-toast";
import { Player, Cell } from "@/types/general_enums";
import type { Board } from "@/types/general";
import {
  getNextPlayer,
  getPlayerCellValue,
  alertWinner,
  alertError,
  isOccupied,
  theresAWinner,
} from "../HelperFunctions";

vi.mock("react-hot-toast", () => {
  const mockedToast = vi.fn();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (mockedToast as any).error = vi.fn();
  return { toast: mockedToast };
});

describe("HelperFunctions", () => {
  describe("getNextPlayer", () => {
    const cases = [
      { value: Player.PLAYER_1, expected: Player.PLAYER_2 },
      { value: Player.PLAYER_2, expected: Player.PLAYER_1 },
    ];
    test.each(cases)("$value returns $expected", ({ value, expected }) => {
      expect(getNextPlayer(value)).toBe(expected);
    });
  });

  describe("getPlayerCellValue", () => {
    const cases = [
      { value: Player.PLAYER_1, expected: Cell.X },
      { value: Player.PLAYER_2, expected: Cell.O },
    ];
    test.each(cases)("$value returns $expected", ({ value, expected }) => {
      expect(getPlayerCellValue(value)).toBe(expected);
    });
  });

  describe("alertWinner", () => {
    const cases = [
      { value: Cell.X, expected: "Player X has won." },
      { value: Cell.O, expected: "Player O has won." },
    ];
    it.each(cases)(
      'Alerts with message "$expected" when value is $value',
      ({ value, expected }) => {
        alertWinner(value);
        expect(toast).toHaveBeenCalledWith(expected);
      }
    );
  });

  test("alertError", () => {
    const errorMsg = "This is a test!";
    const error = new Error(errorMsg);
    alertError(error);
    expect(toast.error).toHaveBeenCalledWith(errorMsg);
  });

  describe("isOccupied", () => {
    it.each([Cell.X, Cell.O])("returns true when cell is %s", (cell) => {
      expect(isOccupied(cell)).toBeTruthy();
    });

    it("returns true when cell is 0", () => {
      expect(isOccupied(Cell.NONE)).toBeFalsy();
    });
  });

  describe("theresAWinner", () => {
    const winInColumn: Board = [1, 0, 0, 1, 0, 0, 1, 0, 0];
    const winInRow: Board = [1, 1, 0, 1, 0, 0, 1, 0, 0];
    const winInDiagonal: Board = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    const boardsWithWinner: [Board][] = [
      [winInColumn],
      [winInRow],
      [winInDiagonal],
    ];

    test.each(boardsWithWinner)("%p is a winner board", (board) => {
      expect(theresAWinner(board)).toBeTruthy();
    });

    const emptyBoard: Board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const boardsWithoutWinner: [Board][] = [[emptyBoard]];

    test.each(boardsWithoutWinner)("%p is not a winner board", (board) => {
      expect(theresAWinner(board)).toBeFalsy();
    });
  });
});
