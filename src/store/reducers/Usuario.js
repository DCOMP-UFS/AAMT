import { ActionTypes } from '../actions/UsuarioActions';

const INITIAL_STATE = {
  reload: false,

  usuario: {
    nome: "",
    email: "",
    usuario: "",
    tipoPerfil: "",
    municipio: {
      id: null,
      codigo: null,
      nome: "",
    },
  },
  usuarios: [],
  createUser: null,
  updateUser: null,
  indexUser: -1,
  reloadIndex: false,
}

export default function Usuario(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE_SUCCESS: {
      const usuario = action.payload.user;

      return {
        ...state,
        usuario
      }
    }

    case ActionTypes.GET_USUARIOS_SUCCESS: {
      let usuarios = state.usuarios;

      usuarios = action.payload.usuarios;

      return {
        ...state,
        usuarios,
        reload: !state.reload
      }
    }

    case ActionTypes.GET_USUARIOS_FAILURE: {
      return {
        ...state,
        toast: { message: "Não foi possível consultar os usuários", type: "error" },
        createUser: false
      }
    }

    case ActionTypes.CREATE_USUARIO_SUCCESS: {
      let usuarios = state.usuarios;

      const user = action.payload.usuario;

      usuarios = [ user, ...usuarios ];

      return {
        ...state,
        toast: { message: "Usuário criado com sucesso", type: "success" },
        usuarios,
        createUser: true
      }
    }

    case ActionTypes.CREATE_USUARIO_FAILURE: {
      return {
        ...state,
        toast: { message: "Falha ao criar usuário", type: "error" },
        createUser: false
      }
    }

    case ActionTypes.UPDATE_USUARIO_SUCCESS: {
      return {
        ...state,
        toast: { message: "Usuário(s) alterado com sucesso", type: "success" },
        updateUser: true,
        reload: !state.reload
      }
    }

    case ActionTypes.UPDATE_USUARIO_FAILURE: {
      return {
        ...state,
        toast: { message: "Falha ao atualizar usuário(s)", type: "success" },
        updateUser: false
      }
    }

    case ActionTypes.CLEAR_CREATE_USER: {
      return {
        ...state,
        createUser: null
      }
    }

    case ActionTypes.CLEAR_UPDATE_USER: {
      return {
        ...state,
        updateUser: null
      }
    }

    case ActionTypes.CHANGE_USER_EDIT_INDEX: {
      return {
        ...state,
        indexUser: action.payload.index,
        reloadIndex: !state.reloadIndex
      }
    }

    default: {
      return state;
    }
  }
}
