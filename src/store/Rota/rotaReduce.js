import { ActionTypes } from './rotaActions';

const INITIAL_STATE = {
  fl_carregando_rota: false,
  fl_rota_planejada : undefined,
  rotas_planejadas  : [],
  isFinalizado      : undefined
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

    default:
      return { ...state };
  }
}
