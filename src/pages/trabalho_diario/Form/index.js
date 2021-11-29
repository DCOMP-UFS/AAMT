import React, { Component } from 'react';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';

// COMPONENTS
import { CardBody } from '../../../styles/global';
import PNCD from '../../../components/formVistoria/PNCD';

class Form extends Component {
  constructor(props){
    super(props);

    this.props.changeSidebar(1, 2);
  }

  render() {
    return (
      <section className="card-list">
        <div className="row">
          <CardBody className="col-12">
            <div className="c-container">
              <div className="c-body">
                <PNCD />
              </div>
            </div>
          </CardBody>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
