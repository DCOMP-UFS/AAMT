import { ActionTypes } from '../actions/VistoriaCacheActions';

const INITIAL_STATE = {
  rota: [],
  vistorias: [],
  sequenciaVistoria: 1,
  handleSave: false,
}

export default function VistoriaCache(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.SALVAR_ROTA: {
      return {
        ...state,
        rota: action.payload.rota
      }
    }

    case ActionTypes.RESET_HANDLE_SAVE: {
      return {
        ...state,
        handleSave: false
      }
    }

    case ActionTypes.ADD_VISTORIA: {
      return {
        ...state,
        vistorias: [ ...state.vistorias, action.payload.vistoria ],
        handleSave: true
      }
    }

    default:
      return state;
  }
}
