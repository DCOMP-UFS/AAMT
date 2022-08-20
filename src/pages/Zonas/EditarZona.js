/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ButtonSave from '../../components/ButtonSave';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { updateZoneRequest, getZoneByIdRequest, clearUpdate } from '../../store/Zona/zonaActions';

// STYLES
import { FormGroup, selectDefault } from '../../styles/global';
import { ContainerFixed, PageHeader, PageIcon } from '../../styles/util';

// VALIDATIONS FUNCTIONS
import {isBlank,onlyLetters} from '../../config/function';

function EditarZona({ zona, getZoneByIdRequest, municipio_id, ...props }) {
  const [ id ]                            = useState(props.match.params.id);
  const [ nome, setNome ]                 = useState( "" );
  const [ isValidNome, setIsValidNome ]   = useState( true );
  const [ ativo, setAtivo ]               = useState({});
  const [ optionAtivo ]                   = useState([ { value: 1, label: 'Sim' }, { value: 0, label: 'Não' } ]);
  const [ flLoading, setFlLoading ]       = useState( false );

  useEffect(() => {
    props.changeSidebar(4, 0);
    getZoneByIdRequest( id );
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
        ativo: ativo.value,
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
                    <h4 className="title">Informações da localidade</h4>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label htmlFor="up_nome">Nome <code>*</code></label>
                          <input 
                            id="up_nome" 
                            value={nome} 
                            className="form-control" 
                            onChange={ (e) => (onlyLetters(e.target.value) ? setNome(e.target.value) : () => {} )} 
                            required />
                            {
                              !isValidNome ?
                                <span class="form-label-invalid">Nome inválido</span> :
                                ''
                            }
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label htmlFor="categoria">Ativo</label>
                          <Select
                            id="ativo"
                            value={ ativo }
                            styles={ selectDefault }
                            options={ optionAtivo }
                            onChange={ e => setAtivo(e) }
                            required />
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

                <Col sm='6'>
                  <h4 className="title">Quarteirões</h4>
                </Col>
              </Row>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  municipio_id: state.appConfig.usuario.municipio.id,
  zona: state.zona.zona,
  localidades: state.localidade.localidades,
  updateZone: state.zona.updated,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    updateZoneRequest,
    getZoneByIdRequest,
    clearUpdate
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarZona);
