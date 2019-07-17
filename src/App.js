import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import theme from './theme';
import Routes from './Routes';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'assets/style/index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
      <ToastContainer position="top-right" />
    </ThemeProvider>
  );
}

export default App;
