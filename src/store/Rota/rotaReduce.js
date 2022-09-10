import { ActionTypes } from './rotaActions';

const INITIAL_STATE = {
  fl_carregando_rota: false,
  fl_rota_planejada : undefined,
  rotas_planejadas  : [],
  isFinalizado      : undefined,
  fl_iniciada: false,
  openModal: false,
  trabalhoDiario: {},
  rota: [],
  /**
   * estado usado para identificar quando a rota acabou de ser finalizada,
   * foi criado como variavel auxiliar para não interferir com
   * o estado isFinalizado
  */
  auxFinalizado: undefined,
  auxIniciado: undefined  
}

export default function Rota(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_ROTA_PLANEJADA:
      return {
        ...state,
        fl_rota_planejada: action.payload.fl_rota_planejada,
      };

    case ActionTypes.SET_CARREGANDO_ROTA:
      return {
        ...state,
        fl_carregando_rota: action.payload.fl_carregando_rota,
      };

    case ActionTypes.SET_ROTAS_PLANEJADAS:
      return {
        ...state,
        rotas_planejadas: action.payload.rotas_planejadas,
      };

    case ActionTypes.SET_IS_FINALIZADO:
      return {
        ...state,
        isFinalizado: action.payload.isFinalizado,
      };

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
    case ActionTypes.SET_AUX_FINALIZADO:
      return {
        ...state,
        auxFinalizado: action.payload.auxFinalizado,
      };
    case ActionTypes.SET_AUX_INICIADO:
      return {
        ...state,
        auxIniciado: action.payload.auxFinalizado,
      };

    default:
      return { ...state };
  }
}
