import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Home from "../../Home/Home";
import Room from "../Room";
import ContextsProvider from "../../../ContextsProvider";

const mockJoinRoom = vi.fn();

function Component() {
  return (
    <ContextsProvider ChildrenComponent={Home} RouterComponent={MemoryRouter}>
      <Room
        joinGame={mockJoinRoom}
        hostUid="hostUid"
        hostName="hostName"
        id="id"
      />
    </ContextsProvider>
  );
}

it("renders without crashing", () => {
  const component = <Component />;
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
