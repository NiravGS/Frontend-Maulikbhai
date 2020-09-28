import { 
  EXPERT_STEP_1, EXPERT_STEP_2, 
  EXPERT_STEP_3, GO_TO_TAB_REQ, EDIT_MODE, UPDATE_EXPERT_PROFILE, 
} from "../../helpers/actions";

export const ExpertEvents = {
  step1: (data) => ({ type: EXPERT_STEP_1, data }),
  step2: (data) => ({ type: EXPERT_STEP_2, data }),
  step3: (data) => ({ type: EXPERT_STEP_3, data }),
  changeTab: (data) => ({ type: GO_TO_TAB_REQ, data }),
  isEditMode: () =>({ type: EDIT_MODE }),
  updateProfile: (data) => ({ type: UPDATE_EXPERT_PROFILE, data }),
  updateCover: (data) => ({ type: "UPDATE_EXPERT_COVER", cover: data }),
  nullExpert: () => ({ type: "NULL_EXPERT" }),
}