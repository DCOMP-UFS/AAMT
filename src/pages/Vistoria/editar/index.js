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

function CadastrarVistoria({ trabalhoDiario, rota, vistoriasCache, ...props }) {
  useEffect(() => {
    props.changeSidebar( "vistoria" );
    props.setVistoriaIndexEdit(props.match.params.index)
  }, []);

  //A parametro index que recebemos na url indica o index da vistoria em relação a lista vistoriaFiltradas
  //A função abaixo encontra o index da vistoria em relação a lista vistoriasCache
  function findIndexCache(){
    const indexURL = props.match.params.index
    var indexFiltrado = 0

    for(var indexCache = 0 ; indexCache <  vistoriasCache.length; indexCache++){
      if(vistoriasCache[indexCache].trabalhoDiario_id == trabalhoDiario.id){ 
        if(indexFiltrado == indexURL) 
          return indexCache

        indexFiltrado++
      }
    }
    //Nunca deveria chegar aqui
    return null
  }

  function getForm() {
     //Coletar da vistoriasCache somente as vistorias do trabalho diario atual
    let vistoriasFiltradas = vistoriasCache.filter((vistoria) => vistoria.trabalhoDiario_id == trabalhoDiario.id)

    //Index da vistoria selecionada em relação à lista vistoriasCache
    let indexCache = findIndexCache()

    switch ( trabalhoDiario.atividade.metodologia.sigla ) {
      case 'PNCD':
        return (
          <PNCD
            objetivo="LI+T"
            vistoria={ vistoriasCache[ indexCache ] }
            indexInspection={ indexCache } />
        )

      default: // LIRAa
        return (
          <LIRAa
            objetivo="LI"
            vistoria={ vistoriasCache[ indexCache ] }
            indexInspection={ indexCache } />
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
  vistoriasCache: state.vistoriaCache.vistorias
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
