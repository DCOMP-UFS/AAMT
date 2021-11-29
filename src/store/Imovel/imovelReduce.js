import { ActionTypes } from './imovelActions';

const INITIAL_STATE = {
  imovel: {},
  imoveis: [],
  reload: false,
  created: null,
  updated: false
}

export default function Imovel( state = INITIAL_STATE, action ) {
  switch(action.type) {
    case ActionTypes.SET_IMOVEIS:
      return {
        ...state,
        imoveis: action.payload.imoveis,
        reload: !state.reload
      };

    case ActionTypes.SET_IMOVEL:
      return {
        ...state,
        imovel: action.payload.imovel,
        reload: !state.reload
      };

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