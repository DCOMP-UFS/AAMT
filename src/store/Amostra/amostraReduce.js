import { ActionTypes } from './amostraActions';

const INITIAL_STATE = {
  amostra: {},
  amostras: [],
  reload: false,
  exameSalvo: null,
}

export default function Amostra(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_AMOSTRAS:
      return {
        ...state,
        amostras: action.payload.amostras,
        reload: !state.reload
      };

    case ActionTypes.SET_AMOSTRA:
      return {
        ...state,
        amostra: action.payload.amostra
      };
    
    case ActionTypes.REGISTRAR_EXAME_SUCCESS:
      return {
        ...state,
        exameSalvo: true
      };
    
    case ActionTypes.REGISTRAR_EXAME_FAIL:
      return {
        ...state,
        exameSalvo: false
      };
    
    case ActionTypes.REGISTRAR_EXAME_RESET:
      return {
        ...state,
        exameSalvo: null
      };

    default:
      return {...state};
  }
}
