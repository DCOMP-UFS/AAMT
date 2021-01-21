import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Select from 'react-select';
import { tecnicaTratamentoEnum } from '../../../../../config/enumerate';
import { Row, Col } from 'react-bootstrap';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { duplicateRecipient } from '../../../../../store/actions/VistoriaActions';

// Styles
import {
  Button,
  selectDefault,
  Separator
} from '../../../../../styles/global';
import {
  ContainerTratamento
} from './styles';

function ModalDuplicateInspection({ index, recipientes, objetivo, ...props }) {
  const [ numberCopies, setNumberCopies ] = useState( 1 );
  const [ tipoRecipiente, setTipoRecipiente ] = useState({ value: null, label: null });
  const [ fl_eliminado, setFl_eliminado ] = useState({ value: null, label: null });
  const [ fl_tratado, setFl_tratado ] = useState({ value: null, label: null });
  const [ fl_foco, setFl_foco ] = useState({ value: null, label: null });
  const [ tecnicaTratamento, setTecnicaTratamento ] = useState({ value: tecnicaTratamentoEnum.focal.id, label: tecnicaTratamentoEnum.focal.label });
  const [ qtdTratamento, setQtdTratamento ] = useState(0);

  useEffect(() => {
    if( index > -1 ) {
      const recipiente = recipientes[ index ];
      setTipoRecipiente({ value: recipiente.tipoRecipiente, label: recipiente.tipoRecipiente });
      setFl_eliminado({ value: recipiente.fl_eliminado, label: recipiente.fl_eliminado ? "Sim" : "Não" });
      setFl_tratado({ value: recipiente.fl_tratado, label: recipiente.fl_tratado ? "Sim" : "Não" });
      setFl_foco({ value: recipiente.fl_comFoco, label: recipiente.fl_comFoco ? "Sim" : "Não" });
      setTecnicaTratamento( recipiente.tratamento.tecnica === 1 ?
        { value: tecnicaTratamentoEnum.focal.id, label: tecnicaTratamentoEnum.focal.label } :
        { value: tecnicaTratamentoEnum.perifocal.id, label: tecnicaTratamentoEnum.perifocal.label }
      );
      setQtdTratamento( recipiente.tratamento.quantidade );
    }
  }, [ index, recipientes ]);

  function closeModal() {
    setNumberCopies( 1 );
    $( '#modalDuplicateInspection' ).modal( 'hide' );
  }

  function submit( e ) {
    e.preventDefault();

    props.duplicateRecipient( index, numberCopies );
  }

  return (
    <div id="modalDuplicateInspection" className="modal fade show" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Replicar Inspeção</h5>
            <button type="button" className="close" onClick={ closeModal }>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <form onSubmit={ submit }>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="numberCopies">Tipo de recipiente</label>

                <Select
                  value={ tipoRecipiente }
                  styles={ selectDefault }
                  isDisabled={ true }
                />
              </div>
              <div className="form-group">
                <label htmlFor="fl_eliminado">Recipiente eliminado? <code>*</code></label>

                <Select
                  value={ fl_eliminado }
                  styles={ selectDefault }
                  isDisabled={ true }
                />
              </div>

              <div className="form-group">
                <label htmlFor="fl_tratado">Recipiente tratado? <code>*</code></label>

                <Select
                  value={ fl_tratado }
                  styles={ selectDefault }
                  isDisabled={ true }
                />
              </div>

              <ContainerTratamento className={ fl_tratado.value === true ? "" : "d-none" }>
                <Row>
                  <Col md="6" className="form-group">
                    <label htmlFor="qtdTratamento">Quantidade aplicada? (g) <code>*</code></label>

                    <input
                      type="number"
                      step="0.01"
                      min={ 0 }
                      className="form-control"
                      value={ qtdTratamento }
                      disabled={ true }
                    />
                  </Col>

                  <Col md="6" className="form-group">
                    <label htmlFor="tecnicaTratamento">Técnica? <code>*</code></label>

                    <Select
                      value={ tecnicaTratamento }
                      styles={ selectDefault }
                      isDisabled={ true }
                    />
                  </Col>
                </Row>
              </ContainerTratamento>

              <div className="form-group">
                <label htmlFor="fl_foco">Com foco? <code>*</code></label>

                <Select
                  value={ fl_foco }
                  styles={ selectDefault }
                  isDisabled={ true }
                />
              </div>

              <Separator />

              <div className="form-group">
                <label htmlFor="numberCopies">Número de cópias <code>*</code></label>

                <input
                  id="numberCopies"
                  type="number"
                  min={ 1 }
                  className="form-control"
                  value={ numberCopies }
                  onChange={ e => setNumberCopies( parseInt( e.target.value ) ) } />
              </div>
            </div>
            <div className="modal-footer">
              <Button type="button" className="secondary" onClick={ closeModal }>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  index: state.vistoria.duplicatorIndex,
  recipientes: state.vistoria.recipientes,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ duplicateRecipient }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (ModalDuplicateInspection )
