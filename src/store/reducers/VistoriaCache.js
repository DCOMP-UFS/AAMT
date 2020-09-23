import { ActionTypes } from '../actions/VistoriaCacheActions';

const INITIAL_STATE = {
  vistorias: [],
  sequenciaVistoria: 1,
  handleSave: false,
  showNotStarted: false,
}

export default function VistoriaCache(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.RESETAR_SHOWNOTSTARTED: {
      return {
        ...state,
        showNotStarted: false
      }
    }

    case ActionTypes.ROTA_NAO_INICIADA: {
      return {
        ...state,
        showNotStarted: true
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
