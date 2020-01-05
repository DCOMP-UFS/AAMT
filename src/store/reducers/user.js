import { ActionTypes } from '../actions/user';

const INITIAL_STATE = {
  nome: "",
  email: "",
  usuario: "",
  perfil: "",
  token: "",
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE: {
      const user = action.payload.user;

      return {
        nome: user.nome,
        usuario: user.usuario,
        email: user.email,
        perfil: user.perfil,
      }
    }

    default: {
      return state;
    }
  }
}
