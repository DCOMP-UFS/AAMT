import { ActionTypes } from './cicloActions';

const INITIAL_STATE = {
  ciclo: {}
}

export default function Atividade( state = INITIAL_STATE, action ) {
  switch(action.type) {
    case ActionTypes.SET_CICLO:
      return {
        ...state,
        ciclo: action.payload.ciclo
      };

    default:
      return { ...state };
  }
}
