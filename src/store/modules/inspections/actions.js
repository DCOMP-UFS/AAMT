export function addInspection(inspection) {
  return {
    type: '@inspections/ADD_INSPECTION',
    payload: { inspection },
  };
}

export function editInspection(inspection, property_id) {
  return {
    type: '@inspections/EDIT_INSPECTION',
    payload: { inspection, property_id },
  };
}

export function editRecipient(recipient, property_id, recipientSequence) {
  return {
    type: '@inspections/EDIT_RECIPIENT',
    payload: { recipient, property_id, recipientSequence },
  };
}

export function addRecipient(recipient, property_id) {
  return {
    type: '@inspections/ADD_RECIPIENT',
    payload: { recipient, property_id },
  };
}

export function removeRecipient(propertyIndex, recipientSequence) {
  return {
    type: '@inspections/REMOVE_RECIPIENT',
    payload: { propertyIndex, recipientSequence },
  };
}
