import { FaMapMarked, FaChartLine } from 'react-icons/fa';
import { ActionTypes } from '../actions/sidebarLab';

const location = window.location.origin.toString();

const INITIAL_STATE = {
  // Menu ativo currenteNav: [ menu, submenu ]
  currentNav: [ 1, 0 ],
  menu: [
    {
      description: "Mapa",
      type: "link",
      active: true,
      icon: FaMapMarked,
      url: location + "/lab/home",
      submenu: []
    },
    {
      description: "Relatórios",
      type: "link",
      active: false,
      icon: FaChartLine,
      url: location + "/lab/relatorio",
      submenu: []
    },
  ]
}

export default function sidebar(state = INITIAL_STATE, action) {
  switch( action.type ) {
    case ActionTypes.CHANGE_SIDEBAR_LAB: {
      const { index, subIndex } = action.payload;
      let currentNav = state.currentNav;
      let menu = state.menu;

      menu[currentNav[0]].active = false;

      if(
        menu[currentNav[0]].type !== "category" &&
        menu[currentNav[0]].submenu.length > 0
      ) {
        menu[currentNav[0]].submenu[currentNav[1]].active = false;
      }

      menu[index].active = true;

      if(
        menu[index].type !== "category" &&
        menu[index].submenu.length > 0
      ) {
        menu[index].submenu[subIndex].active = true;
      }

      currentNav = [ index, subIndex ];

      return {
        ...state,
        currentNav,
        menu
      }
    }

    default: {
      return state;
    }
  }
}
