import { IoIosCode, IoIosCheckboxOutline, IoIosPaper } from 'react-icons/io';
import { FaTasks } from 'react-icons/fa';

import { ActionTypes } from '../actions/sidebar';

const location = window.location.origin.toString();

const INITIAL_STATE = {
  // Menu ativo currenteNav: [ menu, submenu ]
  currentNav: [ 1, 0 ],
  menu: [
    {
      description: "Operacional",
      type: "category"
    },
    {
      description: "Trabalho Diário",
      type: "nav",
      active: true,
      icon: FaTasks,
      submenu: [
        {
          active: true,
          description: "Iniciar",
          url: location + "/trabalho_diario/iniciar"
        },
        {
          active: false,
          description: "Realizar Vistoria",
          url: location + "/trabalho_diario/vistoria/lista"
        },
      ]
    },
    {
      description: "Administrativo",
      type: "category"
    },
    {
      description: "Atividade",
      type: "nav",
      active: false,
      icon: IoIosPaper,
      submenu: [
        {
          active: false,
          description: "Cadastrar",
          url: location + "/atividade/cadastrar"
        },
      ]
    },
    {
      description: "Recursos de Interface",
      type: "category"
    },
    {
      description: "Elementos Básicos",
      type: "nav",
      active: false,
      icon: IoIosCode,
      submenu: [
        {
          active: false,
          description: "Botões",
          url: location + "/elementos/botoes"
        },
        {
          active: false,
          description: "Tipografia",
          url: location + "/elementos/tipografia"
        },
      ]
    },
    {
      description: "Formulários",
      type: "link",
      active: false,
      icon: IoIosCheckboxOutline,
      url: location + "/elementos/formulario",
      submenu: []
    },
  ]
}

export default function sidebar(state = INITIAL_STATE, action) {
  switch( action.type ) {
    case ActionTypes.CHANGE_SIDEBAR: {
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

    case ActionTypes.NAV_TOGGLE: {

      return {
        ...state,
        navToggle: !state.navToggle,
      }
    }

    default: {
      return state;
    }
  }
}
