'using strict';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import dashboard from './dashboard';

const reducers = combineReducers({
  dashboard,
});

export default reducers;

export const store = createStore(
  reducers,
  undefined,
  applyMiddleware(
    thunkMiddleware,
  ),
);
