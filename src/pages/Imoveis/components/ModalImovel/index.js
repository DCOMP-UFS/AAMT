import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Modal, { ModalBody, ModalFooter } from '../../../../components/Modal';
import ButtonSaveModal from '../../../../components/ButtonSaveModal';
import { tipoImovelEnum } from '../../../../config/enumerate';
import { FaChevronDown, FaChevronUp, FaMapMarkerAlt } from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';
import ReactMapGL, { Marker } from 'react-map-gl';
import $ from 'jquery';

// ACTIONS
import { showNotifyToast } from '../../../../store/AppConfig/appConfigActions';
import { getQuarteiroesLocalidadeRequest, getLadosQuarteiraoRequest } from '../../../../store/Quarteirao/quarteiraoActions';
import { addImovelRequest, editarImovelRequest, clearCreate, clearUpdate } from '../../../../store/Imovel/imovelActions';
import { getLocationByCityRequest } from '../../../../store/Localidade/localidadeActions';

// STYLES
import { Button, FormGroup, selectDefault } from '../../../../styles/global';

// VALIDATIONS FUNCTIONS
import {onlyLetters} from '../../../../config/function';

export const ModalImovel = ({ lados, localidades, quarteiroes, usuario, imovel, isOpen, handleClose, ...props }) => {
  const [ imovel_id, setImovelId ]                = useState( null );
  const [ numero, setNumero ]                     = useState( null );
  const [ sequencia, setSequencia ]               = useState( null );
  const [ responsavel, setResponsavel ]           = useState( "" );
  const [ complemento, setComplemento ]           = useState( "" );
  const [ tipoImovel, setTipoImovel ]             = useState( {} );
  const [ optionTipoImovel ]                      = useState( tipoImovelEnum.map( tipo => ( { value: tipo.id, label: tipo.label } ) ) );
  const [ lado, setLado ]                         = useState( {} );
  const [ optionLado, setOptionLado ]             = useState( [] );
  const [ quarteirao, setQuarteirao ]             = useState( {} );
  const [ optionQuarteirao, setOptionQuarteirao ] = useState( [] );
  const [ localidade, setLocalidade ]             = useState( {} );
  const [ optionLocalidade, setOptionLocalidade ] = useState( [] );
  const [ loading, setLoading ]                   = useState( false );
  const [ clss, setClss ]                         = useState( [] );
  const [ reload, setReload ]                     = useState( false );
  const [ localizacao, setLocalizacao ]           = useState( "" );
  const [ fl_open, setFl_open ]                   = useState( false );
  const [ lng, setLng ]                           = useState( "" );
  const [ lat, setLat ]                           = useState( "" );
  const [ flLocValido, setFlLocValido ]           = useState( true );
  const [ viewport, setViewport ]                 = useState({
    width: '100%',
    height: '300px',
    latitude: -15.7801,
    longitude: -47.9292,
    zoom: 2
  });
  const [ marcador, setMarcador ]                 = useState( {} );
  const [ flRecoverInputs, setFlRecoverInputs ]   = useState( true );
  const [ flLoading, setFlLoading ]               = useState( false );
  const [ editJustOpened, setEditJustOpened ]       = useState( false );

  useEffect(() => {
    if(isOpen){
      if( Object.entries( imovel ).length > 0 ){
        limparCampos()
        setFlRecoverInputs(!flRecoverInputs)
      }
      else
        limparCampos()
    }
    handleClose()
  }, [isOpen]);

  useEffect(() => {
    props.getLocationByCityRequest( usuario.municipio.id );
  }, []);

  useEffect(() => {
    setOptionLocalidade( localidades.map( loc => ( { value: loc.id, label: loc.nome } ) ) );
  }, [ localidades ]);

  useEffect(() => {
    if( localidade.value ){
      
      //
      if(Object.entries( imovel ).length == 0 || editJustOpened == false){
        setOptionLado([])
        setLado({})
        setQuarteirao({})
      }
      setEditJustOpened(false)
      props.getQuarteiroesLocalidadeRequest( localidade.value, true );
    }
  }, [ localidade ]);

  useEffect(() => {
    setOptionQuarteirao( quarteiroes.map( q => 
      {
        if(q.sequencia == null){
          return  ( { value: q.id, label: q.numero } ) 
        }
        else
          return  ( { value: q.id, label: q.numero+" - SEQ: "+q.sequencia } ) 
      }
      
      ) );
  }, [ quarteiroes ]);

  //UseEffect acionado quando o modal é usado como edição de um imovel ja cadastrado
  //É aqui que são setados os dados do imovel nos campos.
  useEffect(() => {
    if( Object.entries( imovel ).length > 0 ) {
      const tipo = tipoImovelEnum.find( tipo => tipo.id === imovel.tipoImovel );

      //Evita que
      setEditJustOpened(true)

      setImovelId( imovel.id );
      setNumero( imovel.numero );
      setSequencia( imovel.sequencia );
      setResponsavel( imovel.responsavel );
      setComplemento( imovel.complemento );
      setTipoImovel( { value: tipo.id, label: tipo.label } );
      setLocalidade ( { value: imovel.localidade.id, label: imovel.localidade.nome } )
      setQuarteirao( 
        imovel.quarteirao.sequencia == null ? 
        { value: imovel.quarteirao.id, label: imovel.quarteirao.numero } :
        { value: imovel.quarteirao.id, label: imovel.quarteirao.numero+" - SEQ: "+imovel.quarteirao.sequencia }
      );
      setLado( { value: imovel.lado_id, label: "Nº "+imovel.lado_numero+" - "+imovel.logradouro  } );
      setLng( imovel.lng ? imovel.lng : "" );
      setLat( imovel.lat ? imovel.lat : "" );
      setLocalizacao( imovel.lng && imovel.lat ? `{ ${ imovel.lng }, ${ imovel.lat } }` : "" );
      setMarcador( imovel.lng && imovel.lat ? { lng: parseFloat( imovel.lng ), lat: parseFloat( imovel.lat ) } : {} );
    } else {
      limparCampos();
    }
  }, [ imovel, flRecoverInputs ]);

  /**
   * Esse effect analisa se o imóvel foi criado, se sim limpa os dados e fecha o
   * modal
   */
  useEffect( () => {

    setFlLoading(false)
    if( props.created ) {
      $( '#modal-imovel' ).modal( 'hide' );

      limparCampos();
      props.clearCreate();
    }
    else
      props.clearCreate();
  }, [ props.created ] );

  useEffect( () => {

    setFlLoading(false)
    if( props.updated ) {
      $( '#modal-imovel' ).modal( 'hide' );
      limparCampos();
      props.clearUpdate();
    }
    else
      props.clearUpdate();
  }, [ props.updated ] );

  /**
   * Toda vez que a variável quarteirao for alterada é consultado os lados
   * do quarteirão
   */
  useEffect(() => {
    if( quarteirao.value )
      props.getLadosQuarteiraoRequest( quarteirao.value );
  }, [ quarteirao ]);

  useEffect(() => {
    const options = lados.map( l => ( { value: l.id, label: "Nº "+l.numero+" - "+l.rua.nome } ) );
    setOptionLado( options );
  }, [ lados ]);

  /**
   * Esta função limpa os campos do modal de imóvel
   */
  const limparCampos = () => {
    setNumero( null );
    setOptionLado( [] )
    setLado( {} )
    setSequencia( null );
    setResponsavel( '' );
    setComplemento( '' );
    setTipoImovel( {} );
    setQuarteirao( {} );
    setOptionQuarteirao( [] )
    setLado( {} );
    setLng( "" );
    setLat( "" );
    setLocalizacao( "" );
    setMarcador( {} );
    setClss([]);
    setFlLocValido(true)
    setLocalidade({})
  }

  const limparClss = index => {
    let c = clss;

    c[ index ] = '';
    setClss( c );
    setReload( !reload );
  }

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

  const onMarkerDrag = params => {
    setMarcador({
      lng: params.lngLat[ 0 ],
      lat: params.lngLat[ 1 ]
    });
    setLocalizacao( `{ ${ params.lngLat[ 0 ] }, ${ params.lngLat[ 1 ] } }` );
    setLng( params.lngLat[ 0 ] );
    setLat( params.lngLat[ 1 ] );
  }

  const submit = e => {
    e.preventDefault();

    let fl_valido = true,
        c         = clss;

    if( !quarteirao.value ) {
      fl_valido = false;
      c         = clss;

      c[ 'quarteirao' ] = 'invalid';
      setClss( c );
    }

    if( !lado.value ) {
      fl_valido = false;
      c         = clss;

      c[ 'lado' ] = 'invalid';
      setClss( c );
    }

    if( !numero ) {
      fl_valido = false;
      c         = clss;

      c[ 'numero' ] = 'invalid';
      setClss( c );
    }

    if( !tipoImovel.value ) {
      fl_valido = false;
      c         = clss;

      c[ 'tipoImovel' ] = 'invalid';
      setClss( c );
    }

    if( !lng ) {
      fl_valido = false;
      c         = clss;

      c[ 'longitude' ] = 'invalid';
      setFlLocValido(false)
      setClss( c );
    }

    if( !lat ) {
      fl_valido = false;
      c         = clss;

      c[ 'latitulde' ] = 'invalid';
      setFlLocValido(false)
      setClss( c );
    }

    if( fl_valido ) {
      setFlLoading(true)

      if( Object.entries( imovel ).length > 0 ) { // Editar
        props.editarImovelRequest({
          id: imovel_id,
          numero,
          sequencia: sequencia == "" ? null : sequencia,
          responsavel,
          complemento,
          tipoImovel: tipoImovel.value,
          lado_id: lado.value,
          lng,
          lat
        });
      } else { // Adicionar
        props.addImovelRequest({
          numero,
          sequencia: sequencia == "" ? null : sequencia,
          responsavel,
          complemento,
          tipoImovel: tipoImovel.value,
          lado_id: lado.value,
          lng,
          lat
        });
      }
    } else {
      document.getElementById( 'modal-imovel' ).scrollTop = 0;

      props.showNotifyToast( "Existem campos inválidos", "error" );
      setReload( !reload );
    }
  };

  return (
    <Modal id="modal-imovel" title={ `Imóvel` }>
      <form onSubmit={ submit }>
        <ModalBody>
          <p className="text-description">
            Atenção! Os campos com <code>*</code> são obrigatórios
          </p>
          <Row>
            <Col md="12">
              <FormGroup>
                <label htmlFor="localidade">Localidade<code>*</code></label>
                <Select
                  id="localidade"
                  className={ clss[ 'localidade' ] }
                  onBlur={ () => limparClss( 'localidade' ) }
                  value={ localidade }
                  styles={ selectDefault }
                  options={ optionLocalidade }
                  onChange={ e => setLocalidade( e ) }
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <label htmlFor="quarteirao">Quarteirão<code>*</code></label>
                <Select
                  id="quarteirao"
                  className={ clss[ 'quarteirao' ] }
                  onBlur={ () => limparClss( 'quarteirao' ) }
                  value={ quarteirao }
                  styles={ selectDefault }
                  options={ optionQuarteirao }
                  onChange={ e => setQuarteirao( e ) }
                  isDisabled={ optionQuarteirao.length === 0 }
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <label htmlFor="lado">Lado<code>*</code></label>
                <Select
                  id="lado"
                  className={ clss[ 'lado' ] }
                  onBlur={ () => limparClss( 'lado' ) }
                  value={ lado }
                  styles={ selectDefault }
                  options={ optionLado }
                  onChange={ e => setLado( e ) }
                  isDisabled={ optionLado.length === 0 }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="numero">Nº Imóvel<code>*</code></label>
                <input
                  id        ="numero"
                  className ={ "form-control " + clss[ 'numero' ] }
                  onBlur    ={ () => limparClss( 'numero' ) }
                  value     ={ numero ? numero : "" }
                  type      ="number"
                  pattern   ="[0-9]*"
                  onKeyDown ={ e =>
                    ["e", "E", "+", "-", "."].includes( e.key ) && e.preventDefault()
                  }
                  onChange  ={ e => setNumero( e.target.value ) }
                  min       ="1"
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="sequencia">Sequência</label>
                <input
                  id        ="sequencia"
                  value     ={ sequencia ? sequencia : "" }
                  type      ="number"
                  className ="form-control"
                  pattern   ="[0-9]*"
                  onKeyDown ={ e => [ "e", "E", "+", "-", "." ].includes( e.key ) && e.preventDefault() }
                  onChange  ={ e => setSequencia( e.target.value ) }
                  min       ="1"
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
                  onChange={ e =>( onlyLetters(e.target.value) ?  setResponsavel( e.target.value ) : () => {} )}
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
                <label>Tipo do imóvel<code>*</code></label>
                <Select
                    id="tipoImovel"
                    className={ clss[ 'tipoImovel' ] }
                    onBlur={ () => limparClss( 'tipoImovel' ) }
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
                        onBlur={ () => setFlLocValido(true) }
                      />
                    </div>
                    <div className="toggle-control">
                      <span className="separator"></span>
                      <div className="toggle" onClick={ () => setFl_open( !fl_open ) }>
                        {
                          fl_open ?
                            <FaChevronUp className="icon sm" /> :
                            <FaChevronDown className="icon sm" />
                        }
                      </div>
                    </div>
                  </div>

                  <Collapse in={ fl_open }>
                    <div className="collapse-body">
                      <FormGroup>
                        <label htmlFor="lng">Longitude<code>*</code></label>
                        <input
                          id        ="lng"
                          value     ={ lng }
                          type      ="number"
                          pattern   ="[0-9]*"
                          onKeyDown ={ e => [ "e", "E", "+", "," ].includes( e.key ) && e.preventDefault() }
                          className ={ "form-control " + clss[ 'longitude' ] }
                          onBlur    ={ () => limparClss( 'longitude' ) }
                          onChange  ={ e => { setLng( e.target.value ); checkLocValida( e.target.value, "lng" ); } }
                        />
                      </FormGroup>
                      <FormGroup className="mb-0">
                        <label htmlFor="lat">Latitude<code>*</code></label>
                        <input
                          id        ="lat"
                          value     ={ lat }
                          type      ="number"
                          pattern   ="[0-9]*"
                          onKeyDown ={ e => [ "e", "E", "+", "," ].includes( e.key ) && e.preventDefault() }
                          className ={ "form-control " + clss[ 'latitulde' ] }
                          onBlur    ={ () => limparClss( 'latitulde' ) }
                          onChange  ={ e => { setLat( e.target.value ); checkLocValida( e.target.value, "lat" ); } }
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
        </ModalBody>
        <ModalFooter>
          <Button className="secondary" data-dismiss="modal">Cancelar</Button>
          <ButtonSaveModal title="Salvar" loading={ flLoading } disabled={ flLoading } type="submit" />
        </ModalFooter>
      </form>
    </Modal>
  )
}

const mapStateToProps = state => ({
  usuario     : state.appConfig.usuario,
  localidades : state.localidade.localidades,
  imovel      : state.imovel.imovel,
  reload      : state.imovel.reload,
  quarteiroes : state.quarteirao.quarteiroes,
  lados       : state.quarteirao.lados,
  created     : state.imovel.created,
  updated     : state.imovel.updated
})

const mapDispatchToProps = {
  getLocationByCityRequest,
  getQuarteiroesLocalidadeRequest,
  getLadosQuarteiraoRequest,
  addImovelRequest,
  editarImovelRequest,
  clearCreate,
  clearUpdate,
  showNotifyToast,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalImovel );
