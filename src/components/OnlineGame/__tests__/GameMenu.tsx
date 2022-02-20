import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../Home/Home';
import GameMenu from '../GameMenu';
import ContextsProvider from '../../../ContextsProvider';
import type { User } from '../../../functions/OtherHooks';

const mockLogOut = jest.fn();

function Component() {
  const user: User = {
    email: 'email',
    name: 'name',
    phoneNumber: 'phoneNumber',
    photoUrl: 'photoUrl',
    uid: 'uid',
  }
  return (
    <ContextsProvider
      ChildrenComponent={Home}
      RouterComponent={MemoryRouter}
    >
      <GameMenu user={user} logOut={mockLogOut} />
    </ContextsProvider>
  );
}

it('renders without crashing', () => {
  jest.clearAllMocks();
  const component = <Component />;
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
