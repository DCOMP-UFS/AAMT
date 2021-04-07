export const ActionTypes = {
  SET_APELIDO_EQUIPE_REQUEST: "SET_APELIDO_EQUIPE_REQUEST"
}

export const setApelidoEquipeRequest = ( equipe_id, apelido ) => {
  console.log( equipe_id, apelido );

  return {
    type: ActionTypes.SET_APELIDO_EQUIPE_REQUEST,
    payload: {
      equipe_id,
      apelido
    }
  }
}
