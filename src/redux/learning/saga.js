import { all, takeEvery, put, fork, select } from "redux-saga/effects";
import { 
  LEARNING_STEP_3, OPEN_SUCCESS_MODAL, 
  ERROR_CREATE_LEARNING, UPDATE_LEARNING } from "../../helpers/actions";
import { message } from 'antd'
import { getToken, getLearningId } from '../expert/selector';
import { CreateLearning, UpdateLearning } from '../../services/expert';

export function* createLearning() {
  yield takeEvery(LEARNING_STEP_3, function* ({ data }) {
    try {
      const token = yield select(getToken)
      const res = yield CreateLearning(token, data);
      if (res.status === 200 || res.status === 201) {
        yield put({ type: "CLEAR_LEARNINGS_FIELDS" });
        yield put({ type: OPEN_SUCCESS_MODAL });
      } else {
        throw res;
      }
    } catch (err) {
      message.error(err.response.data.message);
      yield put({ type: ERROR_CREATE_LEARNING });
    }
  })
}

export function* updateLearning() {
  yield takeEvery(UPDATE_LEARNING, function* ({ data }) {
    try {
      const token = yield select(getToken)
      const id = yield select(getLearningId)
      const res = yield UpdateLearning(id, token, data);
      if (res.status === 200 || res.status === 201) {
        yield put({ type: "CLEAR_LEARNINGS_FIELDS" });
        yield put({ type: OPEN_SUCCESS_MODAL });
      } else {
        throw res;
      }
    } catch (err) {
      message.error(err.response.data.message);
      yield put({ type: ERROR_CREATE_LEARNING });
    }
  })
}

export default function* LearningSaga() {
  yield all([
    fork(createLearning),
    fork(updateLearning),
  ]);
}