/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import $ from 'jquery';
import LoadginGif from '../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { destroyCycleRequest, changeFlDestroyed } from '../../store/Ciclo/cicloActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';

// STYLES
import { Button } from '../../styles/global';

function ModalDestroy( props ) {
  const [ flLoading, setFlLoading ] = useState( false );

  useEffect(() => {
    if( props.destroyed ) {
      setFlLoading( false );
      props.changeFlDestroyed( null );
      $('#modal-excluir-ciclo').modal('hide');
      setTimeout(() => { document.location.reload( true );}, 1000)
    }else if( props.destroyed === false ) {
      setFlLoading( false );
      props.changeFlDestroyed( null );
    }
  }, [ props.destroyed ]);

  function handleClick() {
    setFlLoading(true);

    const noOpenOrFinishCycle = props.tableSelected.every(function (row) {
      const { situacao, ano, sequencia } = props.ciclos[row.dataIndex];

      if (situacao === "Em aberto" || situacao === "Finalizado") {
        props.showNotifyToast(
          `O ciclo ${ano}.${sequencia} não pode ser excluído pois está em aberto ou finalizado`,
          "warning"
        );
        setFlLoading(false);
        return false;
      } else {
        return true;
      }
    });
    var idCicloMaisAntigo = null

    //Procura o menor id dos ciclos selecionados
    //o menor id indica que o ciclo é o mais antigo do conjunto
    props.tableSelected.forEach((element,index) => {
      if(index == 0)
        idCicloMaisAntigo = props.ciclos[element.dataIndex].id
      else{
        const aux = props.ciclos[element.dataIndex].id
        if(aux < idCicloMaisAntigo)
          idCicloMaisAntigo = aux
      }
    });

    if (noOpenOrFinishCycle) {
      //Além de deletar o ciclo com o id informado,também deleta todos os ciclos posteriores.
      //Para cada ciclo deletado, também são excluidos suas atividades
      props.destroyCycleRequest(idCicloMaisAntigo);
    }
  }

  return(
    <Modal id="modal-excluir-ciclo" title="Excluir Ciclo(s)" centered={ true }>
      <ModalBody>
        <p>Atenção! Caso a operação seja feita, os ciclos selecionados e os ciclos posteriores ao selecionados serão deletados. Alem disso, as atividades planejadas de cada ciclo afetado serão deletadas. Deseja, mesmo assim, excluir o(s) ciclo(s)?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" data-dismiss="modal">Cancelar</Button>
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
