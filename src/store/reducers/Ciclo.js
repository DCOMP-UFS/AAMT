import { ActionTypes } from '../actions/CicloActions';

const INITIAL_STATE = {
  ciclo: {},
  cicloAberto: {},
  ciclos: [],
  index: -1,
  created: null,
  updated: null,
  destroyed: null,
  reload: false,
  flAddActive: null,
}

export default function Ciclo(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_CYCLE_SUCCESS: {
      return {
        ...state,
        ciclo: action.payload.ciclo
      }
    }

    case ActionTypes.GET_CYCLES_FOR_YEAR_SUCCESS: {
      return {
        ...state,
        ciclos: action.payload.ciclos
      }
    }

    case ActionTypes.GET_CYCLES_SUCCESS: {
      return {
        ...state,
        ciclos: action.payload.ciclos
      }
    }

    case ActionTypes.GET_ALLOWED_CYCLES_SUCCESS: {
      return {
        ...state,
        ciclos: action.payload.ciclos
      }
    }

    case ActionTypes.GET_OPEN_CYCLE_SUCCESS: {
      return {
        ...state,
        cicloAberto: action.payload.ciclo
      }
    }

    case ActionTypes.UPDATE_CYCLE_SUCCESS: {
      let ciclos = state.ciclos;
      const ciclo = action.payload.ciclo;

      const index = ciclos.findIndex(( m ) => ciclo.id === m.id );

      ciclos[ index ] = ciclo;

      return {
        ...state,
        ciclos,
        updated: true,
        reload: !state.reload
      }
    }

    case ActionTypes.DESTROY_CYCLE_SUCCESS: {
      let ciclos = state.ciclos;

      const index = ciclos.findIndex(( u ) => action.payload.id === u.id );
      ciclos.splice( index, 1 );

      return {
        ...state,
        ciclos,
        destroyed: true,
        reload: !state.reload
      }
    }

    case ActionTypes.SET_INDEX_ARRAY: {
      return {
        ...state,
        index: action.payload.index
      }
    }

    case ActionTypes.CHANGE_FL_ADD_ACTIVE: {
      return {
        ...state,
        flAddActive: action.payload.flag
      }
    }

    case ActionTypes.CHANGE_FL_UPDATE: {
      return {
        ...state,
        updated: action.payload.flag
      }
    }

    case ActionTypes.CHANGE_FL_DESTROYED: {
      return {
        ...state,
        destroyed: action.payload.flag
      }
    }

    default:
      return { ...state }
  }
}
