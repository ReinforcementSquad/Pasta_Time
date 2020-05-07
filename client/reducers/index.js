import { combineReducers } from 'redux';
import reducer from './reducer.js';

const reducers = combineReducers({ reducer: reducer });

export default reducers;
