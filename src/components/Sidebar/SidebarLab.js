import React, { Component } from 'react';
import { IoIosArrowDown, IoIosReturnRight, IoIosArrowRoundBack, IoIosLogOut } from 'react-icons/io';
import { FaBuilding } from 'react-icons/fa';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '../../assets/user-icon.png';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { navToggleLab } from '../../store/actions/appConfig';

// COMPONENTS
import './style.css';
import { Separator, FormGroup } from '../../styles/global';
import {
  ContainerLab,
  ContainerArrowBack,
  PerfilUser,
  Photo,
  ContainerAvatar,
  Search,
  Logout,
} from './styles';

class SidebarLab extends Component {
  logout = () => {
    window.location = window.location.origin.toString();
  }

  render () {
    const menu = this.props.sidebarLab.menu;
    const navToggle = this.props.navToggle;
    const user = this.props.user;

    return (
      <ContainerLab className="sidebar" collapse={ navToggle } >
        <ContainerArrowBack>
          <Tooltip
            title="Fechar"
            className="bg-white"
            onClick={ this.props.navToggleLab } >
            <IconButton aria-label="more" className="text-muted">
              <IoIosArrowRoundBack />
            </IconButton>
          </Tooltip>
        </ContainerArrowBack>

        <PerfilUser>
          <Photo>
            <img src={ UserIcon } alt="Perfil"/>
          </Photo>

          <h4 className="text-white">{ user.nome }</h4>

          <ContainerAvatar>
            <Avatar className="bg-primary">
              <FaBuilding />
            </Avatar>
            <span>Laboratório</span>
          </ContainerAvatar>
        </PerfilUser>

        <Separator sizeBorder="3px"/>

        <Search>
          <FormGroup className="form-dark">
            <input
              type="text"
              className="form-control"
              placeholder="Insira o código da amostra" />
          </FormGroup>
        </Search>

        <UlSidebar menu={ menu } />

        <Logout>
          <Button color="primary" onClick={ this.logout }>
            <IoIosLogOut /> Sair
          </Button>
        </Logout>
      </ContainerLab>
    )
  }
}

function UlSidebar ( props ) {
  const { menu } = props;

  const li = menu.map( ( nav, index ) => {
    switch( nav.type ) {
      case "category": {
        return (
          <li key={ index } className="nav-item nav-category">
            { nav.description }
          </li>
        )
      }

      case "nav":{
        return (
          <li key={ index } className={ nav.active ? "nav-item active" : "nav-item" }>
            <button
              href={ nav.link }
              className="nav-link"
              data-toggle="collapse"
              data-target={ "#sidebar-" + index }
              aria-expanded="false"
            >

              <span className="menu-icon"><nav.icon className="icon-sm" /></span>
              <span className="menu-text">{ nav.description }</span>
              <IoIosArrowDown className="menu-arrow ml-2" />

            </button>

            <div id={ "sidebar-" + index } className={ nav.active ? "container-sub-menu collapse show" : "container-sub-menu collapse" }>

              <ul className="nav flex-column sub-menu">

                {
                  nav.submenu.map( ( subNav, subIndex ) => (
                    <li key={ subIndex } className={ subNav.active ? "nav-item active" : "nav-item" }>
                      <a className="nav-link" href={ subNav.url }>
                        <IoIosReturnRight className="icon" />
                        { subNav.description }
                      </a>
                    </li>
                  ))
                }

              </ul>

            </div>
          </li>
        )
      }

      case "link":{
        return (
          <li key={ index } className={ nav.active ? "nav-item active" : "nav-item" }>
            <a href={ nav.url } className="nav-link">
              <span className="menu-icon"><nav.icon className="icon-sm" /></span>
              <span className="menu-text">{ nav.description }</span>
            </a>
          </li>
        )
      }

      default: return ( <li key={ index } /> )
    }
  });

  return (
    <ul className="nav-sidebar">
      { li }
    </ul>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  sidebarLab: state.sidebarLab,
  navToggle: state.appConfig.navToggleLab,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ navToggleLab }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarLab);
