import { 
  OPEN_AUTH_MODEL, CLOSE_AUTH_MODEL, 
  OPEN_CHOOSE_PROFILE, CLOSE_CHOOSE_PROFILE, 
  OPEN_SUCCESS_MODAL, CLOSE_SUCCESS_MODAL, 
  OPEN_UPDATE_MODAL, CLOSE_UPDATE_MODAL, 
  OPEN_APPROVAL_MODAL, CLOSE_APPROVAL_MODAL
} from '../../helpers/actions';

const initState = {
  chooseProfile: false,
  authModal: false,
  successModel: false,
  updateModal: false,
  approvalModal: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case OPEN_AUTH_MODEL:
      return {
        ...state,
        authModal: true
      }
    case CLOSE_AUTH_MODEL:
      return {
        ...state,
        authModal: false
      }
    case OPEN_CHOOSE_PROFILE:
      return {
        ...state,
        chooseProfile: true
      }
    case CLOSE_CHOOSE_PROFILE:
      return {
        ...state,
        chooseProfile: false
      }
    case OPEN_SUCCESS_MODAL:
      return {
        ...state,
        successModel: true
      }
    case CLOSE_SUCCESS_MODAL:
      return {
        ...state,
        successModel: false
      }
    case OPEN_UPDATE_MODAL:
      return {
        ...state,
        updateModal: true,
      }
    case CLOSE_UPDATE_MODAL:
      return {
        ...state,
        updateModal: false,
      }
    case OPEN_APPROVAL_MODAL:
      return {
        ...state,
        approvalModal: true,
      }
    case CLOSE_APPROVAL_MODAL:
      return {
        ...state,
        approvalModal: false,
      }
    default:
      return state;
  }
}