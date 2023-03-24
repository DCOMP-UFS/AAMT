import { ActionTypes } from './appConfigActions';

const INITIAL_STATE = {
  usuario: {
    atuacoes: [
      { tipoPerfil: null }
    ],
    permissoes: []
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
  //estado abaixo pode receber 3 valores
  // - true: indica que a autentifivação foi feito com sucesso 
  // - false: indica que houve uma falha na autentificação
  // - null: depois do sucesso/fracasso da autetificação, deve receber null para indicar um estado neutro
  acabouDeLogar:null
}

export default function appConfig(state = INITIAL_STATE, action){
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

    case ActionTypes.SET_ACABOU_DE_LOGAR: {
      return {
        ...state,
        acabouDeLogar: action.payload.acabouDeLogar
      }
    }

    default:
      return state;
  }
}
