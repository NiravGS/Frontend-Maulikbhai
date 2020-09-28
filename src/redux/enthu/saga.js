import { all, takeEvery, put, fork, select } from "redux-saga/effects";
import { message } from 'antd';

/**
 * App Imports
 */
import { ENTHU_STEP_2, OPEN_SUCCESS_MODAL, OPEN_UPDATE_MODAL } from '../../helpers/actions';
import { getToken } from '../expert/selector';
import { createEnthProfile, UpdateEnthuProfile } from '../../services/expert';

export function* enthStep2() {
  yield takeEvery(ENTHU_STEP_2, function* ({ data }) {
    try {
      const token = yield select(getToken)
      const res = yield createEnthProfile(token, data);
      if (res.status === 200 || res.status === 201) {
        yield put({ type: "STOP_LOADER" });
        yield put({ type: "SAVE_ENTHU_PROFILE", ...res.data.data });
        yield put({ type: OPEN_SUCCESS_MODAL });
      } else {
        throw res;
      }
    } catch (err) {
      message.error(err.response.data.message);
      yield put({ type: "STOP_LOADER" });
    }
  });
}

export function* updateEnthu() {
  yield takeEvery("UPDATE_ENTHU", function* ({ data }) {
    try {
      const token = yield select(getToken)
      const res = yield UpdateEnthuProfile(token, data);
      if (res.status === 200 || res.status === 201) {
        yield put({ type: "STOP_LOADER" });
        yield put({ type: "SAVE_ENTHU_PROFILE", ...res.data.data });
        yield put({ type: OPEN_UPDATE_MODAL });
      } else {
        throw res;
      }
    } catch (err) {
      message.error(err.response.data.message);
      yield put({ type: "STOP_LOADER" });
    }
  });
}

export default function* EnthuSaga() {
  yield all([
    fork(enthStep2),
    fork(updateEnthu)
  ]);
}