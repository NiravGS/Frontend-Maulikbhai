import { ENTHU_STEP_1, ENTHU_STEP_2, ENTU_TAB_REQ } from "../../helpers/actions";

export const EnthuEvents = {
  step1: (data) => ({ type: ENTHU_STEP_1, data }),
  step2: (data) => ({ type: ENTHU_STEP_2, data }),
  changeTab: (data) => ({ type: ENTU_TAB_REQ, data }),
  isEditMode: () => ({ type: "ENTHU_EDIT_MODE" }),
  updateProfile: (data) => ({ type: "UPDATE_ENTHU", data }),
  updateCover: (data) => ({ type: "UPDATE_ENTHU_COVER", cover: data }),
  nullEnthu: () => ({ type: "NULL_ENTH" })
}