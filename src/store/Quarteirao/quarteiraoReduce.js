import { ActionTypes } from './quarteiraoActions';

const INITIAL_STATE = {
  quarteiroes: [],
  lados: [],
  reload: false
}

export default function Quarteirao( state = INITIAL_STATE, action ) {
  switch(action.type) {
    case ActionTypes.SET_QUARTEIROES:
      return {
        ...state,
        quarteiroes: action.payload.quarteiroes,
        reload: !state.reload
      };

    case ActionTypes.SET_LADOS:
      return {
        ...state,
        lados: action.payload.lados,
        reload: !state.reload
      };

    default:
      return { ...state };
  }
}
