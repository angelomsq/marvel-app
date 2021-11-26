import React from 'react';

import AppRoutes from './routes';
import { GlobalStyle } from './styles/global';

import Header from './components/Header';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Header />
    <AppRoutes />
  </>
);

export default App;
