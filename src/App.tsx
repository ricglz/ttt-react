import React from 'react';
import Layout from './Layout';
import ContextsProvider from './ContextsProvider';

function App() {
  return <ContextsProvider ChildrenComponent={Layout} />;
}

export default App;
