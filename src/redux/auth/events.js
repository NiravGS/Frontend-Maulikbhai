import { 
  LOGIN_REQUEST, LOGOUT, 
  FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, 
  VERIFY_PROFILE_REQUEST, 
  GET_PROFILE,
  CHANGE_ROLE, CHANGE_PASSWORD_REQUEST
} from '../../helpers/actions';

export const AuthActions = {
  login: values => ({ type: LOGIN_REQUEST, data: values }),
  logout: () => ({ type: LOGOUT }),
  forgotPassword: values => ({ type: FORGOT_PASSWORD_REQUEST, data: values }),
  resetPassword: values => ({ type: RESET_PASSWORD_REQUEST, data: values }),
  verifyProfile: values => ({ type: VERIFY_PROFILE_REQUEST, data: values }),
  getProfile: () => ({ type: GET_PROFILE }),
  changeRole: (data) => ({ type: CHANGE_ROLE, data }),
  changePassword: (data) => ({ type: CHANGE_PASSWORD_REQUEST, data })
}