import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router';

import GlobalProviders from './GlobalProviders';
import LoginPage from './pages/LoginPage';
import QuoteCreationPage from './pages/QuoteCreationPage';
import QuoteListPage from './pages/QuoteListPage';

function App() {
  return (
    <GlobalProviders>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/quotes" element={<QuoteListPage />} />
        <Route path="/create-quote" element={<QuoteCreationPage />} />
      </Routes>
    </GlobalProviders>
  );
}

export default App;
