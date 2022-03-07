import renderer from 'react-test-renderer';
import { newBoard } from '../../../functions/HelperFunctions';
import BigBoard from '../BigBoard';

it('renders without crashing', () => {
  const boardGame = newBoard();
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
