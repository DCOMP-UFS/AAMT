import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, ButtonInverse, CardBody } from '../../../styles/global';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebar';

//Importando CSS exclusivo para páginas do template
import './style.css';

class ViewButton extends Component {

  constructor(props) {
    super(props);

    this.props.changeSidebar(5, 0);
  }

  render() {
    return (
      <section className="card-list theme-button">
        <div className="row">

          {/* Botões de cor unica */}
          <CardBody className="col-md-12">
            <div className="c-container">

              <div className="c-header">
                <h4 className="title">Botões de cor única</h4>
                <p className="text-description">
                  Adicione a classe <code>.btn-&#123;color&#125;</code> para usar o botão do thema
                </p>
              </div>

              <div className="c-body demo-button">
                <Button className="mt-3 mr-3">Primary</Button>
                <Button className="secondary mt-3 mr-3">Secundary</Button>
                <Button className="success mt-3 mr-3">Success</Button>
                <Button className="danger mt-3 mr-3">danger</Button>
              </div>

            </div>
          </CardBody>

          {/* Botões Inversos */}
          <CardBody className="col-md-12">
            <div className="c-container">

              <div className="c-header">
                <h4 className="title">Botões Inversos</h4>
                <p className="text-description">
                  Adicione a classe <code>.btn-inverse-&#123;color&#125;</code> para inverter os botões
                </p>
              </div>

              <div className="c-body demo-button">
                <ButtonInverse className="danger mt-3 mr-3">Danger</ButtonInverse>
              </div>

            </div>
          </CardBody>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewButton);
