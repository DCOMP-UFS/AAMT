import { ActionTypes } from './cicloActions';

const INITIAL_STATE = {
  ciclo       : null,
  cicloAberto : null,
  ciclos      : [],
  index       : -1,
  created     : null,
  updated     : null,
  destroyed   : null,
  reload      : false,
  flAddActive : null,
}

export default function Atividade( state = INITIAL_STATE, action ) {
  switch(action.type) {
    case ActionTypes.SET_CICLO:
      return {
        ...state,
        ciclo: action.payload.ciclo
      };

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

    case ActionTypes.GET_OPEN_AND_FINISHED_CYCLES_SUCCESS: {
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

      const nw_ciclos = ciclos.filter(
        (elem) =>
          !action.payload.ids.find((id) => elem.id === id));

      return {
        ...state,
        ciclos: nw_ciclos,
        destroyed: true,
        reload: !state.reload,
      };
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
      return { ...state };
  }
}
