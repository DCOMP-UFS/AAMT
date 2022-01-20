/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { tipoImovelEnum } from '../../../../config/enumerate';
import { FaChevronDown, FaChevronUp, FaMapMarkerAlt } from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';
import ReactMapGL, { Marker } from 'react-map-gl';

// Models
import { Imovel } from '../../../../config/models';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { setUpdated } from '../../../../store/Quarteirao/quarteiraoActions';
import { addImovelRequest, editarImovelRequest, clearCreate } from '../../../../store/Imovel/imovelActions';

// STYLES
import { ContainerArrow } from '../../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../../styles/global';

/**
 * Modal de adição de um imóvel
 * @param {String} acao cadastrar ou editar
 * @param {Model} imovel modelo de dados
 * @param {Boolean} show abrir ou fechar modal
 * @param {Function} handleClose função para fechar modal
 * @param {Array} lados lista de lados do quarteirão
 * @param {Object} props demais propriedades para funcionamento do componente
 * @returns 
 */
const ModalImovel = ( { acao, imovel, show, handleClose, lados, ...props } ) => {
  const [ numero, setNumero ]                     = useState( null );
  const [ sequencia, setSequencia ]               = useState( null );
  const [ responsavel, setResponsavel ]           = useState( "" );
  const [ complemento, setComplemento ]           = useState( "" );
  const [ tipoImovel, setTipoImovel ]             = useState( {} );
  const [ optionTipoImovel, setOptionTipoImovel ] = useState(
    tipoImovelEnum.map( tipo => {
      return { value: tipo.id, label: tipo.label }
    } )
  );
  const [ lado, setLado ]                         = useState( {} );
  const [ optionLado, setOptionLado ]             = useState( [] );
  const [ flLocValido, setFlLocValido ]           = useState( true );
  const [ localizacao, setLocalizacao ]           = useState( "" );
  const [ flOpen, setFlOpen ]                     = useState( false );
  const [ lng, setLng ]                           = useState( "" );
  const [ lat, setLat ]                           = useState( "" );
  const [ marcador, setMarcador ]                 = useState( {} );
  const [ viewport, setViewport ]                 = useState( {
    width: '100%',
    height: '300px',
    latitude: -15.7801,
    longitude: -47.9292,
    zoom: 2
  } );

  /**
   * Efeito acionado ao mudar o modelo de dados Imóvel do modal
   * Esse efeito modifica os dados do modal
   */
  useEffect( () => {
    if( acao == 'editar' ) {
      const l = lados.find( l => l.id == imovel.lado_id );
      setLado( {
        value: l.id,
        label: "Nº " + l.numero  + " - " + l.logradouro
      } );
      setNumero( imovel.numero );
      setSequencia( imovel.sequencia );
      setResponsavel( imovel.responsavel );
      setComplemento( imovel.complemento );

      const timovel = tipoImovelEnum.find( tipo => tipo.id == imovel.tipoImovel );

      if( timovel )
        setTipoImovel( { value: timovel.id, label: timovel.label } );

      onMarkerDrag( { lngLat: [ imovel.lng, imovel.lat ] } );
      setFlOpen( false );
    } else {
      setNumero( null );
      setSequencia( null );
      setResponsavel( "" );
      setComplemento( "" );
      setTipoImovel( {} );
      setOptionTipoImovel(
        tipoImovelEnum.map( tipo => {
          return { value: tipo.id, label: tipo.label }
        } )
      );
      setLado( {} );
      setOptionLado( [] );
      setFlLocValido( true );
      setLocalizacao( "" );
      setFlOpen( false );
      setLng( "" );
      setLat( "" );
      setMarcador( {} );
      setViewport( {
        width: '100%',
        height: '300px',
        latitude: -15.7801,
        longitude: -47.9292,
        zoom: 2
      } );
    }
  }, [ acao, imovel ]);

  /**
   * Assim que os lados do quarteirão é alterado, essa função atualiza
   * o select dos lados do modal
   */
  useEffect( () => {
    const options = lados.filter( l => l.id ? true : false ).map( l => ( {
      value: l.id,
      label: "Nº " + l.numero  + " - " + l.logradouro
    } ) );

    setOptionLado( options );
  }, [ lados ] );

  /**
   * Quando a variável created é alterada para true, significa que a requisição
   * ao back-end foi bem sucedidade e podemos fechar o modal
   */
  useEffect( () => {
    if( props.created ) {
      handleClose();
      setNumero( null );
      setSequencia( null );
      setResponsavel( "" );
      setComplemento( "" );
      setTipoImovel( {} );
      setLado( {} );
      props.clearCreate();
      props.setUpdated( null );
    }
  }, [ props.created ] );

  /**
   * Valida se a localização inserida é válida
   * 
   * @param {*} valor 
   * @param {*} campo 
   */
  const checkLocValida = ( valor, campo ) => {
    if( lng === "" || lat === "" )
      setFlLocValido( false );
    else
      setFlLocValido( true );

    if( campo === 'lng' )
      setLocalizacao( `{ ${ valor }, ${ lat } }` );
    else
      setLocalizacao( `{ ${ lng }, ${ valor } }` );
  }

  /**
   * Valida se o valor da localização
   * @param {*} valor 
   */
  const checkLocalizacao = valor => {
    if( valor[ 0 ] === '{' && valor[ valor.length - 1 ] === '}' ) {
      let coordenadas = valor;

      coordenadas = coordenadas.replace( '{', '' );
      coordenadas = coordenadas.replace( '}', '' );
      coordenadas = coordenadas.replace( ' ', '' );

      const lngLat = coordenadas.split( ',' );

      if( lngLat.length === 2 ) {
        if( parseInt( lngLat[ 0 ] ) && parseInt( lngLat[ 1 ] ) ) {
          setLng( parseInt( lngLat[ 0 ] ) );
          setLat( parseInt( lngLat[ 1 ] ) );
          setFlLocValido( true );
        } else {
          setFlLocValido( false );
        }
      } else {
        setFlLocValido( false );
      }
    }

    setLocalizacao( valor );
  }

  /**
   * Mudar posição do marcador ao clicar e arrastar no marcador
   * @param {*} params 
   */
  const onMarkerDrag = params => {
    setMarcador( {
      lng: params.lngLat[ 0 ],
      lat: params.lngLat[ 1 ]
    } );
    setLocalizacao( `{ ${ params.lngLat[ 0 ] }, ${ params.lngLat[ 1 ] } }` );
    setLng( params.lngLat[ 0 ] );
    setLat( params.lngLat[ 1 ] );
  }

  /**
   * Esta função chama a action para adicionar um imóvel ao quarteirão.
   * 
   * @param {object} e Elemento que acionou esaa função
   */
  function handleSubmit( e ) {
    e.preventDefault();
    const im = new Imovel( {
      id          : imovel.id,
      lado_id     : lado.value,
      numero      : numero,
      logradouro  : "",
      sequencia   : sequencia,
      responsavel : responsavel,
      complemento : complemento,
      tipoImovel  : tipoImovel.value,
      lat         : lat,
      lng         : lng,
    } );

    if( acao == 'cadastrar' ) {
      props.addImovelRequest( {
        numero,
        sequencia,
        responsavel,
        complemento,
        tipoImovel: tipoImovel.value,
        lado_id: lado.value,
        lng,
        lat
      } );
    } else {
      props.editarImovelRequest( im );
    }
  }

  return(
    <Modal show={ show } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>
          { acao == 'cadastrar' ? 'Cadastrar' : 'Editar' } Imóvel
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={ handleSubmit }>
        <Modal.Body>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="lado">Lado <code>*</code></label>
                <Select
                  id="lado"
                  value={ lado }
                  styles={ selectDefault }
                  options={ optionLado }
                  onChange={ e => setLado( e ) }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="numero">Nº Imóvel <code>*</code></label>
                <input
                  id="numero"
                  value={ numero ? numero : "" }
                  type="number"
                  className="form-control"
                  onChange={ e => setNumero( e.target.value ) }
                  min="1"
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="sequencia">Sequência</label>
                <input
                  id="sequencia"
                  value={ sequencia ? sequencia : "" }
                  type="number"
                  className="form-control"
                  onChange={ e => setSequencia( e.target.value ) }
                  min="1"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="responsavel">Responsável do imóvel</label>
                <input
                  id="responsavel"
                  value={ responsavel }
                  className="form-control"
                  onChange={ e => setResponsavel( e.target.value ) }
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="complemento">Complemento</label>
                <input
                  id="complemento"
                  value={ complemento }
                  className="form-control"
                  onChange={ e => setComplemento( e.target.value ) }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label>Tipo do imóvel <code>*</code></label>
                <Select
                    id="tipoImovel"
                    value={ tipoImovel }
                    styles={ selectDefault }
                    options={ optionTipoImovel }
                    onChange={ e => setTipoImovel( e ) }
                  />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="localizacao">Localização<code>*</code></label>
                <div className="form-collapse">
                  <div className={ `collapse-input ${ flLocValido ? '' : 'loc-invalida' }` }>
                    <div className="control">
                      <input
                        id="localizacao"
                        className="form-control"
                        value={ localizacao }
                        onChange={ e => checkLocalizacao( e.target.value ) }
                      />
                    </div>
                    <div className="toggle-control">
                      <span className="separator"></span>
                      <div className="toggle" onClick={ () => setFlOpen( !flOpen ) }>
                        {
                          flOpen ?
                            <FaChevronUp className="icon sm" /> :
                            <FaChevronDown className="icon sm" />
                        }
                      </div>
                    </div>
                  </div>

                  <Collapse in={ flOpen }>
                    <div className="collapse-body">
                      <FormGroup>
                        <label htmlFor="lng">Longitude<code>*</code></label>
                        <input
                          id="lng"
                          value={ lng }
                          type="number"
                          className="form-control"
                          onChange={ e => { 
                            setLng( e.target.value ); 
                            checkLocValida( e.target.value, "lng" ); 
                          } }
                        />
                      </FormGroup>
                      <FormGroup className="mb-0">
                        <label htmlFor="lat">Latitude<code>*</code></label>
                        <input
                          id="lat"
                          value={ lat }
                          type="number"
                          className="form-control"
                          onChange={ e => { 
                            setLat( e.target.value ); 
                            checkLocValida( e.target.value, "lat" ); 
                          } }
                        />
                      </FormGroup>
                    </div>
                  </Collapse>
                </div>
              </FormGroup>
              <ReactMapGL
                { ...viewport }
                onViewportChange={ nextViewport => setViewport( nextViewport ) }
                mapboxApiAccessToken={ process.env.REACT_APP_MAP_TOKEN }
                onClick={ onMarkerDrag }
              >
                {
                  Object.entries( marcador ).length > 0 ?
                  (
                    <Marker
                      latitude={ marcador.lat }
                      longitude={ marcador.lng }
                      offsetLeft={ -20 }
                      offsetTop={ -10 }
                      draggable
                      onDrag={ onMarkerDrag }
                    >
                      <FaMapMarkerAlt className="icon icon-md text-info" />
                    </Marker>
                  ) :
                  <div />
                }
              </ReactMapGL>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <ContainerArrow className="justify-content-end">
            <div>
              <Button type="button" className="secondary" onClick={ handleClose }>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </ContainerArrow>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

/**
 * Mapeia o estado global da aplicação a propriedade do componente
 * @param {Object} state estado global
 * @returns 
 */
const mapStateToProps = state => ( {
  created: state.imovel.created
} );

/**
 * Mapeia ações a propriedade do componente
 * @param {*} dispatch 
 * @returns 
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    clearCreate,
    addImovelRequest,
    editarImovelRequest,
    setUpdated,
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalImovel );
