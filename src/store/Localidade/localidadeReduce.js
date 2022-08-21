import { ActionTypes } from './localidadeActions';

const INITIAL_STATE = {
  localidade: {},
  localidades: [],
  index: -1,
  created: null,
  updated: null,
  reload: false
}

export default function Localidade(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_LOCATION_SUCCESS: {
      return {
        ...state,
        localidades: action.payload.localidades
      }
    }

    case ActionTypes.GET_LOCATION_BY_ID_SUCCESS: {
      return {
        ...state,
        localidade: action.payload.localidade
      }
    }

    case ActionTypes.GET_LOCATION_BY_CITY_SUCCESS: {
      return {
        ...state,
        localidades: action.payload.localidades
      }
    }

    case ActionTypes.CREATE_LOCATION_SUCCESS: {
      let localidades = state.localidades;

      const localidade = action.payload.localidade;

      localidades = [localidade, ...localidades];

      return {
        ...state,
        localidades,
        created: true
      }
    }

    case ActionTypes.CLEAR_CREATE_LOCATION: {
      return {
        ...state,
        created: null
      }
    }

    case ActionTypes.UPDATE_LOCATION_SUCCESS: {
      let localidades = state.localidades;
      const localidade = action.payload.localidade;

      const index = localidades.findIndex(( m ) => localidade.id === m.id );

      localidades[ index ] = localidade;

      return {
        ...state,
        localidades,
        updated: true,
        reload: !state.reload
      }
    }

    case ActionTypes.UPDATE_LOCATION_FAIL: {
      return {
        ...state,
        updated: false
      }
    }

    case ActionTypes.CHANGE_LOCATION_EDIT_INDEX: {
      return {
        ...state,
        index: action.payload.index
      }
    }

    case ActionTypes.CLEAR_UPDATE_LOCATION: {
      return {
        ...state,
        updated: null
      }
    }

    default:
      return { ...state }
  }
}
