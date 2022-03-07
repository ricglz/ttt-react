import Layout from './Layout';
import ContextsProvider from './ContextsProvider';

export default function App() {
  return <ContextsProvider ChildrenComponent={Layout} />;
}
