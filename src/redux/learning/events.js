import { LEARNING_STEP_1, LEARNING_STEP_2, LEARNING_STEP_3, GO_TO_TAB, UPDATE_LEARNING } from "../../helpers/actions";

export const LearningEvents = {
  step1: (data) => ({ type: LEARNING_STEP_1, data }),
  step2: (data) => ({ type: LEARNING_STEP_2, data }),
  step3: (data) => ({ type: LEARNING_STEP_3, data }),
  update: (data) => ({ type: UPDATE_LEARNING, data }),
  setData: (data) => ({ type: 'SET_UPDATE_DATA', data }),
  changeTab: (data) => ({ type: GO_TO_TAB, data })
}