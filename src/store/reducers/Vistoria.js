import { ActionTypes } from '../actions/VistoriaActions';

const INITIAL_STATE = {
  selectQuarteirao: undefined,
  imovel: undefined,
  indexRota: -1,
  sequenciaRecipiente: 1,
  inspectionSequence: 1,
  recipientes: [],
  reload: false,
  updatedIndex: -1,
  vistorias: []
}

export default function Vistoria( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case ActionTypes.SET_IMMOBILE: {
      return {
        ...state,
        imovel: action.payload.class_immobile,
        reload: !state.reload
      }
    }

    case ActionTypes.SET_SEQUENCE_INSPECTION: {
      return {
        ...state,
        inspectionSequence: action.payload.int_sequence,
        reload: !state.reload
      }
    }

    case ActionTypes.SET_RECIPIENT: {
      return {
        ...state,
        recipientes: action.payload.array_recipient,
        sequenciaRecipiente: action.payload.array_recipient.length + 1,
        reload: !state.reload
      }
    }

    case ActionTypes.CONSULTAR_VISTORIAS_SUCCESS: {
      return {
        ...state,
        vistorias: action.payload.vistorias,
        reload: !state.reload
      }
    }

    case ActionTypes.ATUALIZAR_RECIPIENTE: {
      let recipientes = state.recipientes;
      recipientes[ action.payload.index ] = action.payload.recipiente;

      return {
        ...state,
        recipientes,
        reload: !state.reload
      }
    }

    case ActionTypes.ALTERAR_UPDATEDINDEX: {
      return {
        ...state,
        updatedIndex: action.payload.index
      }
    }

    case ActionTypes.SET_QUARTEIRAO_SELECT: {
      return {
        ...state,
        selectQuarteirao: action.payload.option
      }
    }

    case ActionTypes.SET_IMOVEL_SELECTED: {
      return {
        ...state,
        imovel: action.payload.imovel,
        reload: !state.reload
      }
    }

    case ActionTypes.ADD_RECIPIENTE: {
      const qtdRepeticao = action.payload.qtdRepeticao;
      let recipiente = action.payload.recipiente;
      let seq = state.sequenciaRecipiente;
      let recips = [];

      if( !recipiente.fl_comFoco && qtdRepeticao > 1 ) {
        for( let index = 0; index < qtdRepeticao; index++ ) {
          recipiente = {
            ...recipiente,
            sequencia: seq++
          }

          recips = [ ...recips, recipiente ];
        }
      }else {
        seq++;
        recips = [ ...recips, recipiente ];
      }

      return {
        ...state,
        sequenciaRecipiente: seq,
        recipientes: [ ...state.recipientes, ...recips ],
        reload: !state.reload
      }
    }

    case ActionTypes.REMOVER_RECIPIENTE: {
      let recipientes = state.recipientes;
      let index = action.payload.index;
      recipientes.splice( index, 1 );

      return {
        ...state,
        recipientes,
        reload: !state.reload
      }
    }

    default:
      return { ...state };
  }
}
