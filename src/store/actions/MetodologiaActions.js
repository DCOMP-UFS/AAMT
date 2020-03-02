export const ActionTypes = {
  GET_METHODOLOGIES_REQUEST: "GET_METHODOLOGIES_REQUEST",
  GET_METHODOLOGIES_SUCCESS: "GET_METHODOLOGIES_SUCCESS"
}

export const getMethodologiesRequest = () => {
  return {
    type: ActionTypes.GET_METHODOLOGIES_REQUEST
  }
}

export const getMethodologies = metodologias => {
  return {
    type: ActionTypes.GET_METHODOLOGIES_SUCCESS,
    payload: {
      metodologias
    }
  }
}
