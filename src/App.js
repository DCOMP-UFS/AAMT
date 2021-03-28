import React from 'react';
import checkTokenIsValid from './utils/checkTokenIsValid';

import Routes from './routes';

const App = () => {
  checkTokenIsValid();

  return <Routes />;
};

export default App;
