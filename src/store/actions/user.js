export const ActionTypes = {
  AUTHENTICATE: "AUTHENTICATE"
}

export const authenticate = user => {
  return {
    type: ActionTypes.AUTHENTICATE,
    payload: {
      user,
    }
  }
}
