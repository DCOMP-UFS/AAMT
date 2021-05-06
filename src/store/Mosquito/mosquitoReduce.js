import { ActionTypes } from './mosquitoActions';

const INITIAL_STATE = {
  mosquitos: [],
  reload: false
}

export default function Mosquito( state = INITIAL_STATE, action ) {
  switch( action.type ) {
    case ActionTypes.SET_MOSQUITOS:
      return {
        ...state,
        mosquitos: action.payload.mosquitos,
        reload: !state.reload
      };

    default:
      return { ...state };
  }
}
