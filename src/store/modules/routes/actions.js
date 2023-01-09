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

export function removeSampleSequence() {
  return {
    type: '@routes/REMOVE_SAMPLE',
    payload: {},
  };
}

export function addRecipient() {
  return {
    type: '@routes/ADD_RECIPIENT',
    payload: {},
  };
}

export function addInspectionWithPendency(
  status,
  pendency,
  startHour,
  justification,
  indexes,
  dailyWorkId
) {
  return {
    type: '@routes/ADD_INSPECTION_WITH_PENDENCY',
    payload: {
      status,
      pendency,
      startHour,
      justification,
      indexes,
      dailyWorkId,
    },
  };
}

export function addInspectionWithoutPendency(form, indexes, dailyWorkId) {
  return {
    type: '@routes/ADD_INSPECTION_WITHOUT_PENDENCY',
    payload: { form, indexes, dailyWorkId },
  };
}

export function removeInspection(removeIndexes) {
  return {
    type: '@routes/REMOVE_INSPECTION',
    payload: { removeIndexes },
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

export function finishDailyWorkFail() {
  return {
    type: '@routes/FINISH_DAILY_WORK_FAIL',
  };
}

export function resetfinishDailyWork() {
  return {
    type: '@routes/RESET_FINISH_DAILY_WORK',
  };
}

export function editProperty(blockIndex, streetIndex, propertyIndex, property) {
  return {
    type: '@routes/EDIT_PROPERTY',
    payload: { blockIndex, streetIndex, propertyIndex, property },
  };
}

export function ajustarSequencias(numberClones, numberSamples) {
  return {
    type: '@routes/ADJUST_INSPECTION_SEQUENCE',
    payload: { numberClones, numberSamples },
  };
}

