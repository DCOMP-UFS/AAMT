const INITIAL_STATE = {
  nome: "",
  email: "",
  usuario: "",
  senha: "",
  perfil: "",
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
