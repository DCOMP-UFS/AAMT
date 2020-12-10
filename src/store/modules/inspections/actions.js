export function addInspection(inspection) {
  return {
    type: '@inspections/ADD_INSPECTION',
    payload: { inspection },
  };
}

export function addRecipient(recipient, property_id) {
  return {
    type: '@inspections/ADD_RECIPIENT',
    payload: { recipient, property_id },
  };
}
