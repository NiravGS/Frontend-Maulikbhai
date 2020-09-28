import { ENTHU_STEP_1, ENTHU_STEP_2, ENTU_TAB_REQ } from "../../helpers/actions";

const initState = {
  id: null,
  picture: null,
  name: "",
  country: null,
  address: "",
  phone: "",
  interested: [],
  dob: null,
  cover: null,
  active: true,
  step1: false,
  step2: false,
  loader: false,
  tab: 1,
  isEditMode: false,
}

export default function (state = initState, action) {
  switch (action.type) {
    case ENTHU_STEP_1:
      return {
        ...state,
        name: action.data.name,
        country: action.data.country,
        phone: action.data.phone,
        dob: action.data.dob,
        picture: action.data.picture,
        address: action.data.address,
        step1: true,
        tab: 2
      }
    case ENTHU_STEP_2:
      return {
        ...state,
        loader: true,
      }
    case "STOP_LOADER":
      return {
        ...state,
        loader: false,
      }
    case "SAVE_ENTHU_PROFILE":
      return {
        ...state,
        picture: action.profile,
        name: action.firstName,
        country: action.country,
        address: action.address.line1,
        phone: action.phone,
        dob: action.dob,
        id: action.user,
        cover: action.cover,
        interested: action.interested,
        tab: 1,
      }
    case "ENTHU_EDIT_MODE":
      return {
        ...state,
        isEditMode: true,
      }
    case ENTU_TAB_REQ:
      return {
        ...state,
        tab: action.data,
      }
    case "UPDATE_ENTHU" :
      return {
        ...state,
        loader: true
      }
    case "UPDATE_ENTHU_COVER":
      return {
        ...state,
        cover: action.cover
      }
    case "NULL_ENTH":
      return {
        id: null,
        picture: null,
        name: "",
        country: null,
        address: "",
        phone: "",
        interested: [],
        dob: null,
        cover: null,
        active: true,
        step1: false,
        step2: false,
        loader: false,
        tab: 1,
        isEditMode: false,
      }
    default:
      return state;
  }
}