import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, (draft) => {
        draft.profile = action.payload.profile;
      });
    case '@auth/SIGN_OUT':
      return produce(state, (draft) => {
        draft.profile = INITIAL_STATE.profile;
      });
    default:
      return state;
  }
}
