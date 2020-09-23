import { ActionTypes } from '../actions/RotaCacheActions';

const INITIAL_STATE = {
  fl_iniciada: false,
  openModal: false,
  trabalhoDiario: {},
  rota: []
}

export default function Rota(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.RESETAR_OPENMODAL: {
      return {
        ...state,
        openModal: INITIAL_STATE.openModal
      }
    }

    case ActionTypes.SALVAR_ROTA: {
      let trabalhoDiario = state.trabalhoDiario;
      trabalhoDiario.horaInicio = action.payload.horaInicio;

      return {
        ...state,
        rota: action.payload.rota,
        trabalhoDiario
      }
    }

    case ActionTypes.GET_ROUTE_SUCCESS: {
      const { data } = action.payload;
      let trabalhoDiario = INITIAL_STATE.trabalhoDiario;
      let rota = INITIAL_STATE.rota;

      if( typeof data.trabalhoDiario !== 'undefined' ) {
        trabalhoDiario = data.trabalhoDiario;
        rota = data.rota;
      }


      return {
        ...state,
        trabalhoDiario,
        rota
      }
    }

    case ActionTypes.CHECK_ROTA_INICIADA_SUCCESS: {
      return {
        ...state,
        fl_iniciada: action.payload.fl_iniciada,
        openModal: !action.payload.fl_iniciada
      }
    }

    default:
      return state
  }
}
