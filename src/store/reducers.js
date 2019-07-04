import { combineReducers } from 'redux';

import layout from '../layouts/LayoutState';
import login from '../pages/Login/LoginState';

export default combineReducers({
  layout,
  login,
});