import { ActionTypes } from '../actions/VistoriaActions';

const INITIAL_STATE = {
  rota: [],
  vistorias: []
}

export default function Vistoria(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.SALVAR_ROTA: {
      return {
        ...state,
        rota: action.payload.rota
      }
    }

    default:
      return state;
  }
}
