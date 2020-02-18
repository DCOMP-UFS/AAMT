/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { tipoImovel as tipoImovelEnum } from '../../config/enumerate';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateHouseRequest, clearUpdated as clearUpdatedCityBlock } from '../../store/actions/QuarteiraoActions'
import { clearUpdate as clearUpdateHouse } from '../../store/actions/ImovelActions'

// STYLES
import { ContainerArrow } from '../../styles/util';
import { Button, FormGroup, selectDefault } from '../../styles/global';

function ModalUpdateHouse({ lados, imovel, ...props }) {
  const [ numero, setNumero ] = useState( null );
  const [ sequencia, setSequencia ] = useState( null );
  const [ responsavel, setResponsavel ] = useState( "" );
  const [ complemento, setComplemento ] = useState( "" );
  const [ tipoImovel, setTipoImovel ] = useState({});
  const [ optionTipoImovel ] = useState(
    Object.entries( tipoImovelEnum ).map( ([ name, attr ]) => {
      return { value: attr.value, label: attr.label }
    })
  );
  const [ lado, setLado ] = useState({});
  const [ optionLado, setOptionLado ] = useState([]);

  useEffect(() => {
    const options = lados.filter( l => l.id ? true : false ).map( l => {
      if( l.id === imovel.lado_id ) {
        setLado({
          value: l.id,
          label: "Nº " + l.numero  + " - " + l.logradouro
        });
      }

      return ({
        value: l.id,
        label: "Nº " + l.numero  + " - " + l.logradouro
      })
    });

    setOptionLado( options );
  }, [ lados ]);

  useEffect(() => {
    if( Object.entries( imovel ).length > 0 ) {
      const lado = imovel.lado;
      setNumero( imovel.numero );
      setSequencia( imovel.sequencia );
      setResponsavel( imovel.responsavel );
      setComplemento( imovel.complemento );

      const ti = Object.entries( tipoImovelEnum ).find( ([ name, attr ]) => {
        return attr.value === imovel.tipoImovel;
      });

      setTipoImovel({ value: ti[1].value, label: ti[1].label });
      setLado({ value: lado.id, label: "Nº " + lado.numero  + " - " + lado.logradouro });
    }
  }, [ imovel ]);

  useEffect(() => {
    if( props.updated ) {
      $('#modal-editar-imovel').modal('hide');
      props.clearUpdatedCityBlock();
      props.clearUpdateHouse();
    }
  }, [ props.updated ]);

  function handleSubmit( e ) {
    e.preventDefault();

    props.updateHouseRequest(
      imovel.id,
      {
        numero,
        sequencia,
        responsavel,
        complemento,
        tipoImovel: tipoImovel.value,
        lado_id: lado.value
      }
    );
  }

  return(
    <Modal id="modal-editar-imovel" title="Editar Imóvel" centered={ true }>
      <form onSubmit={ handleSubmit }>
        <ModalBody>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="lado">Lado <code>*</code></label>
                <Select
                    id="lado"
                    value={ lado }
                    styles={ selectDefault }
                    options={ optionLado }
                    onChange={ e => setLado( e ) }
                  />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="numero">Nº Imóvel <code>*</code></label>
                <input
                  id="numero"
                  value={ numero ? numero : "" }
                  type="number"
                  className="form-control"
                  onChange={ e => setNumero( e.target.value ) }
                  min="1"
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="sequencia">Sequência</label>
                <input
                  id="sequencia"
                  value={ sequencia ? sequencia : "" }
                  type="number"
                  className="form-control"
                  onChange={ e => setSequencia( e.target.value ) }
                  min="1"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="responsavel">Responsável</label>
                <input
                  id="responsavel"
                  value={ responsavel }
                  className="form-control"
                  onChange={ e => setResponsavel( e.target.value ) }
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
                <label>Tipo do imóvel <code>*</code></label>
                <Select
                    id="tipoImovel"
                    value={ tipoImovel }
                    styles={ selectDefault }
                    options={ optionTipoImovel }
                    onChange={ e => setTipoImovel( e ) }
                  />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <ContainerArrow className="justify-content-end">
            <div>
              <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </ContainerArrow>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  imovel: state.supportInfo.imovelSelect,
  updated: state.imovel.updated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateHouseRequest, clearUpdatedCityBlock, clearUpdateHouse }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUpdateHouse);
