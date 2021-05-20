export function startRouteRequest(route, daily_work_id, start_hour) {
  return {
    type: '@routes/START_ROUTE_REQUEST',
    payload: { route, daily_work_id, start_hour },
  };
}

export function startRouteSuccess(route, start_hour, daily_work_id) {
  return {
    type: '@routes/START_ROUTE_SUCCESS',
    payload: { route, start_hour, daily_work_id },
  };
}

export function startRouteFailure() {
  return {
    type: '@routes/START_ROUTE_FAILURE',
  };
}
