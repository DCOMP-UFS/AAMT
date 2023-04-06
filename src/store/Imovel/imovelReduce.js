import { ActionTypes } from './imovelActions';

const INITIAL_STATE = {
  imovel: {},
  imoveis: [],
  reload: false,
  created: null,
  updated: null,
  indexImovelUpdate: -1
}

export default function Imovel( state = INITIAL_STATE, action ) {
  switch(action.type) {
    case ActionTypes.SET_IMOVEIS:
      return {
        ...state,
        imoveis: action.payload.imoveis,
        reload: !state.reload
      };

    case ActionTypes.SET_IMOVEIS_POR_IMOVEL_ID: {
      let imoveis = state.imoveis;

      const index = imoveis.findIndex( imovel => imovel.id === action.payload.imovel_id );

      if( index > -1 )
        imoveis.splice( index, 1 );

      return {
        ...state,
        imoveis,
        reload: !state.reload
      };
    }

    case ActionTypes.SET_IMOVEL:
      return {
        ...state,
        imovel: action.payload.imovel,
        reload: !state.reload
      };

    case ActionTypes.SET_INDEX_IMOVEL_UPDATE:
      return {
        ...state,
        indexImovelUpdate: action.payload.index,
      };

    case ActionTypes.ADD_IMOVEL_REDUCE: {
      let imoveis   = state.imoveis;
      const imovel  = action.payload.imovel;

      imoveis = [ imovel, ...imoveis ];

      return {
        ...state,
        imoveis,
        created: true
      }
    }

    case ActionTypes.CREATE_HOUSE_SUCCESS: {
      let imoveis = state.imoveis;

      const imovel = action.payload.imovel;

      imoveis = [imovel, ...imoveis];

      return {
        ...state,
        imoveis,
        created: true
      }
    }

    case ActionTypes.EDITAR_IMOVEL_SUCCESS: {
      let imoveis = state.imoveis;
      const index = state.indexImovelUpdate
      const imovel = action.payload.imovel;

      imoveis[index] = imovel

      return {
        ...state,
        imoveis,
        indexImovelUpdate: -1,
        reload: !state.reload,
        updated: true
      }
    }

    case ActionTypes.SET_CREATED_TRUE: {
      return {
        ...state,
        created: true
      }
    }

    case ActionTypes.SET_UPDATED_TRUE: {
      return {
        ...state,
        updated: true
      }
    }

    case ActionTypes.SET_CREATED_FALSE: {
      return {
        ...state,
        created: false
      }
    }

    case ActionTypes.SET_UPDATED_FALSE: {
      return {
        ...state,
        updated: false
      }
    }

    case ActionTypes.CLEAR_CREATE_HOUSE: {
      return {
        ...state,
        created: null
      }
    }

    case ActionTypes.CLEAR_UPDATE_HOUSE: {
      return {
        ...state,
        updated: null
      }
    }

    default:
      return { ...state };
  }
}
