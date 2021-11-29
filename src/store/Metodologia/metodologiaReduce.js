import { ActionTypes } from './metodologiaActions';

const INITIAL_STATE = {
  metodologia: {},
  metodologias: [],
  index: -1,
  created: null,
  updated: null,
  reload: false
}

export default function Metodologia(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_METHODOLOGIES_SUCCESS: {
      return {
        ...state,
        metodologias: action.payload.metodologias
      }
    }

    default:
      return { ...state }
  }
}