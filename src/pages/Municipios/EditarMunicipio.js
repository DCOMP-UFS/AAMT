/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ButtonSave from '../../components/ButtonSave';
import { FaCity } from 'react-icons/fa';
import { FaMapSigns } from 'react-icons/fa';
import SelectWrap from '../../components/SelectWrap'

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { 
  updateCityRequest, 
  getCityByIdRequest, 
  clearUpdateCity 
} from '../../store/Municipio/municipioActions';
import { getLocationByCityRequest } from '../../store/Localidade/localidadeActions';
import { getNationsRequest } from '../../store/Pais/paisActions';
import { GetRegionsByNationRequest } from '../../store/Regiao/regiaoActions';
import { GetStatesByRegionRequest } from '../../store/Estado/estadoActions';
import { getRegionalHealthByStateRequest } from '../../store/RegionalSaude/regionalSaudeActions';

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
import {onlyNumbers,isBlank,onlyLetters} from '../../config/function';

const EditarMunicipio = ( { municipio, localidades, ...props } ) => {
  const [ id ]                                          = useState( props.match.params.id );
  const [ codigo, setCodigo ]                           = useState( null );
  const [ nome, setNome ]                               = useState( "" );
  const [ isValidNome, setIsValidNome ]                 = useState( true );
  const [ ativo, setAtivo ]                             = useState( {} );
  const [ pais, setPais ]                               = useState( {} );
  const [ optionPais, setOptionPais ]                   = useState( [] );
  const [ regiao, setRegiao ]                           = useState( {} );
  const [ optionRegiao, setOptionRegiao ]               = useState( [] );
  const [ estado, setEstado ]                           = useState( {} );
  const [ optionEstado, setOptionEstado ]               = useState( [] );
  const [ regionalSaude, setRegionalSaude ]             = useState( {} );
  const [ optionRegionalSaude, setOptionRegionalSaude ] = useState( [] );
  const [ flLoading, setFlLoading ]                     = useState( false );

  const optionAtivo = [ { value: 1, label: 'Sim' }, { value: 0, label: 'Não' } ];

  useEffect( () => {
    props.changeSidebar( "municipio" );
    props.getCityByIdRequest( id );
    props.getLocationByCityRequest( id );
  }, [] );

  useEffect( () => {
    const options = props.paises.map( p => {
      if( p.id === municipio.pais_id )
        setPais( { value: p.id, label: p.nome } );

      return ( { value: p.id, label: p.nome } );
    } );

    setOptionPais( options );
  }, [ props.paises ] );

  useEffect( () => {
    if( Object.entries( pais ).length > 0 ) {
      props.GetRegionsByNationRequest( pais.value );
      setRegiao( {} );
      setEstado( {} );
      setOptionEstado( [] );
      setRegionalSaude( {} );
      setOptionRegionalSaude( [] );
    }
  }, [ pais ] );

  useEffect( () => {
    const options = props.regioes.map( r => {
      if( r.id === municipio.regiao_id )
        setRegiao( { value: r.id, label: r.nome } );

      return ( { value: r.id, label: r.nome } );
    } );

    setOptionRegiao( options );
  }, [ props.regioes ] );

  useEffect( () => {
    if( Object.entries( regiao ).length > 0 ) {
      props.GetStatesByRegionRequest( regiao.value );
      setEstado( {} );
      setRegionalSaude( {} );
      setOptionRegionalSaude( [] );
    }
  }, [ regiao ] );

  useEffect( () => {
    const options = props.estados.map( e => {
      if( e.id === municipio.estado_id )
        setEstado( { value: e.id, label: e.nome } );

      return ( { value: e.id, label: e.nome } );
    } );

    setOptionEstado( options );
  }, [ props.estados ]);

  useEffect( () => {
    if( Object.entries( estado ).length > 0 ) {
      props.getRegionalHealthByStateRequest( estado.value, true );
      setRegionalSaude( {} );
    }
  }, [ estado ] );

  useEffect( () => {

    let isRegionalMuncipioAtiva = false

    const options = props.regionaisSaude.map( r => {
      if( r.id === municipio.regional_saude_id ){
        isRegionalMuncipioAtiva = true
        setRegionalSaude( { value: r.id, label: r.nome } );
      }

      return ( { value: r.id, label: r.nome } );
    } );

    if(!isRegionalMuncipioAtiva){
      const regionalMuncipio = { 
        value: municipio.regional_saude_id, 
        label: municipio.regional_saude_nome+" (Inativo)"
      }
      options.unshift(regionalMuncipio)
      setRegionalSaude(regionalMuncipio);
    }

    setOptionRegionalSaude( options );
  }, [ props.regionaisSaude ] );

  useEffect( () => {
    if( Object.entries( municipio ).length > 0 ) {
      props.getNationsRequest();

      setCodigo( municipio.codigo );
      setNome( municipio.nome );
      setAtivo( { value: municipio.ativo, label: municipio.ativo ? 'Sim' : 'Não' } );
    }
  }, [ municipio ] );

  useEffect( () => {
    setFlLoading( false );
    props.clearUpdateCity();

    if(props.updatedCity){
      setTimeout(() => { 
        document.location.reload( true );
      }, 1500)
    }
  }, [ props.updatedCity ] );

  function handleSubmit( e ) {
    e.preventDefault();
    if(isBlank(nome))
      setIsValidNome(false)

    else{
      setFlLoading( true );
      props.updateCityRequest( id, {
        codigo,
        nome,
        regionalSaude_id: regionalSaude.value,
        ativo: ativo.value
      } );
    }
    
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaCity /></PageIcon>
          Editar Município
        </h3>
      </PageHeader>
      <section className="card-list">
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <div className="card">
              <h4 className="title">{ municipio.nome }</h4>
              <p className="text-description">
                Atenção os campos com <code>*</code> são obrigatórios
              </p>
              <Row>
                <Col sm='6'>
                  <form onSubmit={ handleSubmit }>
                  <h4 className="title">Informações do município</h4>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="pais">País <code>*</code></label>
                          <SelectWrap
                            id="pais"
                            value={ pais }
                            styles={ selectDefault }
                            options={ optionPais }
                            onChange={ e => setPais(e) }
                            isDisabled={!ativo.value}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="regiao">Região <code>*</code></label>
                          <SelectWrap
                            id="regiao"
                            value={ regiao }
                            styles={ selectDefault }
                            options={ optionRegiao }
                            onChange={ e => setRegiao(e) }
                            isDisabled={!ativo.value}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="estado">Estado <code>*</code></label>
                          <SelectWrap
                            id="estado"
                            value={ estado }
                            styles={ selectDefault }
                            options={ optionEstado }
                            onChange={ e => setEstado(e) }
                            isDisabled={!ativo.value}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="regionalSaude">Regional de saúde <code>*</code></label>
                          <SelectWrap
                            id="regionalSaude"
                            value={ regionalSaude }
                            styles={ selectDefault }
                            options={ optionRegionalSaude }
                            onChange={ e => setRegionalSaude(e) }
                            isDisabled={!ativo.value}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm='6'>
                        <FormGroup>
                          <label htmlFor="up_codigo">Código <code>*</code></label>
                          <input 
                            id="up_codigo" 
                            value={codigo ? codigo : ""} 
                            className="form-control" 
                            onChange={ (e) => (onlyNumbers(e.target.value) ? setCodigo(e.target.value) : () => {} )} 
                            required />
                        </FormGroup>
                      </Col>
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

                <Col sm='6'>
                  <h4 className="title">Bairro(s)/Localidade(s)</h4>

                  <ListLocation
                    localidades={ localidades }
                  />
                </Col>
              </Row>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function ListLocation( props ) {
  let li = props.localidades.map(( localidade, index ) =>
    <LiIcon
      key={ index }
    >
      <ContainerUl onClick={ () => console.log( "Em desenvolvimento" ) }>
        <ContainerIcon className="ContainerIcon" >
          <FaMapSigns />
        </ContainerIcon>
        <DivDescription>
          <div>
            <mark className="mr-2 bg-info text-white">Cód.: { localidade.codigo }</mark>
            <span>{ localidade.nome }</span>
          </div>
        </DivDescription>
      </ContainerUl>
    </LiIcon>
  );

  if( props.localidades.length === 0 ) {
    li = <LiEmpty>
      <h4>Nenhuma localidade cadastrada</h4>
    </LiEmpty>;
  }

  return (
    <UlIcon>
      { li }
    </UlIcon>
  )
}

const mapStateToProps = state => ({
  municipio: state.municipio.municipio,
  paises: state.pais.paises,
  regioes: state.regiao.regioes,
  estados: state.estado.estados,
  regionaisSaude: state.regionalSaude.regionaisSaude,
  updatedCity: state.municipio.updatedCity,
  localidades: state.localidade.localidades
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    updateCityRequest,
    getCityByIdRequest,
    getNationsRequest,
    GetRegionsByNationRequest,
    GetStatesByRegionRequest,
    getRegionalHealthByStateRequest,
    clearUpdateCity,
    getLocationByCityRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarMunicipio);
