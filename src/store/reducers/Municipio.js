import { ActionTypes } from '../actions/MunicipioActions';

const INITIAL_STATE = {
  municipio: {},
  municipios: [],
  indexCity: -1,
  createdCity: null,
  updatedCity: null,
  reload: false,
  municipiosList: []
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

    default:
      return { ...state }
  }
}
