import { all } from "redux-saga/effects";

/**
 * App Imports
 */
import AuthSaga from './auth/saga';
import ExpertSaga from './expert/saga';
import TripSaga from './trips/saga';
import EnthuSaga from './enthu/saga';
import LearningSaga from './learning/saga';

export default function* rootSaga() {
  yield all([
    AuthSaga(), 
    ExpertSaga(), 
    TripSaga(), 
    EnthuSaga(), 
    LearningSaga()
  ]);
}
