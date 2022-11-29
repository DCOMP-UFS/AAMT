/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/Modal';
import $ from 'jquery';
import LoadginGif from '../../../../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONSy
import { showNotifyToast } from '../../../../../store/AppConfig/appConfigActions';
import { finishActivityRequest, finishActivityReset } from '../../../../../store/Atividade/atividadeActions';

// STYLES
import { Button } from '../../../../../styles/global';

function ModalEncerrarAtividade( { atividadeId, ...props } ) {
  const [ flLoading, setFlLoading ] = useState( false );

  useEffect(() => {
    if( props.finished ) {
      setFlLoading( false );
      props.finishActivityReset();
      $('#'+props.id).modal('hide');
      setTimeout(() => { document.location.reload( true );}, 1500)
    }else if( props.finished === false ) {
      setFlLoading( false );
      props.finishActivityReset();
    }
  }, [ props.finished ]);

  function handleClick() {
    setFlLoading(true);
    props.finishActivityRequest(atividadeId)
    //setTimeout(() => {  setFlLoading(false);}, 3000)
    //props.showNotifyToast("Atividade encerrada com sucesso","success")
    //setTimeout(() => { document.location.reload( true );}, 1500)
  }

  return(
    <Modal id={props.id} title="Encerrar Atividade" centered={ true }>
      <ModalBody>
        <p>Deseja mesmo encerrar a atividade {atividadeId}?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal" disabled={ flLoading }>Cancelar</Button>
        <Button
          className="danger"
          onClick={ handleClick }
          disabled={ flLoading }
        >
          {
            flLoading ?
              (
                <>
                  <img
                    src={ LoadginGif }
                    width="25"
                    style={{ marginRight: 10 }}
                    alt="Carregando"
                  />
                  Encerrando...
                </>
              ) :
              "Confirmar"
          }
        </Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = state => ({
  finished: state.atividade.finished,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    showNotifyToast, 
    finishActivityRequest, 
    finishActivityReset 
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEncerrarAtividade);
