/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import $ from 'jquery';
import ButtonSaveModal from '../../components/ButtonSaveModal';
import MaskedInput from '../../components/MaskedInput'
import SelectWrap from '../../components/SelectWrap'

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateStreetRequest, clearUpdate } from '../../store/Rua/ruaActions';
import { getLocationByCityRequest } from '../../store/Localidade/localidadeActions';

// STYLES
import { ContainerArrow } from '../../styles/util';
import { Button, FormGroup, selectDefault } from '../../styles/global';

// VALIDATIONS FUNCTIONS
import { isBlank, onlyLetters} from '../../config/function';

function ModalUpdateStreet({ updated, index, show, handleClose, ...props }) {
  const [ id, setId ]                                    = useState( null );
  const [ localidade, setLocalidade ]                    = useState({});
  const [ optionLocalidade, setOptionLocalidade ]        = useState([]);
  const [ logradouro, setLogradouro ]                    = useState("");
  const [ isValidLogradouro, setIsValidLogradouro]       = useState( true );
  const [ cep, setCep ]                                  = useState("");
  const [ isValidCep, setIsValidCep]                     = useState( true );
  const [ flLoading, setFlLoading ]                      = useState( false );
 

  useEffect(() => {
    props.getLocationByCityRequest( props.municipio_id );
  }, []);

  useEffect(() => {
    if( updated ) {
      $('#modal-editar-rua').modal('hide');
    }
    props.clearUpdate()
    setFlLoading(false)
  }, [ updated ]);

  useEffect(() => {
    const options = props.localidades.map(( l ) => ({ value: l.id, label: l.nome }));
    setOptionLocalidade( options );
  }, [ props.localidades ]);

  //Toda vez que o modal for aberto, o dados que foram digitados anteriormente
  //São substituidos pelos dados originais da rua
  useEffect(() => {
    if( show && Number.isInteger( index ) ) {
      const rua = props.ruas[index];
      setId( rua.id );
      setLogradouro( rua.nome );
      setCep( rua.cep );
      setLocalidade({ value: rua.localidade.id, label: rua.localidade.nome });

      setIsValidCep(true)
      setIsValidLogradouro(true)
      handleClose()
    }
  }, [ show ]);

  function handleCadastrar( e ) {
    e.preventDefault();
    const cepInvalid = (cep.length > 0 && cep.length < 8)
    const logInvalid = isBlank(logradouro)

    cepInvalid ? setIsValidCep(false) : setIsValidCep(true)
    logInvalid ? setIsValidLogradouro(false): setIsValidLogradouro(true)

    if(!cepInvalid && !logInvalid){
      setFlLoading(true)
      props.updateStreetRequest( id, {
        nome: logradouro,
        cep,
        localidade_id: localidade.value
      });
    }
  }

  return(
    <Modal id="modal-editar-rua" title="Atualizar Rua">
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
          <p className="text-description">
              Atenção os campos com <code>*</code> são obrigatórios
          </p>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="localidade">Localidade<code>*</code></label>
                <SelectWrap
                  id="localidade"
                  value={ localidade }
                  styles={ selectDefault }
                  options={ optionLocalidade }
                  onChange={ e => setLocalidade(e) }
                  required 
                  isDisabled={true}/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
            <FormGroup>
                <label htmlFor="logradouro">Logradouro <code>*</code></label>
                <input
                  id="logradouro"
                  value={ logradouro }
                  className="form-control"
                  onChange={ e =>( onlyLetters(e.target.value) ? setLogradouro(e.target.value) : '' ) }
                  required
                />
                {
                    !isValidLogradouro ?
                      <span class="form-label-invalid">Logradouro inválido</span> :
                      ''
                }
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
            <FormGroup>
                <label htmlFor="cep">CEP <code>*</code></label>
                <MaskedInput
                  id="cep"
                  className="form-control"
                  type="cep"
                  value={ cep }
                  onChange={ e => setCep(e.target.value) }
                  required
                />
                {
                    !isValidCep ?
                      <span class="form-label-invalid">CEP inválido</span> :
                      ''
                }
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <ContainerArrow className="justify-content-end">
            <div>
            <Button 
                type="button" 
                className="secondary" 
                data-dismiss="modal" 
                disabled={ flLoading }>
                  Cancelar
              </Button>
              <ButtonSaveModal title="Salvar" loading={ flLoading } disabled={ flLoading } type="submit" />
            </div>
          </ContainerArrow>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  ruas: state.rua.ruas,
  updated: state.rua.updated,
  index: state.rua.indexSelect,
  municipio: state.appConfig.usuario.municipio.id,
  localidades: state.localidade.localidades,
  localidade: state.localidade.localidade,
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    getLocationByCityRequest, 
    updateStreetRequest, 
    clearUpdate
   }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUpdateStreet);
