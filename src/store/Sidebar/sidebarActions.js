export const ActionTypes = {
  CHANGE_SIDEBAR: "CHANGE_SIDEBAR",
  SET_MENU_SIDEBAR: "SET_MENU_SIDEBAR",
};

export const changeSidebar = ( slug, subSlug = undefined ) => {
  return {
    type: ActionTypes.CHANGE_SIDEBAR,
    payload: {
      slug,
      subSlug
    }
  }
}

/**
 * Solicita a alteração dos menus do sidebar
 * @param {array} menus 
 * @returns {Object}
 */
export const setMenuSidebar = menus => {
  return {
    type: ActionTypes.SET_MENU_SIDEBAR,
    payload: {
      menus
    }
  }
}
