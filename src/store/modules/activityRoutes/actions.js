export function getRouteRequest(user_id, date) {
  return {
    type: '@activity/GET_ROUTE_REQUEST',
    payload: { user_id, date },
  };
}

export function getRouteSuccess(data) {
  return {
    type: '@activity/GET_ROUTE_SUCCESS',
    payload: { data },
  };
}

export function startActivity(activity_id, start_hour) {
  return {
    type: '@activity/START_ROUTE',
    payload: { activity_id, start_hour },
  };
}

export function endActivity(activity_id, end_hour, inspections) {
  return {
    type: '@activity/END_ROUTE',
    payload: { activity_id, end_hour, inspections },
  };
}

export function saveRoute(start_hour, routes) {
  return {
    type: '@activity/SAVE_ROUTE',
    payload: { routes, start_hour },
  };
}
