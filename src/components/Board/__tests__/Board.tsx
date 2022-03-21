import renderer from "react-test-renderer";
import type { CurrentBoard } from "types/general";
import { newBoard } from "../../../functions/HelperFunctions";
import Board from "../Board";

describe("Board", () => {
  test.each([-1, 0, 1] as CurrentBoard[])(
    "currentBoard is %s",
    (currentBoard) => {
      const boardGame = newBoard();
      const component = (
        <Board
          boardNum={0}
          boardGame={boardGame}
          currentBoard={currentBoard}
          handleClick={() => {}}
        />
      );
      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    }
  );
});
