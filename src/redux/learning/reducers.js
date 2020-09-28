import { 
  LEARNING_STEP_1, LEARNING_STEP_2, 
  LEARNING_STEP_3, ERROR_CREATE_LEARNING, GO_TO_TAB, 
  UPDATE_LEARNING 
} from "../../helpers/actions";

const initState = {
  id: null,
  cover: null,
  title: null,
  duration: null,
  price: 0,
  skill: 0,
  activity: [],
  langauge: [],
  dateTime: [],
  coordinates: [],
  workshopType: null,
  workshopMedium: null,
  country: null,
  meetingPoint: null,
  description: null,
  whatLearn: null,
  attend: null,
  accomodation: null,
  itenary: null,
  inclusion: null,
  exclusion: null,
  extras: null,
  cancellantion: null,
  participants: null,
  dateType: 1,
  step1: false,
  step2: false,
  step3: false,
  loader: false,
  tab: 1,
  editMode: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case LEARNING_STEP_1:
      return {
        ...state,
        title: action.data.title,
        cover: action.data.cover,
        price: action.data.price,
        skill: action.data.skill,
        activity: JSON.stringify(action.data.activity),
        duration: action.data.duration,
        langauge: JSON.stringify(action.data.langauge),
        workshopType: action.data.workshopType,
        workshopMedium: action.data.workshopMedium,
        participants: action.data.participants,
        tab: 2,
        step1: true
      }
    case LEARNING_STEP_2:
      return {
        ...state,
        coordinates: JSON.stringify(action.data.location),
        country: action.data.country,
        meetingPoint: action.data.meetingPoint,
        description: action.data.description,
        whatLearn: action.data.whatLearn,
        attend: action.data.attend,
        dateTime: JSON.stringify(action.data.dateTime),
        dateType: action.data.dateType,
        step2: true,
        tab: 3
      }

    case LEARNING_STEP_3:
      return {
        ...state,
        accomodation: action.data.accomodation,
        itenary: JSON.stringify(action.data.itenary),
        inclusion: action.data.inclusion,
        exclusion: action.data.exclusion,
        extras: action.data.extras,
        cancellantion: action.data.cancellantion,
        step3: true,
        loader: true
      }
    case UPDATE_LEARNING:
      return {
        ...state,
        accomodation: action.data.accomodation,
        itenary: action.data.itenary,
        inclusion: action.data.inclusion,
        exclusion: action.data.exclusion,
        extras: action.data.extras,
        cancellantion: action.data.cancellantion,
        step3: true,
        loader: true
      }
    case ERROR_CREATE_LEARNING:
      return {
        ...state,
        loader: false,
      }
    case GO_TO_TAB: 
    return {
      ...state,
      tab: action.data
    }
    case 'SET_UPDATE_DATA':
      return {
        id: action.data._id,
        cover: action.data.cover,
        title: action.data.title,
        duration: action.data.duration,
        price: action.data.price,
        skill: parseInt(action.data.skill),
        activity: JSON.stringify(action.data.activity),
        langauge: JSON.stringify(action.data.langauges),
        dateTime: JSON.stringify(action.data.dateTime),
        coordinates: action.data.location.coordinates,
        workshopType: action.data.workshopType,
        workshopMedium: action.data.workshopMedium,
        country: action.data.country,
        meetingPoint: action.data.meetingPoint,
        description: action.data.description,
        whatLearn: action.data.whatLearn,
        attend: action.data.whatLearn,
        accomodation: action.data.accomodation,
        itenary: JSON.stringify(action.data.itenary),
        inclusion: action.data.inclusion,
        exclusion: action.data.exclusion,
        extras: action.data.extras,
        cancellantion: action.data.cancellantion,
        participants: action.data.participants,
        dateType: action.data.dateType,
        step1: false,
        step2: false,
        step3: false,
        loader: false,
        tab: 1,
        editMode: true,
      }
    case "CLEAR_LEARNINGS_FIELDS":
      return {
        ...initState
      }
    default:
      return state;
  }
}