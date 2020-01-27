import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeUserEditIndex } from '../../store/actions/UsuarioActions';

function ButtonEdit( props ) {
  const index = props.index;

  const handleClick = index => {
    props.changeUserEditIndex( index );
    $('#modal-update-usuario').modal('show');
  }

  return(
    <Tooltip
      className="bg-warning mt-2 mb-2"
      title="Editar"
      onClick={ () => { handleClick(index) } } >
      <IconButton aria-label="more">
        <Edit />
      </IconButton>
    </Tooltip>
  );
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeUserEditIndex }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonEdit);
