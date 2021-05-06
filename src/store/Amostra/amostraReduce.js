import { ActionTypes } from './amostraActions';

const INITIAL_STATE = {
  amostra: {},
  amostras: [],
  reload: false
}

export default function Amostra(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_AMOSTRAS:
      return {
        ...state,
        amostras: action.payload.amostras,
        reload: !state.reload
      };

    case ActionTypes.SET_AMOSTRA:
      return {
        ...state,
        amostra: action.payload.amostra
      };

    default:
      return {...state};
  }
}
