import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from './Routes/history';
import 'react-toastify/dist/ReactToastify.css';

import theme from './theme';
import Routes from './Routes';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'assets/style/index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Routes />
      </Router>
      <ToastContainer position="top-right" />
    </ThemeProvider>
  );
}

export default App;
