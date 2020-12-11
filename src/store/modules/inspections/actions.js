export function addInspection(inspection) {
  return {
    type: '@inspections/ADD_INSPECTION',
    payload: { inspection },
  };
}

export function editInspection(inspection, index) {
  return {
    type: '@inspections/EDIT_INSPECTION',
    payload: { inspection, index },
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
