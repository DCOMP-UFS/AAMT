/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { tipoImovel as tipoImovelEnum } from '../../../config/enumerate';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { clearCreate } from '../../../store/actions/ImovelActions'
import { addHouseRequest, clearUpdated as clearUpdatedCityBlock } from '../../../store/actions/QuarteiraoActions'

// STYLES
import { ContainerArrow } from '../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../styles/global';

function ModalAddHouse({ lados, ...props }) {
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
    const options = lados.filter( l => l.id ? true : false ).map( l => ({
      value: l.id,
      label: "Nº " + l.numero  + " - " + l.logradouro
    }));

    setOptionLado( options );
  }, [ lados ]);

  useEffect(() => {
    if( props.created ) {
      $('#modal-novo-imovel').modal('hide');
      setNumero(null);
      setSequencia(null);
      setResponsavel("");
      setComplemento("");
      setTipoImovel({});
      setLado({});
      props.clearCreate();
      props.clearUpdatedCityBlock();
    }
  }, [ props.created ]);

  function handleCadastrar( e ) {
    e.preventDefault();

    props.addHouseRequest( numero, sequencia, responsavel, complemento, tipoImovel.value, lado.value )
  }

  return(
    <Modal
      id="modal-novo-imovel"
      title="Cadastrar Imóvel"
      size="md"
    >
      <form onSubmit={ handleCadastrar }>
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
  created: state.imovel.created
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addHouseRequest, clearCreate, clearUpdatedCityBlock }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAddHouse);
