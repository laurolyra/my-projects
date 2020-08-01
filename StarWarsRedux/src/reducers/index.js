import { combineReducers } from 'redux';
import APIreducer from './APIreducer';
import textReducer from './filterReducer';
import dropdownReducer from './dropdownReducer';
import sortReducer from './sortReducer';

const rootReducer = combineReducers({
  APIreducer,
  textReducer,
  dropdownReducer,
  sortReducer,
});

export default rootReducer;
