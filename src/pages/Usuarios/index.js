import React, { useEffect } from 'react';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/actions/sidebar';

function Usuarios( props ) {
  useEffect(() => {
    props.changeSidebar(4, 1);
  }, [props]);

  return (<div />);
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Usuarios);
