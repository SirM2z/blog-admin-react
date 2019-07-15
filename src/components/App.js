import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// Routes
import Routes from '../Routes';

// Material helpers
import { ThemeProvider } from '@material-ui/styles';

// Theme
import theme from '../theme';

// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../assets/style/index.css';

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}
