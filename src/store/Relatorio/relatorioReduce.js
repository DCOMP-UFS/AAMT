import { ActionTypes } from './relatorioActions';

const INITIAL_STATE = {
  boletimSemanal: {},
  boletimDiarioEquipe: {},
  reload: false
}

export default function Relatorio( state = INITIAL_STATE, action ) {
  switch( action.type ) {
    case ActionTypes.SET_BOLETIM_SEMANAL:
      return {
        ...state,
        boletimSemanal: action.payload.data,
      };

    case ActionTypes.SET_BOLETIM_DIARIO_EQUIPE:
      return {
        ...state,
        boletimDiarioEquipe: action.payload.data,
      };

    default:
      return { ...state };
  }
}
