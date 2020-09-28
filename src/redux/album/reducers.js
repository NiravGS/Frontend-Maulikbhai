import {
  CREATE_ALBUM
} from "../../helpers/actions";

const initState = {
  id: null,
  user: null,
  caption: null,
  date: null,
  location: {},
  images: [],
  country: null,
}

export default (state = initState, action) => {
  switch (action.type) {
    case CREATE_ALBUM:
      return {
        ...state,
        user: action.user,
        caption: action.caption,
        date: action.date,
        location: action.location,
        images: action.images,
        country: action.country,
      }
    default:
      return state;
  }
}