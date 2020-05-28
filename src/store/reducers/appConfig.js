import { ActionTypes } from '../actions/appConfig';

const INITIAL_STATE = {
  usuario: {
    atuacoes: [
      { tipoPerfil: null }
    ]
  },
  /*
   * navToggle:
   *   true -> sidebar expandido
   *   false -> sidebar minimizado
   */
  navToggleLab: true,
  navToggle: true,
  token: "",
  toast: {},
}

export default function quarteirao(state = INITIAL_STATE, action){
  switch( action.type ) {
    case ActionTypes.AUTHENTICATE_SUCCESS: {
      const usuario = action.payload.user;

      return {
        ...state,
        usuario
      }
    }

    case ActionTypes.SIGN_OUT: {
      return {
        ...state,
        usuario: INITIAL_STATE.usuario,
        navToggleLab: INITIAL_STATE.navToggleLab,
        navToggle: INITIAL_STATE.navToggle,
        token: INITIAL_STATE.token,
        toast: INITIAL_STATE.toast,
      }
    }

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

    case ActionTypes.SHOW_NOTIFY_TOAST: {
      return {
        ...state,
        toast: { message: action.payload.message, type: action.payload.type }
      }
    }

    case ActionTypes.CLEAR_TOAST:
      return { ...state, toast: { message: null, type: null } };

    default:
      return state;
  }
}
