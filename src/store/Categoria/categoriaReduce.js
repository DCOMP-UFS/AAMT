import { ActionTypes } from './categoriaActions';

const INITIAL_STATE = {
  categorias: []
}

export default function Categoria(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        categorias: action.payload.categorias
      }
    }

    default:
      return { ...state }
  }
}
