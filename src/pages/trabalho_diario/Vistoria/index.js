import React, { Component } from 'react';
import { CardBody, InfoGroup, Button } from '../../../styles/global';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';

// COMPONENTS
import { Header } from './styles';
import ButtonMore from '../../../components/ButtonMore';

// import { Wrapper, Title } from './styles';

class Vistoria extends Component {
  constructor(props) {
    super(props);

    this.props.changeSidebar(1, 2);
  }

  clickVistoria = (idTrabalhoDiario) => {
    window.location.href = window.location.origin.toString() + "/trabalho_diario/vistoria/lista";
  };

  render() {
    return (
      <section className="card-list">
        <div className="row">
          <CardBody className="col-md-4">
            <div className="c-container">

              <div className="c-header">
                <Header>
                  <h4 className="title">
                    <mark className="bg-primary text-white">1</mark> Atividade
                  </h4>

                  <ButtonMore
                    title="Finalizar trabalhos" />
                </Header>
                <p className="text-description">PNCD</p>
              </div>

              <div className="c-body">
                <InfoGroup>
                  <label>Iniciado em: </label>
                  <p>05/12/2019 às 08:00:00</p>
                </InfoGroup>

                <InfoGroup>
                  <label>Vistorias realizadas: </label>
                  <p>10</p>
                </InfoGroup>
              </div>

              <div className="c-footer text-center">
                <Button
                  type="button"
                  className="success"
                  onClick={ () => {this.clickVistoria(1)} }>Vistoria</Button>
              </div>
            </div>
          </CardBody>

          <CardBody className="col-md-4">
            <div className="c-container">

              <div className="c-header">
                <Header>
                  <h4 className="title">
                    <mark className="bg-primary text-white">2</mark> Atividade
                  </h4>

                  <ButtonMore
                    title="Finalizar trabalhos" />
                </Header>
                <p className="text-description">PNCD</p>
              </div>

              <div className="c-body">
                <InfoGroup>
                  <label>Iniciado em: </label>
                  <p>05/12/2019 às 08:00:00</p>
                </InfoGroup>

                <InfoGroup>
                  <label>Vistorias realizadas: </label>
                  <p>0</p>
                </InfoGroup>
              </div>

              <div className="c-footer text-center">
                <Button
                  type="button"
                  className="success"
                  onClick={ () => {this.clickVistoria(2)} }>Vistoria</Button>
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
)(Vistoria);

