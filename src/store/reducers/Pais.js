import { ActionTypes } from '../actions/PaisActions';

const INITIAL_STATE = {
  paises: []
}

export default function Pais(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_NATIONS_SUCCESS: {
      return {
        ...state,
        paises: action.payload.paises
      }
    }

    default:
      return { ...state }
  }
}
