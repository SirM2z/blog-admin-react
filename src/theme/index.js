// Material helpers
import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import overrides from './overrides';

const theme = createMuiTheme({
  palette,
  customShadows: shadows,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;
