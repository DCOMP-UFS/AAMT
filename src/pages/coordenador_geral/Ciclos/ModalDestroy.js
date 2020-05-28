/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import $ from 'jquery';
import LoadginGif from '../../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { destroyCycleRequest, changeFlDestroyed } from '../../../store/actions/CicloActions';
import { showNotifyToast } from '../../../store/actions/appConfig';

// STYLES
import { Button } from '../../../styles/global';

function ModalDestroy( props ) {
  const [ flLoading, setFlLoading ] = useState( false );

  useEffect(() => {
    if( props.destroyed ) {
      setFlLoading( false );
      props.changeFlDestroyed( null );
      $('#modal-excluir-ciclo').modal('hide');
    }else if( props.destroyed === false ) {
      setFlLoading( false );
      props.changeFlDestroyed( null );
    }
  }, [ props.destroyed ]);

  function handleClick() {
    setFlLoading( true );
    props.tableSelected.forEach( row => {
      const { id, situacao } = props.ciclos[ row.dataIndex ];

      if( situacao === "Em aberto" || situacao === "Finalizado" )
        props.showNotifyToast( "Não é permitido excluir ciclo em aberto ou finalizado", "warning" );
      else
        props.destroyCycleRequest( id );
    });
  }

  return(
    <Modal id="modal-excluir-ciclo" title="Excluir Ciclo(s)" centered={ true }>
      <ModalBody>
        <p>Atenção se excluir este(s) ciclo(s) todas as informações serão perididas. Deseja, mesmo assim, excluir o(s) ciclo(s)?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button
          className="danger"
          onClick={ handleClick }
          loading={ flLoading }
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
                  Excluindo...
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
  tableSelected: state.supportInfo.tableSelection.tableCycle,
  ciclos: state.ciclo.ciclos,
  destroyed: state.ciclo.destroyed
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ destroyCycleRequest, showNotifyToast, changeFlDestroyed }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDestroy);
