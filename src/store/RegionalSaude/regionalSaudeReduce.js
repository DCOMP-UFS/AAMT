import { ActionTypes } from './regionalSaudeActions';

const INITIAL_STATE = {
  regionaisSaude: [],
  regionalSaude: {},
  created: null,
  updated: null,
  situacaoRegional: {}
}

export default function RegionalSaude(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_REGIONAL_HEALTH_BY_ID_SUCCESS: {
      return {
        ...state,
        regionalSaude: action.payload.regional
      }
    }
    case ActionTypes.GET_REGIONAL_HEALTH_BY_STATE_SUCCESS: {
      return {
        ...state,
        regionaisSaude: action.payload.regionaisSaude
      }
    }
    case ActionTypes.CREATE_REGIONAL_HEALTH_SUCCESS:{
      let regionaisSaude = state.regionaisSaude;

      const regional = action.payload.regional;

      regionaisSaude = [regional, ...regionaisSaude];

      return {
        ...state,
        regionaisSaude,
        created: true
      }
    }
    case ActionTypes.CREATE_REGIONAL_HEALTH_FAIL: {
      return {
        ...state,
        created: false
      }
    }

    case ActionTypes.CLEAR_CREATED_REGIONAL_HEALTH: {
      return {
        ...state,
        created: null
      }
    }

    case ActionTypes.UPDATE_REGIONAL_HEALTH_SUCCESS:{
      
      return {
        ...state,
        updated: true
      }
    }
    case ActionTypes.UPDATE_REGIONAL_HEALTH_FAIL: {
      return {
        ...state,
        updated: false
      }
    }

    case ActionTypes.UPDATE_REGIONAL_HEALTH_RESET: {
      return {
        ...state,
        updated: null
      }
    }

    case ActionTypes.GET_REGIONAL_HEALTH_SITUATION_SUCCESS: {
      return {
        ...state,
        situacaoRegional: action.payload.situacaoRegional
      }
    }

    default:
      return { ...state }
  }
}