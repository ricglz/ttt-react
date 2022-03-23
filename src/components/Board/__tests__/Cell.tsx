import renderer from "react-test-renderer";
import type { BigBoard } from "@/types/general";
// eslint-disable-next-line import/extensions
import { Cell as CellEnum } from "@/types/general_enums";
import { newBoard } from "../../../functions/HelperFunctions";
import Cell from "../Cell";

describe("Cell", () => {
  const boardNum = 0;
  const cellNum = 0;
  let boardGame: BigBoard;

  beforeEach(() => {
    boardGame = newBoard();
  });

  test.each([CellEnum.X, CellEnum.O, CellEnum.NONE])("Value is %s", (value) => {
    boardGame[boardNum][cellNum] = value;
    const component = (
      <Cell
        boardNum={boardNum}
        boardGame={boardGame}
        cellNum={cellNum}
        currentBoard={-1}
        handleClick={() => {}}
      />
    );
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
