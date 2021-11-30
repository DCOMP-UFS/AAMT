import { ActionTypes } from './regionalSaudeActions';

const INITIAL_STATE = {
  regionaisSaude: []
}

export default function RegionalSaude(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_REGIONAL_HEALTH_BY_STATE_SUCCESS: {
      return {
        ...state,
        regionaisSaude: action.payload.regionaisSaude
      }
    }

    default:
      return { ...state }
  }
}