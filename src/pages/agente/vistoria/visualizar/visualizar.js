import React, { useEffect, useState } from 'react';
import { FaClipboardCheck } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import PNCD from '../components/PNCD';
import ProcurarImovel from '../components/ProcurarImovel';
import InspecionarRecipiente from '../components/InspecionarRecipiente';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebarAgente';

// STYLES
import { PageIcon, PageHeader } from '../../../../styles/util';
import { Container } from './styles';

function VisualizarVistoria({ ...props }) {
  const [ indexVistoria, setIndexVistoria ] = useState( 0 );
  useEffect(() => {
    setIndexVistoria( props.match.params.index );
    props.changeSidebar(2, 1);
  }, []);


  function getForm() {
    switch ('PNCD') {
      case 'PNCD':
        return <PNCD objetivo="LI+T" />

      default:
        return <div />
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
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizarVistoria);
