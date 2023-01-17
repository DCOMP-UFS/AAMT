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


const ModalAddBlockInZone = ( { zona_id, acao, show, handleClose, quarteiroes, ...props } ) => {
  const [ quarteirao, setQuarteirao ]                             = useState( {} );
  const [ optionQuarteirao, setOptionQuarteirao ]   = useState( [] );
  const [ flLoading, setFlLoading ]                 = useState( false );

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
    const options = quarteiroes.map( q => ( { value: q.id, label: q.numero } ) );

    setOptionQuarteirao( options );
  }, [ quarteiroes ]);



  useEffect(() => {
    if(props.insertedZone){
      props.getZoneByIdRequest( zona_id ); // atualizando lista de quarteirões da zona
      props.getQuarteiroesMunicipioSemZonaRequest( props.municipio_id ); //atualizando lista de quarteirões que podem ser adicionados
      
      setTimeout(() => { 
        setFlLoading(false)
        props.inserirQuarteiraoEmZonaReset()
        props.showNotifyToast( "Quarteirão inserido com sucesso", "success" )
        handleClose()
        //document.location.reload( true );
      }, 3000)
    }else{
      setFlLoading(false)
      props.inserirQuarteiraoEmZonaReset()
    }
  }, [ props.insertedZone ]);



  /**
   * Esta função chama a action para adicionar um imóvel ao quarteirão.
   * 
   * @param {object} e Elemento que acionou esaa função
   */
  const handleSubmit = e => {
    e.preventDefault();
    setFlLoading(true)
    props.inserirQuarteiraoEmZonaRequest(quarteirao.value, zona_id)
  }

  function limparTudo(){
    setQuarteirao( {} );
    setFlLoading( false );
    props.inserirQuarteiraoEmZonaReset()
  }

  return(
    <Modal show={ show } onHide={ handleClose } backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          { acao == 'add' ? 'Adicionar' : 'Editar' } Quarteirão
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
                <label htmlFor="l_rua">Nº do quarteirão  <code>*</code></label>
                <SelectWrap
                  id="l_rua"
                  value={ quarteirao }
                  styles={ selectDefault }
                  options={ optionQuarteirao }
                  onChange={ e => setQuarteirao( e ) }
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
  municipio_id: state.appConfig.usuario.municipio.id,
  insertedZone: state.quarteirao.insertedZone,
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
    getQuarteiroesMunicipioSemZonaRequest,
    getZoneByIdRequest,
    showNotifyToast
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalAddBlockInZone );
