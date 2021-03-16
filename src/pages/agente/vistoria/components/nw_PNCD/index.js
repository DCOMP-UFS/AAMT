import React, { useState, useEffect } from 'react';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function PNCD({ ...props }) {
  return <div>PNCD</div>;
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PNCD);
