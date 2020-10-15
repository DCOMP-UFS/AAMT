import { ActionTypes } from '../actions/VistoriaCacheActions';

const INITIAL_STATE = {
  vistorias: [],
  sequenciaVistoria: 1,
  handleSave: false,
  showNotStarted: false,
  reload: false
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

    default:
      return state;
  }
}
