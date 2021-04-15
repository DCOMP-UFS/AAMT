import { ActionTypes } from './amostraActions';

const INITIAL_STATE = {
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

    default:
      return {...state};
  }
}
