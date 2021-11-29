import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import CardAtividade from '../../../components/CardAtividade';
import ModalIniciarTrabalho from '../../../pages/agente/components/ModalIniciarTrabalho';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';

import './style.css';

class Iniciar extends Component {
  constructor(props){
    super(props);

    this.props.changeSidebar(1, 1);
  }

  render() {
    const atividades = this.props.atividades;

    return (
      <section className="card-list">
        <div className="row">
          {
            atividades.map(
              (atividade, index) =>
                <CardAtividade
                  key={ atividade.id }
                  atividade={ atividade }
                  indexAtividade={ index } />
            )
          }

          <ModalIniciarTrabalho />
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  atividades: state.atividade.atividades
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Iniciar);
