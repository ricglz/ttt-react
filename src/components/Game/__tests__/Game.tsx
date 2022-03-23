import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../Home/Home';
import Game from '../Game';
import ContextsProvider from '../../../ContextsProvider';

function Component() {
  return (
    <ContextsProvider
      ChildrenComponent={Home}
      RouterComponent={MemoryRouter}
    >
      <Game />
    </ContextsProvider>
  );
}

it('renders without crashing', () => {
  const component = <Component />;
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
