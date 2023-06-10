import { ActionTypes } from './municipioActions';

const INITIAL_STATE = {
  municipio: {},
  municipios: [],
  indexCity: -1,
  createdCity: null,
  updatedCity: null,
  reload: false,
  municipiosList: [],
  municipiosAtuaisRegional: [],
  municipiosAntigosRegional: [],
  transferedCity: null,
  rebindedCity: null,

}

export default function Municipio(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_MUNICIPIOS_SUCCESS: {
      return {
        ...state,
        municipios: action.payload.municipios
      }
    }

    case ActionTypes.GET_CITY_BY_ID_SUCCESS: {
      return {
        ...state,
        municipio: action.payload.municipio
      }
    }

    case ActionTypes.GET_CITY_BY_REGIONAL_HEALTH_SUCCESS: {
      return {
        ...state,
        municipiosList: action.payload.municipios
      }
    }

    case ActionTypes.GET_ACTUAL_CITY_FROM_REGIONAL_HEALTH_SUCCESS: {
      return {
        ...state,
        municipiosAtuaisRegional: action.payload.municipios
      }
    }

    case ActionTypes.GET_OLD_CITY_FROM_REGIONAL_HEALTH_SUCCESS: {
      return {
        ...state,
        municipiosAntigosRegional: action.payload.municipios
      }
    }

    case ActionTypes.CREATE_CITY_SUCCESS: {
      let municipios = state.municipios;

      const municipio = action.payload.municipio;

      municipios = [municipio, ...municipios];

      return {
        ...state,
        // toast: { message: "Município criado com sucesso", type: "success" },
        municipios,
        createdCity: true
      }
    }

    case ActionTypes.CREATE_CITY_FAIL: {
      return {
        ...state,
        createdCity: false
      }
    }

    case ActionTypes.CLEAR_CREATE_CITY: {
      return {
        ...state,
        createdCity: null
      }
    }

    case ActionTypes.UPDATE_CITY_SUCCESS: {
      let municipios = state.municipios;
      const municipio = action.payload.municipio;

      const index = municipios.findIndex(( m ) => municipio.id === m.id );

      municipios[ index ] = municipio;

      return {
        ...state,
        municipios,
        updatedCity: true,
        reload: !state.reload
      }
    }

    case ActionTypes.CHANGE_CITY_EDIT_INDEX: {
      return {
        ...state,
        indexCity: action.payload.index
      }
    }

    case ActionTypes.CLEAR_UPDATE_CITY: {
      return {
        ...state,
        updatedCity: null
      }
    }

    case ActionTypes.TRANSFER_CITY_REGIONAL_SUCCESS: {
      return {
        ...state,
        transferedCity: true
      }
    }

    case ActionTypes.TRANSFER_CITY_REGIONAL_FAIL: {
      return {
        ...state,
        transferedCity: false
      }
    }

    case ActionTypes.TRANSFER_CITY_REGIONAL_RESET: {
      return {
        ...state,
        transferedCity: null
      }
    }

    case ActionTypes.REBIND_CITY_REGIONAL_SUCCESS: {
      return {
        ...state,
        rebindedCity: true
      }
    }

    case ActionTypes.REBIND_CITY_REGIONAL_FAIL: {
      return {
        ...state,
        rebindedCity: false
      }
    }

    case ActionTypes.REBIND_CITY_REGIONAL_RESET: {
      return {
        ...state,
        rebindedCity: null
      }
    }

    default:
      return { ...state }
  }
}
