import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Layout from "../Layout";
import ContextsProvider from "../ContextsProvider";

vi.mock("../firebase/firebase", () => {
  const originalModule = vi.importActual("../firebase/firebase");
  return {
    __esModule: true,
    ...originalModule,
    getRedirect: vi.fn(() => null),
  };
});

function Component() {
  return (
    <ContextsProvider
      ChildrenComponent={Layout}
      RouterComponent={MemoryRouter}
    />
  );
}

it("renders without crashing", () => {
  const component = <Component />;
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
