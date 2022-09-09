import { ActionTypes } from './vistoriaCacheActions';

const INITIAL_STATE = {
  vistorias: [],
  sequenciaVistoria: 1,
  handleSave: false,
  showNotStarted: false,
  reload: false,
  
  //armazena o index da vistoria que será editada
  vistoriaIndexEdit: -1
}

export default function VistoriaCache(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.LIMPAR_VISTORIAS: {
      return {
        ...state,
        vistorias: []
      }
    }

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

    case ActionTypes.UPDATE_INSPECTION: {
      let vistorias = state.vistorias;
      vistorias[ action.payload.int_indexInspection ] = action.payload.class_inspection;

      return {
        ...state,
        vistorias,
        handleSave: true
      }
    }

    case ActionTypes.ADD_VISTORIA: {
      return {
        ...state,
        vistorias: [ ...state.vistorias, action.payload.vistoria ],
        handleSave: true
      }
    }

    case ActionTypes.DELETAR_VISTORIA: {
      let vistorias = state.vistorias,
          rowSelected = action.payload.rowSelected;

      rowSelected.forEach( row => {
        vistorias[ row.dataIndex ].delete = true;
      });

      vistorias = vistorias.filter( v => v.delete ? false : true );

      return {
        ...state,
        vistorias,
        reload: !state.reload
      }
    }

    case ActionTypes.SET_VISTORIA_INDEX_EDIT: {
      return {
        ...state,
        vistoriaIndexEdit: action.payload.vistoriaIndexEdit
      }
    }

    default:
      return state;
  }
}