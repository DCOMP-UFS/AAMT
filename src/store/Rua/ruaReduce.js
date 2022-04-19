import { ActionTypes } from './ruaActions';
import { Rua } from '../../config/models/index';

const INITIAL_STATE = {
  rua: new Rua(),
  ruas: [],
  created: null,
  indexSelect: null
}

export default function Quarteirao( state = INITIAL_STATE, action ) {
  switch(action.type) {
    case ActionTypes.SET_RUA:
      return {
        ...state,
        rua: action.payload.rua
      };

    case ActionTypes.GET_STREET_BY_LOCALITY_SUCCESS: {
      return {
        ...state,
        ruas: action.payload.ruas
      }
    }

    case ActionTypes.CREATE_STREET_SUCCESS: {
      let ruas = state.ruas;

      const rua = action.payload.rua;

      ruas = [...ruas, rua];

      return {
        ...state,
        ruas,
        created: true
      }
    }

    case ActionTypes.UPDATE_STREET_SUCCESS: {
      let ruas = state.ruas;
      const rua = action.payload.rua;

      const index = ruas.findIndex( r => r.id === rua.id );
      ruas[index] = rua;

      return {
        ...state,
        ruas,
        updated: !state.updated
      }
    }

    case ActionTypes.DELETE_STREET_SUCCESS: {
      let ruas = state.ruas;

      ruas.splice( action.payload.index, 1 );

      return {
        ...state,
        ruas,
        updated: !state.updated
      }
    }

    case ActionTypes.CHANGE_STREET_SELECT: {
      return {
        ...state,
        indexSelect: action.payload.index
      }
    }

    default:
      return { ...state };
  }
}