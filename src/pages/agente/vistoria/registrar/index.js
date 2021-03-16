import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaClipboardCheck } from 'react-icons/fa';
import PNCD from '../components/nw_PNCD';
import LIRAa from '../components/nw_LIRAa';
import StepByStep from '../../../../components/StepByStep';
import SelecionarImovel from '../components/SelecionarImovel';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebarAgente';

// STYLES
import { PageIcon, PageHeader } from '../../../../styles/util';

function RegistrarVistoria({ trabalhoDiario, ...props }) {
  const [ steps ] = useState([
    { name: 'Selecionar Imóvel', slug: 'selecionar_imovel', content: <SelecionarImovel /> },
    { name: 'Alterar Imóvel', slug: 'alterar_imovel', content: <div>Content Alterar Imóvel</div> },
    { name: 'Dados da Vistoria', slug: 'vistoria', content: <div>Content Vistoria</div> },
    { name: 'Inspeção', slug: 'inspecao', content: <div>Content Inspeção</div> },
  ]);

  useEffect(() => {
    props.changeSidebar(2, 1);
  }, []);

  function getForm() {
    const metodologia = trabalhoDiario.atividade.metodologia.sigla,
          objetivo    = trabalhoDiario.atividade.objetivo.sigla;

    switch(metodologia) {
      case 'PNCD':
        return <PNCD objetivo={objetivo} />

      default: // LIRAa
      return <LIRAa objetivo={objetivo} />
    }
  }

  return (
    <div>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaClipboardCheck /></PageIcon>
          Vistoria de Campo
        </h3>
      </PageHeader>

      <section className="card-list">
        <Row>
          <Col md="12">
            <article>
              <div className="card p-0">
                <StepByStep init_step={ 0 } steps={ steps } />
              </div>
            </article>
            {/* <div className="card">
              { getForm() }
            </div> */}
          </Col>
        </Row>
      </section>
    </div>
  );
}

const mapStateToProps = state => ({
  trabalhoDiario: state.rotaCache.trabalhoDiario,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrarVistoria);
