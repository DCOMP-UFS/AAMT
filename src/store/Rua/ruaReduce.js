import { ActionTypes } from './ruaActions';
import { Rua } from '../../config/models/index';

const INITIAL_STATE = {
  rua: new Rua(),
  ruas: [],
  created: null,
  updated: null,
  deleted: null,
  indexSelect: null,
  sameName:null, // inutil
  sameCEP:null   // indica se ja existe uma rua com mesmo cep
}

export default function Quarteirao( state = INITIAL_STATE, action ) {
  switch(action.type) {
    case ActionTypes.SET_RUA:
      return {
        ...state,
        rua: action.payload.rua
      };

    case ActionTypes.GET_STREET_BY_CITY_SUCCESS: {
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

    case ActionTypes.CREATE_STREET_FAIL: {
      return {
        ...state,
        created: false
      }
    }

    case ActionTypes.CLEAR_CREATE_STREET: {
      return {
        ...state,
        created: null
      }
    }

    case ActionTypes.UPDATE_STREET_SUCCESS: {
      let ruas = state.ruas;
      const rua = action.payload.rua;

      return {
        ...state,
        updated: true
      }
    }

    case ActionTypes.UPDATE_STREET_FAIL: {
      return {
        ...state,
        updated: false
      }
    }

    case ActionTypes.CLEAR_UPDATE_STREET: {
      return {
        ...state,
        updated: null
      }
    }

    case ActionTypes.DELETE_STREET_SUCCESS: {
      return {
        ...state,
        deleted: true
      }
    }

    case ActionTypes.DELETE_STREET_FAIL: {
      return {
        ...state,
        deleted: false
      }
    }

    case ActionTypes.CLEAR_DELETE_STREET: {
      return {
        ...state,
        deleted: null
      }
    }

    case ActionTypes.CHANGE_STREET_SELECT: {
      return {
        ...state,
        indexSelect: action.payload.index
      }
    }

    case ActionTypes.STREET_EXIST_SUCCESS: {
      return {
        ...state,
        sameCEP:action.payload.data.sameCEP
      }
    }

    case ActionTypes.CLEAR_STREET_EXIST: {
      return {
        ...state,
        sameName:null,
        sameCEP:null
      }
    }

    default:
      return { ...state };
  }

}
