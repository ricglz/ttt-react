import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../Home/Home';
import Contributor from '../Contributor';
import ContextsProvider from '../../../ContextsProvider';

function Component() {
  return (
    <ContextsProvider
      ChildrenComponent={Home}
      RouterComponent={MemoryRouter}
    >
      <Contributor login="login" avatar_url="avatarUrl" html_url="htmlUrl" />
    </ContextsProvider>
  );
}

it('renders without crashing', () => {
  const component = <Component />;
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
