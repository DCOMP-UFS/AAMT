import { ActionTypes } from './usuarioActions';

const INITIAL_STATE = {
  usuario: {},
  usuarioUpdate: {},
  usuarios: [],
  indexUser: -1,
  createUser: null,
  updateUser: null,
  reload: false,
  recuperarSenha: null,
  isTokenRecuperacaoSenhaValid: false,
  senhaAlterada: null,
}

export default function Usuario(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_USUARIOS_SUCCESS: {
      let usuarios = state.usuarios;

      usuarios = action.payload.usuarios;

      return {
        ...state,
        usuarios,
        reload: !state.reload
      }
    }

    case ActionTypes.GET_USERS_BY_REGIONAL_SUCCESS: {
      return {
        ...state,
        usuarios: action.payload.usuarios,
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

    case ActionTypes.GET_USUARIO_BY_ID_SUCCESS: {
      return {
        ...state,
        usuarioUpdate: action.payload.usuario
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
      let usuarios = state.usuarios;
      const usuario = action.payload.usuario;

      const index = usuarios.findIndex(( m ) => usuario.id === m.id );

      usuarios[ index ] = usuario;

      return {
        ...state,
        usuarios,
        reload: !state.reload,
        updateUser: true
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
        indexUser: action.payload.index
      }
    }

    case ActionTypes.BLOQUEAR_MEMBROS_EQUIPE: {
      let listaMembros = state.usuarios
     
      action.payload.membrosSelecionados
        .forEach(
          m => listaMembros[ m.dataIndex ] = {
            ...listaMembros[ m.dataIndex ],
            flEquipe: true,
          }
        );

      return {
        ...state,
        usuarios: listaMembros,
        reload: !state.reload
      }
    }

    case ActionTypes.LIBERAR_MEMBROS_EQUIPE: {
      let listaMembros = state.usuarios
     
      action.payload.membrosEquipe
        .forEach(
          m => listaMembros[ m.dataIndex ].flEquipe = false,
        );

      return {
        ...state,
        usuarios: listaMembros,
        reload: !state.reload
      }
    }

    case ActionTypes.RECUPERAR_SENHA_SUCCESS: {
      return {
        ...state,
        recuperarSenha: true
      }
    }

    case ActionTypes.RECUPERAR_SENHA_FAIL: {
      return {
        ...state,
        recuperarSenha: false
      }
    }

    case ActionTypes.RECUPERAR_SENHA_RESET: {
      return {
        ...state,
        recuperarSenha: null
      }
    }

    case ActionTypes.VALIDAR_TOKEN_ALTERACAO_SENHA_SUCCESS: {
      return {
        ...state,
        isTokenRecuperacaoSenhaValid: true
      }
    }

    case ActionTypes.VALIDAR_TOKEN_ALTERACAO_SENHA_FAIL: {
      return {
        ...state,
        isTokenRecuperacaoSenhaValid: false
      }
    }

    case ActionTypes.ALTERAR_SENHA_SUCCESS: {
      return {
        ...state,
        senhaAlterada: true
      }
    }

    case ActionTypes.ALTERAR_SENHA_FAIL: {
      return {
        ...state,
        senhaAlterada: false
      }
    }

    case ActionTypes.ALTERAR_SENHA_RESET: {
      return {
        ...state,
        senhaAlterada: null
      }
    }

    default: {
      return state;
    }
  }
}
