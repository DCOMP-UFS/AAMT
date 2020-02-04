import { ActionTypes } from '../actions/ZonaActions';

const INITIAL_STATE = {
  zona: {},
  zonas: [],
  index: -1,
  created: null,
  updated: null,
  reload: false
}

export default function Zona(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_ZONE_BY_CITY_SUCCESS: {
      return {
        ...state,
        zonas: action.payload.zonas
      }
    }

    case ActionTypes.GET_ZONE_BY_ID_SUCCESS: {
      return {
        ...state,
        zona: action.payload.zona
      }
    }

    case ActionTypes.CREATE_ZONE_SUCCESS: {
      let zonas = state.zonas;

      const zona = action.payload.zona;

      zonas = [zona, ...zonas];

      return {
        ...state,
        zonas,
        created: true
      }
    }

    case ActionTypes.CLEAR_CREATE_ZONE: {
      return {
        ...state,
        created: null
      }
    }


    case ActionTypes.UPDATE_ZONE_SUCCESS: {
      let zonas = state.zonas;
      const zona = action.payload.zona;

      const index = zonas.findIndex(( z ) => zona.id === z.id );

      zonas[ index ] = zona;

      return {
        ...state,
        zonas,
        updated: true,
        reload: !state.reload
      }
    }

    case ActionTypes.CLEAR_UPDATE_ZONE: {
      return {
        ...state,
        updated: null
      }
    }

    default:
      return { ...state }
  }
}
