export const ActionTypes = {
  GET_NATIONS_REQUEST: "GET_NATIONS_REQUEST",
  GET_NATIONS_SUCCESS: "GET_NATIONS_SUCCESS",
}

export const getNationsRequest = () => {
  return {
    type: ActionTypes.GET_NATIONS_REQUEST
  }
}

export const getNations = paises => {
  return {
    type: ActionTypes.GET_NATIONS_SUCCESS,
    payload: {
      paises
    }
  }
}
