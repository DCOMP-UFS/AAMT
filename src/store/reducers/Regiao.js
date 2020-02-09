import { ActionTypes } from '../actions/RegiaoActions';

const INITIAL_STATE = {
  regioes: []
}

export default function Regiao(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_REGIONS_BY_NATION_SUCCESS: {
      return {
        ...state,
        regioes: action.payload.regioes
      }
    }

    default:
      return { ...state }
  }
}
