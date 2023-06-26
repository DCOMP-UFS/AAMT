/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import SelectWrap from '../../../components/SelectWrap';
import ButtonSaveModal from '../../../components/ButtonSaveModal';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { transferMunicipioRegionalRequest, transferMunicipioRegionalReset } from '../../../store/Municipio/municipioActions';
import { showNotifyToast } from "../../../store/AppConfig/appConfigActions";

// STYLES
import { ContainerArrow } from '../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../styles/global';


const ModalTransferirMunicipio = ( { zona_id, acao, show, handleClose, regionais, municipio, ...props } ) => {
  const [ regional, setRegional ]                   = useState( {} );
  const [ optionRegional, setOptionRegional ]       = useState( [] );
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
   * Preenchendo as opções das localidades
   */
  useEffect(() => {
    const options = regionais.map( reg => ( { value: reg.id, label: reg.nome } ) );
    setOptionRegional( options );
  }, [ regionais ]);

  useEffect(() => {
    if(props.transferedCity){
      props.showNotifyToast( "Municipios vinculados atualizado com sucesso", "success" )
      setFlLoading(false)
      handleClose()
      props.transferMunicipioRegionalReset()
      setTimeout(() => { 
        document.location.reload( true );
      }, 1500)
    }

    setFlLoading(false)
    props.transferMunicipioRegionalReset()
  }, [ props.transferedCity ]);


  /**
   * Esta função chama a action para adicionar um imóvel ao quarteirão.
   * 
   * @param {object} e Elemento que acionou esaa função
   */
  const handleSubmit = e => {
    e.preventDefault();
    setFlLoading(true)
    props.transferMunicipioRegionalRequest(municipio.id, regional.value)
  }

  function limparTudo(){
    setRegional( {} )
    setFlLoading( false );
  }

  return(
    <Modal show={ show } onHide={ handleClose } backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          Mundança de regional do municipio
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
                <label htmlFor="l_regional">Regional de saúde<code>*</code></label>
                  <SelectWrap
                    id="l_regional"
                    value={ regional }
                    styles={ selectDefault }
                    options={ optionRegional }
                    onChange={ e => setRegional( e ) }
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
  transferedCity: state.municipio.transferedCity,
} );

/**
 * Mapeia ações a propriedade do componente
 * @param {*} dispatch 
 * @returns 
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    transferMunicipioRegionalRequest,
    transferMunicipioRegionalReset,
    showNotifyToast
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalTransferirMunicipio );
