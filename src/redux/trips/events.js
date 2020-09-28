import { TRIP_STEP_1, TRIP_STEP_2, TRIP_STEP_3, GO_TO_TAB_REQ, UPDATE_TRIP } from "../../helpers/actions";

export const TripsEvents = {
  step1: (data) => ({ type: TRIP_STEP_1, data }),
  step2: (data) => ({ type: TRIP_STEP_2, data }),
  step3: (data) => ({ type: TRIP_STEP_3, data }),
  setData: (data) => ({ type: 'SET_TRIP_UPDATE_DATA', data }),
  changeTab: (data) => ({ type: GO_TO_TAB_REQ, data }),
  update: (data) => ({ type: UPDATE_TRIP, data }),
}