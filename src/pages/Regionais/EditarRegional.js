/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ButtonSave from '../../components/ButtonSave';
import { FaCity } from 'react-icons/fa';
import $ from 'jquery';
import SelectWrap from '../../components/SelectWrap'
import ButtonMore from '../../components/ButtonMore';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import {
  getActualCityFromRegionalHealthRequest,
  getOldCityFromRegionalHealthRequest,
} from '../../store/Municipio/municipioActions';

import { 
  getRegionalHealthByStateRequest, 
  getRegionalHealthByIdRequest,
  updateRegionalHealthRequest,
  updateRegionalHealthReset
} from '../../store/RegionalSaude/regionalSaudeActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';

// STYLES
import { FormGroup, selectDefault } from '../../styles/global';
import {
  ContainerFixed,
  PageIcon,
  PageHeader,
  UlIcon,
  LiIcon,
  LiEmpty,
  ContainerIcon,
  DivDescription,
  ContainerUl
} from '../../styles/util';

// VALIDATIONS FUNCTIONS
import {isBlank,onlyLetters} from '../../config/function';
import ModalTransferirMunicipio from './components/ModalTransferirMunicipio';
import ModalRevincularMunicipio from './components/ModalRevincularMunicipio';

const EditarRegional = ( { estado_id, regionalSaude, regionais, ...props } ) => {
  const [ id ]                                          = useState( props.match.params.id );
  const [ nome, setNome ]                               = useState( "" );
  const [ isValidNome, setIsValidNome ]                 = useState( true );
  const [ endereco, setEndereco ]                       = useState( "" );
  const [ isValidEndereco, setIsValidEndereco ]         = useState( true );
  const [ ativo, setAtivo ]                             = useState( {} );
  const [ flLoading, setFlLoading ]                     = useState( false );
  const [ municipio, setMunicipio ]                     = useState( {} )

  const [ showModalTransferirMunicipio, setShowModalTransferirMunicipio] = useState( false );
  const [ showModalRevincularMunicipio, setShowModalRevincularMunicipio] = useState( false );

  const optionAtivo = [ { value: 1, label: 'Sim' }, { value: 0, label: 'Não' } ];

  useEffect( () => {
    props.changeSidebar( "regional" );
    if( parseInt(id) != NaN ){
      props.getRegionalHealthByIdRequest( parseInt(id) )
      props.getActualCityFromRegionalHealthRequest( parseInt(id) );
      props.getOldCityFromRegionalHealthRequest( parseInt(id) );
      props.getRegionalHealthByStateRequest( estado_id, true )
    }
  }, [] );

  useEffect( () => {
    if( Object.entries( regionalSaude ).length > 0 ) {
      setEndereco( regionalSaude.endereco );
      setNome( regionalSaude.nome );
      setAtivo( { value: regionalSaude.ativo, label: regionalSaude.ativo ? 'Sim' : 'Não' } );
    }
  }, [ regionalSaude ] );

  useEffect( () => {
    if( props.updated ) {
      props.showNotifyToast( "Regional atualizada com sucesso", "success" )
      setFlLoading(false)
      props.updateRegionalHealthReset();
      setTimeout(() => { 
        document.location.reload( true );
      }, 1500)
    }
    setFlLoading( false );
    props.updateRegionalHealthReset();
  }, [ props.updated ] );


  function handleSubmit( e ) {
    e.preventDefault();
    let isValid = true

    if(isBlank(nome)){
      setIsValidNome(false)
      isValid = false
    }
    else
      setIsValidNome(true)

    if(isBlank(endereco)){
      setIsValidEndereco(false)
      isValid = false
    }
    else
      setIsValidEndereco(true)

    if(isValid){
      setFlLoading( true );
      props.updateRegionalHealthRequest( id, {
        nome,
        endereco,
        ativo: ativo.value
      } );
    }
    
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaCity /></PageIcon>
          Editar Regional de Saúde
        </h3>
      </PageHeader>
      <section className="card-list">
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <div className="card">
              <h4 className="title">{ regionalSaude.nome }</h4>
              <p className="text-description">
                Atenção!!! Os campos com <code>*</code> são obrigatórios
              </p>
              <p className="text-description">
                Munícipios em vermelho estão inativos
              </p>
              <Row>
                <Col sm='4'>
                  <form onSubmit={ handleSubmit }>
                  <h4 className="title">Informações da regional</h4>
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
                          <label htmlFor="up_endereco">Endereco <code>*</code></label>
                          <input 
                            id="up_endereco" 
                            value={endereco} 
                            className="form-control" 
                            onChange={ (e) => setEndereco(e.target.value) } 
                            required />
                            {
                              !isValidEndereco ?
                                <span class="form-label-invalid">Endereço inválido</span> :
                                ''
                            }
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm='6'>
                        <FormGroup>
                          <label htmlFor="up_ativo">Ativo <code>*</code></label>
                          <SelectWrap
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
                        type="submit"
                      />
                    </ContainerFixed>
                  </form>
                </Col>
                <Col sm='4'>
                  <h4 className="title">Municípios vinculados</h4>

                  <ListCities
                    municipios={ props.municipioAtuais }
                    showToast = { () => {
                      props.showNotifyToast( "Esté municipio está inativo e não pode ser transferido para outra regional: ", "warning" ) 
                    } }
                    showModal= { () => { setShowModalTransferirMunicipio(true) } }
                    setMunicipio={ (municipio) => setMunicipio(municipio) }
                  />
                </Col>
                <Col sm='4'>
                  <h4 className="title">Municípios antigos</h4>

                  <ListCities
                    municipios={ props.municipiosAntigos }
                    showToast = { () => {
                      props.showNotifyToast( "Esté municipio está inativo e não pode ser transferido para outra regional ", "warning" ) 
                    } }
                    showAlternativeToast = { () => {
                      props.showNotifyToast( "Regional inativa não pode receber novo municipio ", "warning" ) 
                    } }
                    showModal= { () => { $('#modal-revincular-municipio').modal('show') } }
                    setMunicipio={ (municipio) => setMunicipio(municipio) }
                    regional_ativo={ ativo.value }
                    revincularMunicipio={ true }
                  />
                </Col>
                
              </Row>
            </div>
          </article>
        </div>
        <ModalTransferirMunicipio
          show={ showModalTransferirMunicipio }
          handleClose={ () => setShowModalTransferirMunicipio(false) }
          regionais={ regionais.filter( reg => reg.id != parseInt(id)) }
          municipio={municipio}
        />
        <ModalRevincularMunicipio
          municipio={municipio}
          regional_id={parseInt(id)}
        />
      </section>
    </>
  );
}

function ListCities( props ) {
  let li = props.municipios.map(( municipio, index ) =>
    <LiIcon
      key={ index }
      style={ municipio.ativo ? {} : {backgroundColor:"#fc3503"}}
    >
      <ContainerUl>
        <ContainerIcon className="ContainerIcon" style={ municipio.ativo ? {} : {backgroundColor:"black"}} >
          <FaCity />
        </ContainerIcon>
        <DivDescription>
          <div>
            {/* <mark className="mr-2 bg-info text-white">Cód.: { localidade.codigo }</mark> */}
            <span style={ municipio.ativo ? {} :{color:"white"} }>{ municipio.nome }</span>
          </div>
          <div>
            <ButtonMore

              title="Mudar regional do município"
              onClick={ () => { 
                if(!municipio.ativo)
                  props.showToast()
                else if(props.revincularMunicipio && !props.regional_ativo )
                  props.showAlternativeToast()
                else{
                  props.setMunicipio(municipio)
                  props.showModal()
                }
              } }
            />
          </div>
        </DivDescription>
      </ContainerUl>
    </LiIcon>
  );

  if( props.municipios.length === 0 ) {
    li = <LiEmpty>
      <h4>Nenhum município encontrado</h4>
    </LiEmpty>;
  }

  return (
    <UlIcon>
      { li }
    </UlIcon>
  )
}

const mapStateToProps = state => ({
  estado_id: state.appConfig.usuario.regionalSaude.estado.id,
  municipioAtuais: state.municipio.municipiosAtuaisRegional,
  municipiosAntigos: state.municipio.municipiosAntigosRegional,
  regionalSaude:  state.regionalSaude.regionalSaude,
  regionais: state.regionalSaude.regionaisSaude,
  updated: state.regionalSaude.updated,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getRegionalHealthByIdRequest,
    getActualCityFromRegionalHealthRequest,
    getOldCityFromRegionalHealthRequest,
    getRegionalHealthByStateRequest,
    updateRegionalHealthRequest,
    updateRegionalHealthReset,
    showNotifyToast,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarRegional);
