import { all, takeEvery, put, fork, select } from "redux-saga/effects";
import { message } from 'antd';
import { 
  EXPERT_STEP_1, SAVE_EXPERT_STEP_1, 
  EXPERT_STEP_2, SAVE_EXPERT_STEP_2, 
  GO_TO_TAB_REQ, GO_TO_TAB, EXPERT_STEP_3, 
  ERROR_SAVE_EXPERT, SUCCESS_SAVE_EXPERT, 
  OPEN_SUCCESS_MODAL,
  UPDATE_EXPERT_PROFILE,
  OPEN_UPDATE_MODAL
} from "../../helpers/actions";

import { getToken } from './selector';

import { CreateExpertProfile, UpdateExpertProfile } from '../../services/expert';

export function* saveStep1 () {
  yield takeEvery(EXPERT_STEP_1, function* ({ data }) {
    const { firstName, lastName, speaks, country, experties, picture } = data;
    yield put({
      type: SAVE_EXPERT_STEP_1,
      firstName, lastName,
      speaks, country, experties, picture
    });
  });
}

export function* saveStep2() {
  yield takeEvery(EXPERT_STEP_2, function* ({ data }) {
    const { companyname, website, companycountry, phone, address, address2 } = data;
    yield put({ type: SAVE_EXPERT_STEP_2, companyname, website, companycountry, phone, address, address2 });
  });
}
export function* saveStep3() {
  yield takeEvery(EXPERT_STEP_3, function* ({ data }) {
    try {
      const token = yield select(getToken)
      const res = yield CreateExpertProfile(token, data);
      if (res.status === 200 || res.status === 201) {
        const { data } = res.data;
        yield put({ 
          type: SUCCESS_SAVE_EXPERT,
          profile: data.profile,
          lastName: data.lastName,
          firstName: data.firstName,
          initiatives: data.initiatives,
          country: data.country,
          speaks: data.speaks,
          experties: data.experties,
          bio: data.bio,
          awards: data.awards,
          companyname: data.company.name,
          website: data.company.website,
          phone: data.company.phone,
          address: data.company.address.line1,
          address2: data.company.address.line2,
          companycountry: data.company.country,
          approved: data.approved,
          active: data.active,
          cover: data.cover,
          id: data.id,
          step1: false,
          step2: false,
          step3: false,
        });
        yield put({ type: OPEN_SUCCESS_MODAL });
      } else {
        throw res;
      }
    } catch (err) {
      message.error(err.response.data.message);
      yield put({ type: ERROR_SAVE_EXPERT });
    }
  });
}

export function* updateExpert() {
  yield takeEvery(UPDATE_EXPERT_PROFILE, function* ({ data }) {
    try {
      const token = yield select(getToken)
      const res = yield UpdateExpertProfile(token, data);
      if (res.status === 200 || res.status === 201) {
        const { data } = res.data;
        yield put({
          type: SUCCESS_SAVE_EXPERT,
          profile: data.profile,
          lastName: data.lastName,
          firstName: data.firstName,
          initiatives: data.initiatives,
          country: data.country,
          speaks: data.speaks,
          experties: data.experties,
          bio: data.bio,
          awards: data.awards,
          companyname: data.company.name,
          website: data.company.website,
          phone: data.company.phone,
          address: data.company.address.line1,
          address2: data.company.address.line2,
          companycountry: data.company.country,
          approved: data.approved,
          active: data.active,
          cover: data.cover,
          id: data.id,
          step1: true,
          step2: true,
          step3: true,
        });
        yield put({ type: OPEN_UPDATE_MODAL });
      } else {
        throw res;
      }
    } catch (err) {
      message.error(err.response.data.message);
      yield put({ type: ERROR_SAVE_EXPERT });
    }
  });
}

export function* goToTab() {
  yield takeEvery(GO_TO_TAB_REQ, function* ({ data }) {
    yield put({ type: GO_TO_TAB, tab: data });
  });
}

export default function* AuthSaga() {
  yield all([
    fork(saveStep1), 
    fork(saveStep2), 
    fork(saveStep3), 
    fork(goToTab), 
    fork(updateExpert),
  ]);
}