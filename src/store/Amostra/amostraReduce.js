import { ActionTypes } from './amostraActions';

const INITIAL_STATE = {
  amostra: {},
  amostras: [],
  reload: false,
  exameSalvo: null,
  amostrasEncaminhadas: null,
  buscandoAmostras: false,
  indexExaminarAmostra: -1,
  indexIdAmostrasEncaminhadas: []
}

export default function Amostra(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_AMOSTRAS:
      return {
        ...state,
        amostras: action.payload.amostras,
        buscandoAmostras: false,
        reload: !state.reload
      };

    case ActionTypes.SET_AMOSTRA:
      return {
        ...state,
        amostra: action.payload.amostra
      };
    
    case ActionTypes.REGISTRAR_EXAME_SUCCESS:

      let new_amostras = state.amostras
      const indexExaminarAmostra = state.indexExaminarAmostra
      const amostraExaminada = action.payload.amostraExaminada;

      new_amostras[indexExaminarAmostra] = amostraExaminada

      return {
        ...state,
        amostras: new_amostras,
        exameSalvo: true,
        reload: !state.reload,
        indexExaminarAmostra: -1
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
    
      case ActionTypes.ENCAMINHAR_AMOSTRAS_SUCCESS:

      let amostras = state.amostras
      const indexIdAmostrasEncaminhadas = state.indexIdAmostrasEncaminhadas
      const amostrasEncaminhadas = action.payload.amostrasEncaminhadas;

      //aqui cada amostra que foi encaminhada tem seus dados atualizado na lista de amostras
      indexIdAmostrasEncaminhadas.forEach(element => {
        let amos_encaminhada = amostrasEncaminhadas.find( a => a.id == element.id)
        amostras[element.index] = amos_encaminhada
      });
  
        return {
          ...state,
          amostras: amostras,
          reload: !state.reload,
          amostrasEncaminhadas: true
        };
      
      case ActionTypes.ENCAMINHAR_AMOSTRAS_FAIL:
        return {
          ...state,
          amostrasEncaminhadas: false
        };
      
      case ActionTypes.ENCAMINHAR_AMOSTRAS_RESET:
        return {
          ...state,
          amostrasEncaminhadas: null
        };

      case ActionTypes.BUSCANDO_AMOSTRA:
        return {
          ...state,
          buscandoAmostras: true,
        };

      case ActionTypes.GET_AMOSTRAS_REQUEST_FAIL:
        return {
          ...state,
          buscandoAmostras: false,
        };

      case ActionTypes.SET_INDEX_EXAMINAR_AMOSTRA:
        return {
          ...state,
          indexExaminarAmostra: action.payload.indexExaminarAmostra,
        };
      
      case ActionTypes.SET_INDEX_ID_AMOSTRAS_ENCAMINHADAS:
        return {
          ...state,
          indexIdAmostrasEncaminhadas: action.payload.indexIdAmostrasEncaminhadas,
        };

    default:
      return {...state};
  }
}
