import { all, takeEvery, put, fork, select } from "redux-saga/effects";
import { message } from "antd";
import { push } from "react-router-redux";

/**
 * App Import
 */
import {
  LOGIN_REQUEST, AUTH_ERROR,
  LOGIN_SUCCESS,
  OPEN_CHOOSE_PROFILE,
  CLOSE_AUTH_MODEL,
  GET_PROFILE,
  LOGOUT, SUCCESS_SAVE_EXPERT, CHANGE_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_REQUEST
} from '../../helpers/actions';
import {
  ACCOUNT_SUSPENDED, VERIFY_EMAIL,
  GOOGLE, FACEBOOK, LOGIN, REGISTER,
} from '../../helpers/constants';
import { UserAuth, getProfile, changePassword, userForgotPassword } from '../../services/auth';
import { getRole, getToken } from './selector';

export function* LoginRequest() {
  yield takeEvery(LOGIN_REQUEST, function* ({ data }) {
    try {
      const { email, password, id, provider, type } = data;
      let Obj = {}
      if (type === LOGIN || type === REGISTER) {
        Obj = { email, password }
      } else if (type === FACEBOOK || type === GOOGLE) {
        Obj = { id, email, provider }
      }
      const res = yield UserAuth(type, Obj);
      if (res.status === 200 || res.status === 201) {
        const { data } = res.data;
        if (!data.user.isVerified) {
          message.success(VERIFY_EMAIL);
          yield put({ type: AUTH_ERROR });
        } else if (data.user.isVerified && !data.user.active) {
          message.success(ACCOUNT_SUSPENDED);
          yield put({ type: AUTH_ERROR });
        } else if (data.user.isVerified && data.user.active && !data.user.isCompleted) {
          yield put({
            type: LOGIN_SUCCESS,
            token: data.token,
            isActive: data.user.active,
            isCompleted: data.user.isCompleted,
            role: data.user.role,
            isApproved: data.user.isApproved
          });
          yield put({ type: OPEN_CHOOSE_PROFILE });
        } else if (data.user.isVerified && data.user.isCompleted && data.user.active) {
          yield put({
            type: LOGIN_SUCCESS,
            token: data.token,
            isActive: data.user.active,
            isCompleted: data.user.isCompleted,
            role: data.user.role,
            isApproved: data.user.isApproved
          });
          yield put({ type: CLOSE_AUTH_MODEL });
          if (data.user.role.toLowerCase() === "expert") {
            yield put(push("/home"));
          } else if (data.user.role.toLowerCase() === "enthusiasts") {
            yield put(push("/home"));
          } else {
            yield put(push("/"));
          }
        }
      } else {
        throw res;
      }
    } catch (err) {
      message.error(err.response.data.message);
      yield put({
        type: AUTH_ERROR,
      });
    }
  });
}

export function* GetProfile() {
  yield takeEvery(GET_PROFILE, function* () {
    try {
      const token = yield select(getToken);
      const role = yield select(getRole);
      const res = yield getProfile(token, role);
      if (res.status === 200 || res.status === 201) {
        const { data } = res.data;
        if (role === 'expert') {
          yield put({
            type: SUCCESS_SAVE_EXPERT,
            id: data.id,
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
            step1: true,
            step2: true,
            step3: true,
          });
        } else {
          yield put({ type: "SAVE_ENTHU_PROFILE", ...data })
        }
      } else {
        throw res;
      }
    } catch (err) {
      if (err.response.status === 401) {
        yield put({ type: LOGOUT });
        yield put(push("/"));
      } else {
        message.error(err.response.data.message);
      }
    }
  });
}

export function* changePasswordRequest() {
  yield takeEvery(CHANGE_PASSWORD_REQUEST, function* ({ data }) {
    try {
      const token = yield select(getToken);
      let response = yield changePassword(token, data);
      if (response.status === 200) {
        message.success("Password successfully changed");
        yield put({ type: FORGOT_PASSWORD_SUCCESS });
      } else {
        throw response;
      }
    } catch (e) {
      message.error(e.response.data.message);
      yield put({ type: AUTH_ERROR });
    }
  });
}

export function* resetPasswordRequest() {
  yield takeEvery(FORGOT_PASSWORD_REQUEST, function* ({ data }) {
    try {
      console.log("data", data);
      let response = yield userForgotPassword(data);
      if (response.status === 200) {
        yield put({
          type: FORGOT_PASSWORD_SUCCESS
        });
        message.success("We have sent instructions to reset password on your email");
      } else {
        throw response;
      }
    } catch (e) {
      message.error(e.response.data.message);
      yield put({ type: AUTH_ERROR });
    }
  });
}

export default function* AuthSaga() {
  yield all([
    fork(LoginRequest),
    fork(GetProfile),
    fork(changePasswordRequest),
    fork(resetPasswordRequest),
  ]);
}