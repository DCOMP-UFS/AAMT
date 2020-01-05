import React, { Component } from 'react';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// COMPONENTS
// import { Container } from './styles';

class HomeLaboratorio extends Component {
  render() {
    return <h1>Lab</h1>;
  }
}

const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(HomeLaboratorio);
