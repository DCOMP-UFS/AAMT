/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import SelectWrap from '../../../components/SelectWrap';
import ButtonSaveModal from '../../../components/ButtonSaveModal';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { getZoneByIdRequest } from '../../../store/Zona/zonaActions';
import { 
    inserirQuarteiraoEmZonaRequest, 
    inserirQuarteiraoEmZonaReset,
    getQuarteiroesMunicipioSemZonaRequest
 } from '../../../store/Quarteirao/quarteiraoActions';
import { showNotifyToast } from "../../../store/AppConfig/appConfigActions";

// STYLES
import { ContainerArrow } from '../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../styles/global';


const ModalChangeQuarteiraoInZone = ( {quarteirao, show, handleClose, ...props } ) => {
 
  const zona_original = { value: props.zona.id, label: props.zona.nome }

  const [ zona, setZona ]               = useState( zona_original );
  const [ optionZona, setOptionZona ]   = useState( [] );
  const [ flLoading, setFlLoading ]     = useState( false );

   /**
   *  Limpa os campos toda vez que o modal for aberto
   */
  useEffect(() => {
    if( show ) {
      limparTudo()
    }
  }, [ show ]);

  /**
   * Preenchendo as opções do select de quarteirao
   */
  useEffect(() => {
    const options = props.zonas.map( z => ( { value: z.id, label: z.nome } ) );
    setOptionZona( options );
  }, [ props.zonas ]);


  useEffect(() => {
    if(props.updatedZone){
      props.getZoneByIdRequest( props.zona.id ); // atualizando lista de quarteirões da zona
      props.getQuarteiroesMunicipioSemZonaRequest( props.municipio_id ); //atualizando lista de quarteirões que podem ser adicionados
      
      setTimeout(() => { 
        setFlLoading(false)
        props.inserirQuarteiraoEmZonaReset()
        props.showNotifyToast( "Zona do quarteirão alterada com sucesso", "success" )
        handleClose()
        //document.location.reload( true );
      }, 3000)
    }else{
      setFlLoading(false)
      props.inserirQuarteiraoEmZonaReset()
    }
  }, [ props.updatedZone ]);

  /**
   * Esta função chama a action para adicionar um imóvel ao quarteirão.
   * 
   * @param {object} e Elemento que acionou esaa função
   */
  const handleSubmit = e => {
    e.preventDefault();
    setFlLoading(true)
    props.inserirQuarteiraoEmZonaRequest(quarteirao.id, zona.value, true)
  }

  function limparTudo(){
    setZona( zona_original );
  }

  return(
    <Modal show={ show } onHide={ handleClose } backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          Editar zona do quarteirão
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={ handleSubmit }>
        <Modal.Body>
          <p className="text-description">
            <b>OBS1:</b> Os campos com <code>*</code> são obrigatórios
          </p>
          <Row>
            <Col md="12">
              <FormGroup>
                <label htmlFor="l_zona">Zona <code>*</code></label>
                <SelectWrap
                  id="l_zona"
                  value={ zona }
                  styles={ selectDefault }
                  options={ optionZona }
                  onChange={ e => setZona( e ) }
                  required
                />
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <ContainerArrow className="justify-content-end">
            <div>
            <Button 
                type="button" 
                className="secondary" 
                data-dismiss="modal" 
                onClick={ handleClose }
                disabled={ flLoading }>
                  Cancelar
              </Button>
              <ButtonSaveModal title="Salvar" loading={ flLoading } disabled={ flLoading } type="submit" />
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
  zona: state.zona.zona,
  zonas: state.zona.zonas,
  municipio_id: state.appConfig.usuario.municipio.id,
  updatedZone: state.quarteirao.updatedZone,
} );

/**
 * Mapeia ações a propriedade do componente
 * @param {*} dispatch 
 * @returns 
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    inserirQuarteiraoEmZonaRequest,
    inserirQuarteiraoEmZonaReset,
    getZoneByIdRequest,
    getQuarteiroesMunicipioSemZonaRequest,
    showNotifyToast
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalChangeQuarteiraoInZone );