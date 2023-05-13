/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ButtonSave from '../../components/ButtonSave';
import ButtonNewObject from '../../components/ButtonNewObject';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import ModalAddBlockInZone from './components/ModalAddBlockInZone';
import ModalRemoveBlockInZone from './components/ModalRemoveBlockInZone';
import ModalChangeQuarteiraoInZone from './components/ModalChangeQuarteiraoInZone'
import { FaBorderAll } from 'react-icons/fa';
import ButtonClose from '../../components/ButtonClose';
import ButtonMore from '../../components/ButtonMore';
import { Lista, ListaItem, ListaIcon } from '../../components/Listas';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { updateZoneRequest, getZoneByIdRequest, clearUpdate, getZoneByCityRequest } from '../../store/Zona/zonaActions';
import { getQuarteiroesMunicipioSemZonaRequest, setQuarteirao } from '../../store/Quarteirao/quarteiraoActions'
import { getLocationByCityRequest } from '../../store/Localidade/localidadeActions';
import { showNotifyToast } from "../../store/AppConfig/appConfigActions";

// STYLES
import { FormGroup, selectDefault } from '../../styles/global';
import { ContainerFixed, PageHeader, PageIcon } from '../../styles/util';

// VALIDATIONS FUNCTIONS
import {isBlank} from '../../config/function';

function EditarZona({ zona, quarteiroes_zona, getZoneByIdRequest, municipio_id, ...props }) {
  const [ id ]                                                                = useState(props.match.params.id);
  const [ nome, setNome ]                                                     = useState( "" );
  const [ isValidNome, setIsValidNome ]                                       = useState( true );
  const [ ativo, setAtivo ]                                                   = useState({});
  const [ optionAtivo ]                                                       = useState([ { value: 1, label: 'Sim' }, { value: 0, label: 'Não' } ]);
  const [ flLoading, setFlLoading ]                                           = useState( false );
  const [ showModalQuarteirao, setShowModalQuarteirao]                        = useState(false)
  const [ showModalRemoverQuarteirao, setShowModalRemoverQuarteirao]          = useState(false)
  const [ showModalAlteraZonaQuarteierao, setShowModalAlteraZonaQuarteierao]  = useState(false)
  const [ quarteirao, setQuarteirao]                                          = useState({})

  useEffect(() => {
    props.changeSidebar(4, 0);
    getZoneByIdRequest( id );
    props.getLocationByCityRequest( municipio_id );
    props.getQuarteiroesMunicipioSemZonaRequest( municipio_id );
    props.getZoneByCityRequest(municipio_id, 'sim')
  }, []);

  useEffect(() => {
    if( Object.entries( zona ).length > 0 ) {
      setAtivo( { value: zona.ativo, label: zona.ativo ? 'Sim' : 'Não' } );
      setNome(zona.nome)
    }
  }, [ zona ]);

  useEffect( () => {
    setFlLoading( false );
    if( props.updateZone)
      getZoneByIdRequest( id );
    
    props.clearUpdate();
  }, [ props.updateZone ] );

  function handleSubmit( e ) {
    e.preventDefault();
    if(isBlank(nome))
      setIsValidNome(false)
    else{
      setIsValidNome(true)
      setFlLoading(true);
      props.updateZoneRequest( id, {
        nome: nome
      });
    }
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><ViewCompactIcon /></PageIcon>
          Editar Zona
        </h3>
      </PageHeader>
      <section className="card-list">
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <div className="card">
              <h4 className="title">Zona: <mark className="bg-info text-white" >{ zona.nome }</mark></h4>
              <p className="text-description">
                Atenção os campos com <code>*</code> são obrigatórios
              </p>
              <Row>
                <Col sm='6'>
                  <form onSubmit={ handleSubmit } >
                    <Row>
                      <Col>
                        <FormGroup>
                          <label htmlFor="up_nome">Nome <code>*</code></label>
                          <input 
                            id="up_nome" 
                            value={nome} 
                            className="form-control" 
                            onChange={ (e) => setNome(e.target.value) } 
                            required />
                            {
                              !isValidNome ?
                                <span class="form-label-invalid">Nome inválido</span> :
                                ''
                            }
                        </FormGroup>
                      </Col>
                    </Row>
                    <ContainerFixed>
                      <ButtonSave
                        title="Salvar"
                        className="bg-info text-white"
                        loading={ flLoading }
                        disabled={ flLoading }
                        type="submit" />
                    </ContainerFixed>
                  </form>
                </Col>

                <Col sm="6">
                  <h4 className="title">
                    Quarteirões
                    <ButtonNewObject
                      title="Adicionar novo quarteirão na zona"
                      onClick={ () => setShowModalQuarteirao(true)}
                    />
                  </h4>
                  <Lista>
                    {quarteiroes_zona.map((q, index) => {
                      const bg = q.id ? "" : "bg-success"
                      return (
                        <ListaItem
                          key={`lado-${q.id}`}
                          className={bg +" pt-0 pb-0 justify-content-between"}
                        >
                          <div>
                            <ListaIcon className="mr-2">
                              <FaBorderAll />
                            </ListaIcon>
                            <span className="mr-2">
                              Nº {q.numero} - LOC: { q.localidade.nome }
                            </span>
                          </div>
                          <div>
                            <ButtonClose
                              title="Excluir quarteirao da zona"
                              onClick={() => {
                                setQuarteirao(q)
                                setShowModalRemoverQuarteirao(true)}
                              }
                              className="ml-2 text-danger"
                            />
                            <ButtonMore
                              title="Editar zona do quarteirao"
                              onClick={ () => {
                                setQuarteirao(q)
                                setShowModalAlteraZonaQuarteierao(true)
                              } }
                            />
                          </div>
                        </ListaItem>
                    )})}
                  </Lista>
                </Col>
              </Row>
            </div>
          </article>
        </div>
        <ModalAddBlockInZone
          acao={"add"}
          zona_id={zona.id}
          show={showModalQuarteirao}
          handleClose={() => setShowModalQuarteirao(false)}
          quarteiroes={props.quarteiroes}
          localidades={props.localidades}
        />
        <ModalRemoveBlockInZone
          quarteirao={quarteirao}
          show={showModalRemoverQuarteirao}
          handleClose={() => setShowModalRemoverQuarteirao(false)}
        />
        <ModalChangeQuarteiraoInZone
          quarteirao={quarteirao}
          show={showModalAlteraZonaQuarteierao}
          handleClose={() => setShowModalAlteraZonaQuarteierao(false)}
        />
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  municipio_id: state.appConfig.usuario.municipio.id,
  zona: state.zona.zona,
  quarteiroes_zona: state.zona.quarteiroes_zona,
  localidades: state.localidade.localidades,
  updateZone: state.zona.updated,
  quarteiroes: state.quarteirao.quarteiroes,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    updateZoneRequest,
    getZoneByIdRequest,
    getZoneByCityRequest,
    clearUpdate,
    getQuarteiroesMunicipioSemZonaRequest,
    getLocationByCityRequest,
    showNotifyToast
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarZona);
