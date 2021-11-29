import React, { useEffect } from 'react';
import { IoIosMenu, IoIosSearch } from 'react-icons/io';
import { FaRegEnvelope, FaRegBell, FaSignOutAlt } from 'react-icons/fa';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';
import { IoIosArrowDown } from 'react-icons/io';

// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// ACTIONS
import { navToggle, signOut } from '../../store/AppConfig/appConfigActions';

// STYLES
import './style.css';
import { UserName, buttonMenu, avatarSmall } from './styles';
import { Color } from '../../styles/global';

const PerfilMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    minWidth: '180px'
  },
})((props) => (
  <Menu
    elevation={ 0 }
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const PerfilItem = withStyles((theme) => ({
  root: {
    '&.active': {
      backgroundColor: `${ Color.info }!important`,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
    '&:hover': {
      backgroundColor: `${ Color.info }!important`,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function Header({ usuario, ...props }) {
  const [ anchorEl, setAnchorEl ] = React.useState( null );

  useEffect(() => {
    if( !usuario.atuacoes[0].tipoPerfil ){
      window.location = window.location.origin.toString();
    }
  }, [ usuario ]);

  const handleClick = ( event ) => {
    setAnchorEl( event.currentTarget );
  };

  const handleClose = () => {
    setAnchorEl( null );
  };

  const handleSignOut = () => {
    props.signOut();
  };

  return (
    <nav className="header fixed-top">
      <div className="header-logo">
        <a href="localhost:3000/" className="text-white brand font-weight-bold">
          <mark className="rounded text-white bg-info p-1">AaMT</mark>
        </a>
      </div>

      <div className="header-body">
        <div className="container-search">
          <button className="toggler toggle-collapse" onClick={ props.navToggle } >
            <IoIosMenu />
          </button>

          <form className="h-100">
            <div className="search-field">
              <div className="content-prepend"><IoIosSearch className="icon-search" /></div>
              <input type="text" className="border-0 bg-transparent" placeholder="Procurar consulta" />
            </div>
          </form>
        </div>

        <div>
          <ul className="navbar list-header" ref={ props.container }>
            <li>
              <Button
                aria-controls="perfil-menu"
                aria-haspopup="true"
                variant="contained"
                className="nav-link"
                style={ buttonMenu }
                onClick={ handleClick }
              >
                <Avatar style={ avatarSmall } >{ usuario.nome[0] }</Avatar>
                <UserName>{ usuario.nome }</UserName>
                <IoIosArrowDown className="menu-arrow ml-2" />
              </Button>
              <PerfilMenu
                id="perfil-menu"
                anchorEl={ anchorEl }
                keepMounted
                open={ Boolean( anchorEl ) }
                onClose={ handleClose }
              >
                {/* <PerfilItem className="active">
                  <ListItemIcon>
                    <SendIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Sent mail" />
                </PerfilItem>
                <PerfilItem>
                  <ListItemIcon>
                    <DraftsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </PerfilItem> */}
                <PerfilItem
                  onClick={ handleSignOut }
                >
                  <ListItemIcon>
                    <FaSignOutAlt fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Sair" />
                </PerfilItem>
              </PerfilMenu>
            </li>
            <li>
              <button className="nav-link"><FaRegEnvelope className="icon-sm"/></button>
            </li>
            <li className="navbar-item dropdown">
              <button className="nav-link"><FaRegBell className="icon-sm"/></button>
            </li>

            <li className="navbar-item dropdown">
              <button className="toggler toggle-sidebar-left" onClick={ props.navToggle } >
                <IoIosMenu />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = state => ({
  usuario: state.appConfig.usuario
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ navToggle, signOut }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
