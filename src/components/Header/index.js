import React, { Component, useState } from 'react';
import { IoIosMenu, IoIosSearch } from 'react-icons/io';
import { FaRegEnvelope, FaRegBell } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import { IoIosArrowDown } from 'react-icons/io';

// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// ACTIONS
import { navToggle } from '../../store/actions/appConfig';

import './style.css';
import { UserNav, UserName } from './styles';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <UserNav
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <IoIosArrowDown className="menu-arrow ml-2" />
  </UserNav>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            child =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

class Header extends Component{
  render () {
    return (
      <nav className="header fixed-top">
        <div className="header-logo">
          <a href="localhost:3000/" className="text-white brand font-weight-bold">
            <mark className="rounded text-white bg-info p-1">AAMT</mark>
          </a>
        </div>

        <div className="header-body">
          <div className="container-search">
            <button className="toggler toggle-collapse" onClick={ this.props.navToggle } >
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
            <ul className="navbar list-header" ref={this.container}>
              <li>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <Avatar>H</Avatar>
                    <UserName>{ this.props.usuario.nome }</UserName>
                  </Dropdown.Toggle>

                  {/* <Dropdown.Menu as={CustomMenu}> */}
                    {/* <Dropdown.Item>Sair</Dropdown.Item> */}
                    {/* <Dropdown.Item eventKey="3" active>
                      Orange
                    </Dropdown.Item> */}
                  {/* </Dropdown.Menu> */}
                </Dropdown>
              </li>
              <li>
                <button className="nav-link"><FaRegEnvelope className="icon-sm"/></button>
              </li>
              <li className="navbar-item dropdown">
                <button className="nav-link"><FaRegBell className="icon-sm"/></button>
              </li>

              <li className="navbar-item dropdown">
                <button className="toggler toggle-sidebar-left" onClick={ this.props.navToggle } >
                  <IoIosMenu />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  usuario: state.appConfig.usuario
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ navToggle }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
