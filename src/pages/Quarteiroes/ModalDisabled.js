/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import $ from 'jquery';
import LoadginGif from '../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { getQuarteiroesMunicipioRequest, setQuarteiraoRequest, setUpdated } from '../../store/Quarteirao/quarteiraoActions';

// STYLES
import { Button } from '../../styles/global';

// Models
import { Quarteirao } from '../../config/models';

function ModalDisabled(props ) {
  const [ flLoading, setFlLoading ] = useState( false );

  function handleClick() {
    setFlLoading( true );
    props.tableSelected.forEach( row => {
      const quart = props.quarteiroes[ row.dataIndex ];
      const quarteirao = new Quarteirao( {
        id            : quart.id,
        numero        : quart.numero,
        localidade_id : quart.localidade_id,
        zona_id       : quart.zona_id,
        ativo         : 0,
        quarteirao_id : null,
        lados         : []
      });
      props.setQuarteiraoRequest( quarteirao );
    });
    props.setUpdated(null);
  }

  useEffect(() => {
    props.setUpdated(null);
  }, []);

  useEffect(() => {
    if( props.updated ) {
      props.getQuarteiroesMunicipioRequest( props.municipio_id );
      setFlLoading( false );
      $('#modal-desativar-quarteirao').modal('hide');
    }
    props.setUpdated(null);
  }, [ props.updated ]);

  return(
    <Modal id="modal-desativar-quarteirao" title="Desativar Quarteirão(ões)" centered={ true }>
      <ModalBody>
        <p>Deseja desativar o(s) quarteirão(ões)?</p>
      </ModalBody>
      <ModalFooter>
        <Button 
          className="secondary" 
          data-dismiss="modal" 
          disabled={ flLoading }>
            Cancelar
        </Button>
        <Button
          className="danger"
          onClick={ handleClick }
          loading={ flLoading.toString() }
          disabled={ flLoading ? 'disabled' : '' }
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
                  Desativando...
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
  tableSelected: state.supportInfo.tableSelection.tableQuarteirao,
  quarteiroes: state.quarteirao.quarteiroes,
  updated: state.quarteirao.updated,
  municipio_id: state.appConfig.usuario.municipio.id,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    setQuarteiraoRequest, 
    setUpdated, 
    getQuarteiroesMunicipioRequest, 
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDisabled);
