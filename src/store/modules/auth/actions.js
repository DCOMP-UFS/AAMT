export function signInRequest(user, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {user, password},
  };
}

export function signInSuccess(profile) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {profile},
  };
}

export function signInFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
