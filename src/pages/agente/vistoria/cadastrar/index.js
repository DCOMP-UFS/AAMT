import React, { useEffect, useState } from 'react';
import { FaClipboardCheck } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import PNCD from '../components/PNCD';
import LIRAa from '../components/LIRAa';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebarAgente';

// STYLES
import { PageIcon, PageHeader, ContainerFixed } from '../../../../styles/util';
import { Container } from './styles';

function CadastrarVistoria({ trabalhoDiario, rota, ...props }) {
  const [ indexVistoria, setIndexVistoria ] = useState( 0 );
  useEffect(() => {
    setIndexVistoria( props.match.params.index );
    props.changeSidebar(2, 1);
  }, []);

  function getForm() {
    switch ( trabalhoDiario.atividade.metodologia.sigla ) {
      case 'PNCD':
        return <PNCD objetivo="LI+T" />

      default: // LIRAa
      return <LIRAa objetivo="LI" />
    }
  }

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaClipboardCheck /></PageIcon>
          Vistoria de Campo
        </h3>
      </PageHeader>

      <section className="card-list">
        <Row>
          <article className="col-md-12 stretch-card">
            <div className="card">
              { getForm() }
            </div>
          </article>
        </Row>
      </section>
    </Container>
  );
}

const mapStateToProps = state => ({
  trabalhoDiario: state.rotaCache.trabalhoDiario,
  rota: state.rotaCache.rota,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CadastrarVistoria);
