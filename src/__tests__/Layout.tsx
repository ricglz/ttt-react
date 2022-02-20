import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../Layout';
import ContextsProvider from '../ContextsProvider';

jest.mock('../firebase/firebase', () => {
  const originalModule = jest.requireActual('../firebase/firebase');
  return {
    __esModule: true,
    ...originalModule,
    getRedirect: jest.fn(() => null)
  }
})

function Component() {
  return (
    <ContextsProvider
      ChildrenComponent={Layout}
      RouterComponent={MemoryRouter}
    />
  );
}

it('renders without crashing', () => {
  const component = <Component />;
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
