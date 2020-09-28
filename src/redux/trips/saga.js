import { all, takeEvery, put, fork, select } from "redux-saga/effects";
import { message } from 'antd';

/**
 * App Imports
 */
import {
  TRIP_STEP_1, SAVE_TRIP_STEP_1, TRIP_STEP_2,
  SAVE_TRIP_STEP_2, GO_TO_TAB_REQ, GO_TO_TAB,
  TRIP_STEP_3, ERROR_CREATE_TRIP, OPEN_SUCCESS_MODAL, 
  UPDATE_TRIP, OPEN_UPDATE_MODAL
} from '../../helpers/actions';
import { getToken, getTripId } from '../expert/selector';
import { CreateTrips, UpdateTrip } from '../../services/expert';

export function* saveStep1() {
  yield takeEvery(TRIP_STEP_1, function* ({ data }) {
    const { activity, cover, difficulty, duration, price, suitable, title, type, language, skill, participants, dateType } = data;
    yield put({
      type: SAVE_TRIP_STEP_1,
      activity,
      cover,
      difficulty,
      duration,
      price,
      suitable,
      title, etype: type,
      participants,
      skill,
      language,
      dateType
    });
  });
}

export function* saveStep2() {
  yield takeEvery(TRIP_STEP_2, function* ({ data }) {
    yield put({ type: SAVE_TRIP_STEP_2, data });
  });
}

export function* tripStep3() {
  yield takeEvery(TRIP_STEP_3, function* ({ data }) {
    try {
      const token = yield select(getToken)
      console.log("data: ", data);
      const res = yield CreateTrips(token, data);
      if (res.status === 200 || res.status === 201) {
        yield put({ type: "CLEAR_FIELDS" });
        yield put({ type: OPEN_SUCCESS_MODAL });
      } else {
        throw res;
      }
    } catch (err) {
      message.error(err.response.data.message);
      yield put({ type: ERROR_CREATE_TRIP });
    }
  });
}

export function* updateTrip() {
  yield takeEvery(UPDATE_TRIP, function* ({ data }) {
    try {
      const token = yield select(getToken)
      const id = yield select(getTripId)
      const res = yield UpdateTrip(id, token, data);
      if (res.status === 200 || res.status === 201) {
        yield put({ type: "CLEAR_FIELDS" });
        yield put({ type: OPEN_UPDATE_MODAL });
      } else {
        throw res;
      }
    } catch (err) {
      message.error(err.response.data.message);
      yield put({ type: ERROR_CREATE_TRIP });
    }
  })
}

export function* goToTab() {
  yield takeEvery(GO_TO_TAB_REQ, function* ({ data }) {
    yield put({ type: GO_TO_TAB, tab: data });
  });
}

export default function* TripsSaga() {
  yield all([
    fork(saveStep1),
    fork(saveStep2),
    fork(goToTab),
    fork(tripStep3),
    fork(updateTrip)
  ]);
}