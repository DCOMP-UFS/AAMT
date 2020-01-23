import { ActionTypes } from '../actions/user';

const INITIAL_STATE = {
  nome: "",
  email: "",
  usuario: "",
  tipoPerfil: "",
  toast: { message: null, type: null }
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE_SUCCESS: {
      const user = action.payload.user;

      return {
        ...state,
        nome: user.nome,
        usuario: user.usuario,
        email: user.email,
        tipoPerfil: user.tipoPerfil,
      }
    }

    case ActionTypes.AUTHENTICATE_FAILURE: {
      return {
        ...state,
        toast: { message: "Usuário ou senha inválidos ", type: "error" }
      }
    }

    case ActionTypes.CLEAR_TOAST:
      return { ...state, toast: { message: null, type: null } };

    default: {
      return state;
    }
  }
}
