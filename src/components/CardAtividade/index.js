import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// ACTIONS

// COMPONENTS
import ButtonMore from '../ButtonMore';
import { Header } from './styles';

// import { Container } from './styles';

class CardAtividade extends Component {
  openModal = () => {
    // this.props.toggleAtividadeAtiva(this.props.indexAtividade);
  };

  render() {
    const atividade = this.props.atividade;

    return (
      <article className="card-atividade col-md-6 stretch-card">
        <div className="card">
          <Header>
            <h4 className="title"><mark className="bg-primary text-white">{ atividade.id }</mark> Atividade</h4>

            <ButtonMore
              title="Iniciar Trabalho"
              data-toggle="modal"
              data-target="#modalTrabalhoDiario"
              onClick={ this.openModal } />
          </Header>

          <div className="info-group">
            <label>Objetivo</label>
            <p className="atividade-objetivo">{ atividade.objetivo }</p>
          </div>

          <div className="info-group">
            <label>Local</label>
            <p>{ atividade.local.sigla } - Simão Dias</p>
          </div>

          <div className="info-group">
            <label>Equipe</label>

            <ListEquipe equipe={ atividade.equipe } />
          </div>

          <div className="card-footer text-muted">
            { atividade.periodo.dataInicio }
          </div>
        </div>
      </article>
    );
  }
}

function ListEquipe(props) {
  const list = props.equipe.map( membro => (
    <li key={ membro.id } >
      <h5>{ membro.nome }</h5>
      <mark className="bg-primary text-white">{ membro.funcao }</mark>
    </li>
  ));

  return (
    <ul className="list-equipe">
      { list }
    </ul>
  );
}

const mapStateToProps = state => ({
  atividadeAtiva: state.atividade.atividadeAtiva
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardAtividade);
