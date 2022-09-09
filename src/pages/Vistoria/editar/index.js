import React, { useEffect } from 'react';
import { FaClipboardCheck } from 'react-icons/fa';
import { Row } from 'react-bootstrap';
import PNCD from '../components/PNCD';
import LIRAa from '../components/LIRAa';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';
import { setVistoriaIndexEdit } from '../../../store/VistoriaCache/vistoriaCacheActions';

// STYLES
import { PageIcon, PageHeader } from '../../../styles/util';
import { Container } from './styles';

function CadastrarVistoria({ trabalhoDiario, rota, vistorias, ...props }) {
  useEffect(() => {
    props.changeSidebar( "vistoria" );
    props.setVistoriaIndexEdit(props.match.params.index)
  }, []);

  function getForm() {
    switch ( trabalhoDiario.atividade.metodologia.sigla ) {
      case 'PNCD':
        return (
          <PNCD
            objetivo="LI+T"
            vistoria={ vistorias[ props.match.params.index ] }
            indexInspection={ props.match.params.index } />
        )

      default: // LIRAa
        return (
          <LIRAa
            objetivo="LI"
            vistoria={ vistorias[ props.match.params.index ] }
            indexInspection={ props.match.params.index } />
        )
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
  vistorias: state.vistoriaCache.vistorias
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    setVistoriaIndexEdit,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CadastrarVistoria);
