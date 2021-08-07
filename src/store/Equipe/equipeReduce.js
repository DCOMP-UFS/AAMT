import { ActionTypes } from './equipeActions';

const INITIAL_STATE = {
  membros: [],
  reload: false
}

export default function Equipe( state = INITIAL_STATE, action ) {
  switch( action.type ) {
    case ActionTypes.SET_MEMBROS:
      return {
        ...state,
        membros: action.payload.membros,
        reload: !state.reload
      };

    default:
      return { ...state };
  }
}
