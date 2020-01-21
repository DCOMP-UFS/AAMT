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

export default function quarteirao(state = INITIAL_STATE, actions){
  switch( actions.type ) {
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
        token: actions.payload.token
      }
    }

    default:
      return state;
  }
}
