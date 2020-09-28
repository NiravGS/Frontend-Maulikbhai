import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, 
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
  AUTH_ERROR,
  CHANGE_ROLE,
  CHANGE_PASSWORD_REQUEST
} from "../../helpers/actions";

const initState = {
  isLogin: false,
  accessToken: null,
  isError: null,
  message: null,
  isActive: false,
  isCompleted: false,
  loader: false,
  isApproved: false,
  role: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loader: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        accessToken: action.token,
        isActive: action.isActive,
        isCompleted: action.isCompleted,
        role: action.role,
        isApproved: action.isApproved,
        loader: false
      }
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        accessToken: null,
        isActive: false,
        isCompleted: false,
        isApproved: false,
        role: null
      }
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loader: true
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loader: false
      }
    case CHANGE_ROLE:
      return {
        ...state,
        role: action.data,
      }
    case AUTH_ERROR:
      return {
        ...state,
        loader: false,
        isError: true
      }
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loader: true,
      }
    case 'RESET_AUTH_LOADER':
      return {
        ...state,
        loader: false,
      }
    default:
      return state;
  }
}