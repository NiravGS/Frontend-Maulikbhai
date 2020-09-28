import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

/**
 * App Imports
 */
import auth from './auth/reducer';
import modal from './models/reducers';
import expert from './expert/reducers';
import trips from './trips/reducers';
import enthu from './enthu/reducers';
import learning from './learning/reducers';

const createReducer = () => combineReducers({
  auth,
  trips,
  expert,
  modal,
  enthu,
  learning,
  router: routerReducer,
});

export default createReducer;
