import {
  OPEN_AUTH_MODEL, CLOSE_AUTH_MODEL,
  OPEN_CHOOSE_PROFILE, CLOSE_CHOOSE_PROFILE,
  CLOSE_SUCCESS_MODAL,
  OPEN_UPDATE_MODAL,
  CLOSE_UPDATE_MODAL,
  OPEN_APPROVAL_MODAL,
  CLOSE_APPROVAL_MODAL,
} from '../../helpers/actions';

export const ModalActions = {
  openAuthModal: () => ({ type: OPEN_AUTH_MODEL }),
  closeAuthModal: () => ({ type: CLOSE_AUTH_MODEL }),
  openChooseProfileModal: () => ({ type: OPEN_CHOOSE_PROFILE }),
  closeChooseProfileModal: () => ({ type: CLOSE_CHOOSE_PROFILE }),
  closeSuccessModal: () => ({ type: CLOSE_SUCCESS_MODAL }),
  openUpdateModal: () => ({ type: OPEN_UPDATE_MODAL }),
  closeUpdateModal: () => ({ type: CLOSE_UPDATE_MODAL }),
  openApprovalModal: () => ({ type: OPEN_APPROVAL_MODAL }),
  closeApprovalModal: () => ({ type: CLOSE_APPROVAL_MODAL })
}