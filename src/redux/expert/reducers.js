import { 
  SAVE_EXPERT_STEP_1, SAVE_EXPERT_STEP_2, 
  GO_TO_TAB, EXPERT_STEP_3, ERROR_SAVE_EXPERT, SUCCESS_SAVE_EXPERT, GET_PROFILE, EDIT_MODE, UPDATE_EXPERT_PROFILE,
} from "../../helpers/actions";

const initState = {
  id: null,
  picture: null,
  firstName: null,
  lastName: null,
  country: null,
  experties: [],
  speaks: [],
  bio: null,
  awards: [],
  initiatives: [],
  companyname: null,
  website: null,
  companycountry: null,
  phone: null,
  address: null,
  address2: null,
  approved: false,
  cover: null,
  active: true,
  step1: false,
  step2: false,
  step3: false,
  loader: false,
  tab: 1,
  isEditMode: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case SAVE_EXPERT_STEP_1:
      return {
        ...state,
        picture: action.picture,
        firstName: action.firstName,
        lastName: action.lastName,
        country: action.country,
        experties: action.experties,
        speaks: action.speaks,
        step1: true,
        tab: 2
      }
    case SAVE_EXPERT_STEP_2:
      return {
        ...state,
        companyname: action.companyname,
        website: action.website,
        companycountry: action.companycountry,
        address: action.address,
        address2: action.address2,
        phone: action.phone,
        step2: true,
        tab: 3
      }
    case EXPERT_STEP_3:
      return {
        ...state,
        loader: true,
      }
    case ERROR_SAVE_EXPERT:
      return {
        ...state,
        loader: false
      }
    case SUCCESS_SAVE_EXPERT: 
      return {
        ...state,
        picture: action.profile,
        firstName: action.firstName,
        lastName: action.lastName,
        country: action.country,
        experties: action.experties,
        speaks: action.speaks,
        bio: action.bio,
        awards: action.awards,
        initiatives: action.initiatives,
        companyname: action.companyname,
        website: action.website,
        companycountry: action.companycountry,
        phone: action.phone,
        address: action.address,
        address2: action.address2,
        approved: action.approved,
        active: action.active,
        cover: action.cover,
        id: action.id,
        loader: false,
        step1: action.step1,
        step2: action.step2,
        step3: action.step3,
      }
    case GET_PROFILE:
      return {
        ...state,
        loader: true
      }
    case EDIT_MODE:
      return {
        ...state,
        isEditMode: true,
      }
    case GO_TO_TAB:
      return {
        ...state,
        tab: action.tab
      }
    case UPDATE_EXPERT_PROFILE:
      return {
        ...state,
        loader: true
      }
    case "UPDATE_EXPERT_COVER":
      return {
        ...state,
        cover: action.cover,
      }
    case "NULL_EXPERT":
      return {
        id: null,
        picture: null,
        firstName: null,
        lastName: null,
        country: null,
        experties: [],
        speaks: [],
        bio: null,
        awards: [],
        initiatives: [],
        companyname: null,
        website: null,
        companycountry: null,
        phone: null,
        address: null,
        address2: null,
        approved: false,
        cover: null,
        active: true,
        step1: false,
        step2: false,
        step3: false,
        loader: false,
        tab: 1,
        isEditMode: false,       
      }
    default:
      return state;
  }
}