export const ActionTypes = {
  GET_CATEGORY_REQUEST: "GET_CATEGORY_REQUEST",
  GET_CATEGORY_SUCCESS: "GET_CATEGORY_SUCCESS",
}

export const getCategoryRequest = () => {
  return {
    type: ActionTypes.GET_CATEGORY_REQUEST
  }
}

export const getCategorys = categorias => {
  return {
    type: ActionTypes.GET_CATEGORY_SUCCESS,
    payload: {
      categorias
    }
  }
}
