import { ActionTypes } from './trabalhoDiarioActions';

const INITIAL_STATE = {
  trabalhos: []
}

export default function Atividade( state = INITIAL_STATE, action ) {
  switch(action.type) {
    case ActionTypes.SET_TRABALHOS:
      return {
        ...state,
        trabalhos: action.payload.trabalhos
      };

    default:
      return { ...state };
  }
}
