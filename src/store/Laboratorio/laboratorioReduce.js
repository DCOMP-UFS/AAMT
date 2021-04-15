import { ActionTypes } from './laboratorioActions';

const INITIAL_STATE = {
  laboratorios: [],
  reload: false
}

export default function Laboratorio(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_LABORATORIOS:
      return {
        ...state,
        laboratorios: action.payload.laboratorios,
        reload: !state.reload
      };

    default:
      return {...state};
  }
}
