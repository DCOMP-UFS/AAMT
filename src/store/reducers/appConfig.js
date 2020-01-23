import { ActionTypes } from '../actions/appConfig';

const INITIAL_STATE = {
  /*
   * navToggle:
   *   true -> sidebar expandido
   *   false -> sidebar minimizado
   */
  navToggleLab: true,
  navToggle: true,
  token: "",
}

export default function quarteirao(state = INITIAL_STATE, action){
  switch( action.type ) {
    case ActionTypes.NAV_TOGGLE: {
      return {
        ...state,
        navToggle: !state.navToggle,
      }
    }

    case ActionTypes.NAV_TOGGLE_LAB: {
      return {
        ...state,
        navToggleLab: !state.navToggleLab,
      }
    }

    case ActionTypes.SET_TOKEN: {
      return {
        ...state,
        token: action.payload.token
      }
    }

    default:
      return state;
  }
}
