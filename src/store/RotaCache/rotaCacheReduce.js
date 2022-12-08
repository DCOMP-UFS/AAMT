import { ActionTypes } from './rotaCacheActions';

const INITIAL_STATE = {
  fl_iniciada: false,
  openModal: false,
  trabalhoDiario: {
    data: ""
  },
  rota: [],
  todosTrabalhosRotas:[], // lista que contem todos os trabalhos diarios da data atual junto com suas repectivas rotas
}

export default function RotaCache( state = INITIAL_STATE, action ) {
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
      const { data }          = action.payload;
      let todosTrabalhosRotas = INITIAL_STATE.todosTrabalhosRotas

      if( data.length > 0 ) {
        todosTrabalhosRotas = data
      }

     /*  if( data.trabalhoDiario !== 'undefined' ) {
        trabalhoDiario  = data.trabalhoDiario;
        rota            = data.rota;
      } */

      return {
        ...state,
        todosTrabalhosRotas
      }
    }

    case ActionTypes.CHECK_ROTA_INICIADA_SUCCESS: {
      return {
        ...state,
        fl_iniciada: action.payload.fl_iniciada,
        openModal: !action.payload.fl_iniciada
      }
    }

    case ActionTypes.CLEAR_TRABALHO_ROTA_CACHE: {
      return {
        ...state,
        trabalhoDiario:INITIAL_STATE.trabalhoDiario,
        rota:INITIAL_STATE.rota
      }
    }

    case ActionTypes.SET_TRABALHO_ROTA_CACHE: {
      return {
        ...state,
        rota: action.payload.rota,
        trabalhoDiario: action.payload.trabalhoDiario,
      }
    }

    default:
      return state
  }
}