export const auth = ( usuario, senha, conectado ) => {
  const users = [
    { usuario: "weslan", senha: "123456", nome: "Weslan Rezende Alves", email: "weslan@teste.com", perfil: "coordenador" },
    { usuario: "lab", senha: "123456", nome: "Weslan Rezende Alves", email: "lab@teste.com", perfil: "laboratorialista" }
  ]

  const result = users.find( u => ( u.usuario === usuario && u.senha === senha ) );

  return result;
}

export const isAuthenticated = () => {
  return true;
}
