import { ActionTypes } from '../actions/EstadoActions';

const INITIAL_STATE = {
  estados: []
}

export default function Estado(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_STATES_BY_REGION_SUCCESS: {
      return {
        ...state,
        estados: action.payload.estados
      }
    }

    default:
      return { ...state }
  }
}
