/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import $ from 'jquery';
import ButtonSaveModal from '../../components/ButtonSaveModal';
import { Lista, ListaItem, ListaIcon } from '../../components/Listas';
import { FaBorderAll } from 'react-icons/fa';
import ButtonClose from '../../components/ButtonClose';
import AddBox from '@material-ui/icons/AddBox';
import { Fab } from '@material-ui/core';
import ModalQuarteirao from './components/ModalQuarteirao';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { createZoneRequest, clearCreate } from '../../store/Zona/zonaActions';
import { getQuarteiroesMunicipioSemZonaRequest } from '../../store/Quarteirao/quarteiraoActions'
import { getLocationByCityRequest } from '../../store/Localidade/localidadeActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';

// STYLES
import { Button } from '../../styles/global';
import { FormGroup } from '../../styles/global';

// VALIDATIONS FUNCTIONS
import {isBlank} from '../../config/function';

function ModalAdd({ show, handleClose, createZoneRequest, created, municipio_id, ...props }) {

  const [ nome, setNome ]                                  = useState( "" );
  const [ isValidNome, setIsValidNome ]                    = useState( true );
  const [ quarteiroes, setQuarteiroes]                     = useState( [] )
  const [ flLoading, setFlLoading ]                        = useState( false );
  const [ showModalQuarteirao, setShowModalQuarteirao ]    = useState( false );

  useEffect(() => {
    props.clearCreate();
    props.getLocationByCityRequest( municipio_id );
    props.getQuarteiroesMunicipioSemZonaRequest( municipio_id );
  }, []);

  /**
   * Acionado sempre que o modal é for aberto
   * Limpa todos os dados digitado anteriormente
   * atraves da função limparTudo()
   */
  useEffect(() => {
    if( show ) {
      clearInput()
    }
    //não fecha o modal, mas faz com que o show=false
    //quando o usuario aperta o botão para abrir o modal novamente
    //faz com que show=true e então a função limparTudo() é executada
    handleClose()
  }, [ show ]);

  useEffect(() => {
    setFlLoading(false)
    if( created ){
      props.getQuarteiroesMunicipioSemZonaRequest( municipio_id );
      closeModal();
    }
    
    props.clearCreate();
    
  }, [ created ]);

  function closeModal() {
    clearInput();
    $('#modal-novo-zona').modal('hide');
  }

  function clearInput() {
    setIsValidNome(true);
    setNome( "" );
    setQuarteiroes([])
  }

  const abrirModalQuarteirao = () => {setShowModalQuarteirao( true );}

  /**
   * Adiciona um novo quarteirao a zona
   */
  const addQuarteirao = quarteirao => {
    setQuarteiroes( [ ...quarteiroes, quarteirao ] );
    setShowModalQuarteirao( false );
  }

  /**
   * Excluir um item do array lados
   * @param {integer} index
   */
  const excluirQuarteirao = index => {
    let qs = quarteiroes;
    qs.splice( index, 1 );
    qs = qs.map( ( q ) => { return q; } );
    setQuarteiroes( qs );
  }

  /**
   * Solicita ao action que adicione um novo quarteirão
   * @param {element} e elemento que acionou a função
   */
  const handleCadastrar = e => {
    e.preventDefault();

    var isValido = true
    if(isBlank(nome)){
      setIsValidNome(false)
      isValido = false
    }
    else if(quarteiroes.length == 0){
      setIsValidNome(true)
      isValido = false
      props.showNotifyToast("Por favor adicione ao menos 1 quarteirao na zona",'warning')
    }

    if (isValido) {
      setIsValidNome(true)
      const quarteiroes_id = quarteiroes.map( q => q.id)
      setFlLoading(true)
      createZoneRequest( municipio_id, nome, quarteiroes_id );
    }
  }

  return(
    <Modal id="modal-novo-zona" title="Cadastrar Zona">
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
        <p className="text-description">
          Atenção os campos com <code>*</code> são obrigatórios
        </p>
        <Row>
            <Col>
              <FormGroup>
                <label htmlFor="nome">Nome <code>*</code></label>
                <input 
                  id="nome" 
                  value={nome} 
                  className ={ `form-control ${ !isValidNome ? 'invalid' : '' }` } 
                  onChange={ (e) => setNome(e.target.value) } 
                  required />
                  {
                    !isValidNome ?
                      <span class="form-label-invalid">Nome inválido</span> :
                      ''
                  }
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label>
                  Quarteirões<code>*</code>
                </label>
                <Lista>
                  {quarteiroes.map((q, index) => (
                    <ListaItem
                      key={`quart-${index}`}
                      className="pt-0 pb-0 justify-content-between"
                    >
                      <div>
                        <ListaIcon className="mr-2">
                          <FaBorderAll />
                        </ListaIcon>
                        <span className="mr-2">
                          Nº {q.numero} - LOC: {q.localidade}
                        </span>
                      </div>

                      <ButtonClose
                        title="Excluir quarteirão"
                        onClick={() => excluirQuarteirao(index)}
                        className="ml-2 text-danger"
                      />
                    </ListaItem>
                  ))}
                </Lista>
              </FormGroup>
              <Row>
                <Col className="text-right">
                  <Fab
                    className="bg-success text-white"
                    size="medium"
                    aria-label="Cadastrar um novo lado"
                    onClick={() => abrirModalQuarteirao()}
                  >
                    <AddBox />
                  </Fab>
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button 
            type="button" 
            className="secondary" 
            data-dismiss="modal" 
            onClick = { closeModal } 
            disabled={ flLoading }>
              Cancelar
          </Button>
          <ButtonSaveModal title="Salvar" loading={ flLoading } disabled={ flLoading } type="submit" />
        </ModalFooter>
      </form>
      <ModalQuarteirao
        acao={"add"} // add ou editar
        show={showModalQuarteirao}
        handleClose={() => setShowModalQuarteirao(false)}
        quarteiroes={props.quarteiroes}
        localidades={props.localidades}
        addQuarteirao={addQuarteirao}
      />
    </Modal>
  );
}

const mapStateToProps = state => ({
  municipio_id: state.appConfig.usuario.municipio.id,
  quarteiroes: state.quarteirao.quarteiroes,
  created: state.zona.created,
  localidades : state.localidade.localidades,
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    createZoneRequest, 
    clearCreate, 
    getQuarteiroesMunicipioSemZonaRequest,
    getLocationByCityRequest,
    showNotifyToast }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
