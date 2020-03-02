import { ActionTypes } from '../actions/CicloActions';

const INITIAL_STATE = {
  ciclo: {},
  ciclos: [],
  index: -1,
  created: null,
  updated: null,
  reload: false
}

export default function Ciclo(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_CYCLES_FOR_YEAR_SUCCESS: {
      return {
        ...state,
        ciclos: action.payload.ciclos
      }
    }

    case ActionTypes.GET_CYCLES_SUCCESS: {
      return {
        ...state,
        ciclos: action.payload.ciclos
      }
    }

    case ActionTypes.GET_ALLOWED_CYCLES_SUCCESS: {
      return {
        ...state,
        ciclos: action.payload.ciclos
      }
    }

    default:
      return { ...state }
  }
}
