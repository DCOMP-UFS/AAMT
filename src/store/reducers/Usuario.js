import { ActionTypes } from '../actions/UsuarioActions';

const INITIAL_STATE = {
  nome: "",
  email: "",
  usuario: "",
  tipoPerfil: "",
  municipio: {
    codigo: null,
    nome: "",
  },
  toast: { message: null, type: null },
  usuarios: []
}

export default function Usuario(state = INITIAL_STATE, action) {
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
        toast: { message: "Usuário ou senha inválidos", type: "error" }
      }
    }

    case ActionTypes.CLEAR_TOAST:
      return { ...state, toast: { message: null, type: null } };

    case ActionTypes.GET_USUARIOS_SUCCESS: {
      console.log("Reducer");

      return {
        ...state,
      }
    }

    case ActionTypes.GET_USUARIOS_FAILURE: {
      return {
        ...state,
        toast: { message: "Não foi possível consultar os usuários", type: "error" }
      }
    }

    default: {
      return state;
    }
  }
}
