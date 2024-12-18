import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import store from './redux/store';

const GlobalProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

export default GlobalProviders;
