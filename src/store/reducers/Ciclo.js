import { ActionTypes } from '../actions/CicloActions';

const INITIAL_STATE = {
  ciclo: {},
  ciclos: [],
  index: -1,
  created: null,
  updated: null,
  reload: false
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

    case ActionTypes.UPDATE_CYCLE_SUCCESS: {
      let ciclos = state.ciclos;
      const ciclo = action.payload.ciclo;

      const index = ciclos.findIndex(( m ) => ciclo.id === m.id );

      ciclos[ index ] = ciclo;

      return {
        ...state,
        ciclos,
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
        reload: !state.reload
      }
    }

    case ActionTypes.SET_INDEX_ARRAY: {
      return {
        ...state,
        index: action.payload.index
      }
    }

    default:
      return { ...state }
  }
}
