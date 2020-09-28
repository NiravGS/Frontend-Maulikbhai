import { 
  SAVE_TRIP_STEP_1, SAVE_TRIP_STEP_2, GO_TO_TAB, TRIP_STEP_3, 
  SUCCESS_CREATE_TRIP, ERROR_CREATE_TRIP, UPDATE_TRIP
 } from "../../helpers/actions";

const initState = {
  cover: null,
  title: "",
  duration: null,
  price: null,
  type: [],
  suitable: "",
  activity: [],
  difficulty: "",
  itinerary: [],
  dates: [],
  description: "",
  accommodation: "",
  meetingPoint: "",
  step1: false,
  step2: false,
  step3: false,
  loader: false,
  tab: 1,
  dateType: 1,
  language: [],
  skill: 0,
  participants: null,
  whatLearn: null,
  attend: null,
  country: null,
  dateTime: [],
  inclusion:"",
  exclusion:"",
  cancellations:"",
  extras:""
}

export default (state = initState, action) => {
  switch (action.type) {
    case SAVE_TRIP_STEP_1:
      return {
        ...state,
        activity: JSON.stringify(action.activity),
        cover: action.cover,
        difficulty: action.difficulty,
        duration: action.duration,
        price: action.price,
        suitable: action.suitable,
        title: action.title,
        type: JSON.stringify(action.etype),
        step1: true,
        tab: 2,
        language: action.language,
        skill: action.skill,
        participants: action.participants,
      }
    case SAVE_TRIP_STEP_2:
      return {
        ...state,
        coordinates: JSON.stringify(action.data.coordinates),
        country: action.data.country,
        dateTime: JSON.stringify(action.data.dateTime),
        description: action.data.description,
        whatLearn: action.data.whatLearn,
        attend: action.data.attend,
        meetingPoint: action.data.meetingPoint,
        dateType: action.data.dateType,
        step2: true,
        tab: 3
      }

    case TRIP_STEP_3:
      return {
        ...state,
        loader: true
      }

    case SUCCESS_CREATE_TRIP:
      return {
        ...state,
        loader: false,
      }
    case ERROR_CREATE_TRIP:
      return {
        ...state,
        loader: false,
      }

    case GO_TO_TAB:
      return {
        ...state,
        tab: action.tab
      }
    case UPDATE_TRIP: {
      return {
        ...state,
        step3: true,
        loader: true
      }
    }
    case "CLEAR_FIELDS":
      return {
        cover: null,
        title: "",
        duration: null,
        price: null,
        type: [],
        suitable: "",
        activity: [],
        difficulty: "",
        itinerary: [],
        dates: [],
        description: "",
        accommodation: "",
        meetingPoint: "",
        step1: false,
        step2: false,
        step3: false,
        loader: false,
        tab: 1,
        language: [],
        skill: 0,
        participants: null,
        whatLearn: null,
        attend: null,
        country: null,
        dateTime: []
      }
    case 'SET_TRIP_UPDATE_DATA':
      return {
        id: action.data._id,
        cover: action.data.cover,
        title: action.data.title,
        duration: action.data.duration,
        price: action.data.price,
        skill: parseInt(action.data.skill),
        activity: JSON.stringify(action.data.activity),
        language: action.data.language,
        dateTime: JSON.stringify(action.data.dateTime),
        coordinates: action.data.location.coordinates,
        country: action.data.country,
        meetingPoint: action.data.meetingPoint,
        description: action.data.description,
        whatLearn: action.data.whatLearn,
        attend: action.data.attend,
        accommodation: action.data.accomodation,
        itinerary: JSON.stringify(action.data.itenary),
        inclusion: action.data.inclusion,
        exclusion: action.data.exclusion,
        extras: action.data.extras,
        cancellations: action.data.cancellations,
        participants: action.data.participants,
        dateType: action.data.dateType,
        type: JSON.stringify(action.data.type),
        suitable: action.data.suitable,
        difficulty: action.data.difficulty,
        step1: false,
        step2: false,
        step3: false,
        loader: false,
        tab: 1,
        editMode: true,
      }
    default:
      return state;
  }
}