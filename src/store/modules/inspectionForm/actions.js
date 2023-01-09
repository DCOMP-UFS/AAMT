export function loadInspectionForm(propertyIndex) {
  return {
    type: '@inspectionform/LOAD_INSPECTION_FORM',
    payload: { propertyIndex },
  };
}

export function loadInspectionEditForm(propertyIndex, inspection) {
  return {
    type: '@inspectionform/LOAD_INSPECTION_EDIT_FORM',
    payload: { propertyIndex, inspection },
  };
}

export function saveStatusForm(status, pendency, startHour, justification) {
  return {
    type: '@inspectionform/SAVE_STATUS_FORM',
    payload: { status, pendency, startHour, justification },
  };
}

export function changeBlockIndex(blockIndex) {
  return {
    type: '@inspectionform/CHANGE_BLOCK_INDEX',
    payload: { blockIndex },
  };
}

export function changeStreetIndex(streetIndex) {
  return {
    type: '@inspectionform/CHANGE_STREET_INDEX',
    payload: { streetIndex },
  };
}

export function changePropertyIndex(propertyIndex) {
  return {
    type: '@inspectionform/CHANGE_PROPERTY_INDEX',
    payload: { propertyIndex },
  };
}

export function changeRecipientIndex(recipientIndex) {
  return {
    type: '@inspectionform/CHANGE_RECIPIENT_INDEX',
    payload: { recipientIndex },
  };
}

export function addRecipientToForm(recipient) {
  return {
    type: '@inspectionform/ADD_RECIPIENT_TO_FORM',
    payload: { recipient },
  };
}

export function editRecipient(recipient, recipientIndex) {
  return {
    type: '@inspectionform/EDIT_RECIPIENT',
    payload: { recipient, recipientIndex },
  };
}

export function deleteRecipient(recipientSequence) {
  return {
    type: '@inspectionform/DELETE_RECIPIENT',
    payload: { recipientSequence },
  };
}

export function cloneRecipient(recipient, numberClones, recipientSequence, sampleSequence) {
  return {
    type: '@inspectionform/CLONE_RECIPIENT',
    payload: { recipient, numberClones, recipientSequence, sampleSequence },
  };
}
