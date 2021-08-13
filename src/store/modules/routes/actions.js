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

export function removeFinishedRoute(daily_work_id) {
  return {
    type: '@routes/REMOVE_FINISHED_ROUTE',
    payload: { daily_work_id },
  };
}

export function setCurrentRoute(route_index) {
  return {
    type: '@routes/SET_CURRENT_ROUTE',
    payload: { route_index },
  };
}

export function addSampleSequence() {
  return {
    type: '@routes/ADD_SAMPLE',
    payload: {},
  };
}

export function addRecipient() {
  return {
    type: '@routes/ADD_RECIPIENT',
    payload: {},
  };
}

export function addInspection(inspection, address) {
  return {
    type: '@routes/ADD_INSPECTION',
    payload: { inspection, address },
  };
}

export function finishDailyWork(
  inspections,
  end_hour,
  daily_work_id,
  current_route_index
) {
  return {
    type: '@routes/FINISH_DAILY_WORK',
    payload: { inspections, end_hour, daily_work_id, current_route_index },
  };
}

export function finishDailyWorkSuccess(current_route_index) {
  return {
    type: '@routes/FINISH_DAILY_WORK_SUCCESS',
    payload: { current_route_index },
  };
}

export function editProperty(blockIndex, streetIndex, propertyIndex, property) {
  return {
    type: '@routes/EDIT_PROPERTY',
    payload: { blockIndex, streetIndex, propertyIndex, property },
  };
}
