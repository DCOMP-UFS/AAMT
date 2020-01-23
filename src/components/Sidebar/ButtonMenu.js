import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { IoIosMenu } from 'react-icons/io';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { navToggleLab } from '../../store/actions/appConfig';

import { ContainerButtonMenu } from './styles';

const ButtonMenu = props => (
  <ContainerButtonMenu>
    <Tooltip
      title="Menu"
      className="bg-white"
      onClick={ props.navToggleLab } >
      <IconButton aria-label="more" className="text-muted">
        <IoIosMenu />
      </IconButton>
    </Tooltip>
  </ContainerButtonMenu>
)

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ navToggleLab }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonMenu);
