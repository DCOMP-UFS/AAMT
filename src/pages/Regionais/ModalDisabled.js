/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import $ from 'jquery';
import LoadginGif from '../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { 
  getRegionalHealthByStateRequest, 
  disabledRegionalsHealthRequest,
  disabledRegionalsHealthRequestReset,

} from '../../store/RegionalSaude/regionalSaudeActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';

// STYLES
import { Button } from '../../styles/global';

function ModalDisabled( props ) {
  const [ flLoading, setFlLoading ] = useState( false );

  useEffect(() => {
    if( props.updated ) {
      props.getRegionalHealthByStateRequest( props.estado_id );
      $('#modal-desativar-regional').modal('hide');
      props.showNotifyToast( "Regionais de saúde foram desativadas com sucesso", "success" )
      setFlLoading( false );
      props.disabledRegionalsHealthRequestReset();
    }
    setFlLoading( false );
    props.disabledRegionalsHealthRequestReset();
  }, [ props.updated ]);

  function handleClick() {
    setFlLoading( true );
    let regionais_ids = []
    props.tableSelected.forEach( row => {
      console.log(row)
      const { id } = props.regionaisSaude[ row.dataIndex ];
      regionais_ids.push(id)
      
    });
    
    props.disabledRegionalsHealthRequest( regionais_ids );
  }

  return(
    <Modal id="modal-desativar-regional" title="Desativar Regionais" centered={ true }>
      <ModalBody>
        <p>Deseja desativar a(s) regional(ais) de saúde?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
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
  tableSelected: state.supportInfo.tableSelection.tableRegionalHealth,
  regionaisSaude: state.regionalSaude.regionaisSaude,
  updated: state.regionalSaude.updated,
  estado_id: state.appConfig.usuario.regionalSaude.estado.id
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    getRegionalHealthByStateRequest,
    disabledRegionalsHealthRequest,
    disabledRegionalsHealthRequestReset,
    showNotifyToast, 
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDisabled);
