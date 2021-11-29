/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import $ from 'jquery';
import AddBox from '@material-ui/icons/AddBox';
import { Fab } from '@material-ui/core';
import { Lista, ListaItem, ListaIcon } from '../../../components/Listas';
import { FaBorderAll } from 'react-icons/fa';
import ButtonClose from '../../../components/ButtonClose';
import ModalLado from './components/ModalLado';

// MODELS
import { Quarteirao } from '../../../config/models';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { addQuarteiraoRequest, setCreated } from '../../../store/Quarteirao/quarteiraoActions';
import { getLocationByCityRequest } from '../../../store/Localidade/localidadeActions';
import { getZoneByCityRequest } from '../../../store/Zona/zonaActions';
import { getStreetByLocalityRequest } from '../../../store/actions/RuaActions';
import { showNotifyToast } from '../../../store/AppConfig/appConfigActions';

// STYLES
import { ContainerArrow } from '../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../styles/global';

function ModalAdd({ municipio_id, created, ...props }) {
  const [ numero, setNumero ]                     = useState( null );
  const [ lados, setLados ]                       = useState( [] );
  const [ localidade, setLocalidade ]             = useState( {} );
  const [ optionLocalidade, setOptionLocalidade ] = useState( [] );
  const [ zona, setZona ]                         = useState( {} );
  const [ optionZona, setOptionZona ]             = useState( [] );
  const [ showModalLado, setShowModalLado ]       = useState( false );

  /**
   * Effect acionado assim que o componente é contruido,
   * Este effect limpa variáveis iniciais, consulta as localidades e as zonas
   * de um município necessário para inserção de um quarteirão.
   */
  useEffect( () => {
    props.setCreated( null );
    props.getLocationByCityRequest( municipio_id );
    props.getZoneByCityRequest( municipio_id );
  }, [] );

  /**
   * Esta função monitora o state localidade no reduce e preenche as options do
   * select todas as vezes que as localidades mudarem
   */
  useEffect( () => {
    const options = props.localidades.map( l => ( { value: l.id, label: l.nome } ) );

    setOptionLocalidade( options );
  }, [ props.localidades ] );

  /**
   * Esta função monitora o state zona no reduce e preenche as options do
   * select todas as vezes que as zonas mudarem
   */
  useEffect( () => {
    const options = props.zonas.map( z => ( { value: z.id, label: z.nome } ) );

    setOptionZona( options );
  }, [ props.zonas ] );

  /**
   * Este effect monitora toda vez que o usuário seleciona uma localidade
   * para o novo quarteirão e consulta as ruas da localidade selecionada
   * no back-end para atualização do select de ruas
   */
   useEffect( () => {
    if( Object.entries( localidade ).length > 0 ) {
      props.getStreetByLocalityRequest( localidade.value );

      setZona( {} );
    }
  }, [ localidade ] );

  /**
   * Este effect monitora o state created do reduce,
   * caso a variável created seja true significa que o backend
   * conseguiu cadastrar com sucesso o quarteirão.
   */
  useEffect( () => {
    if( created ) {
      $('#modal-novo-quarteirao').modal( 'hide' );
      setLocalidade( {} );
      setZona( {} );
      setOptionZona( [] );
      setNumero( null );
      setLados( [] );
      props.setCreated( null );
    }
  }, [ created ] );

  /**
   * Limpa os valores dos inputs no modal
   */
  const clearInput = () => {
    setLocalidade( {} );
    setZona( {} );
    setOptionZona( [] );
    setNumero( null );
    setLados( [] );
  }

  /**
   * Antes de abrir o modal de adicionar lado é necessário checar se o input de localidade
   * já foi preenchido
   */
  const abrirModalLado = () => {
    if( localidade.value ) {
      setShowModalLado( true );
    } else {
      props.showNotifyToast( "Selecione uma localidade antes de adicionar um lado", "warning" );
    }
  }

  /**
   * Adiciona um novo lado ao quarteirão
   */
  const addLado = lado => {
    let ls = lados.map( ( l, index ) => {
      l.numero = index + 1

      return l;
    } );
    
    lado.numero         = ls.length + 1;
    lado.localidade_id  = localidade.value;
    setLados( [ ...ls, lado ] );
    setShowModalLado( false );
  }

  /**
   * Excluir um item do array lados
   * @param {integer} index 
   */
  const excluirLado = index => {
    let ls = lados;

    ls.splice( index, 1 );

    ls = ls.map( ( l, index ) => {
      l.numero = index + 1

      return l;
    } );

    setLados( ls );
  }

  /**
   * Solicita ao action que adicione um novo quarteirão
   * @param {element} e elemento que acionou a função
   */
  const handleSubmit = e => {
    e.preventDefault();

    const quarteirao = new Quarteirao( {
      numero,
      localidade_id : localidade.value,
      zona_id       : zona.value,
      lados
    } );

    props.addQuarteiraoRequest( quarteirao );
  }

  return(
    <Modal id="modal-novo-quarteirao" title="Cadastrar Quarteirão" size="lg">
      <form onSubmit={ handleSubmit }>
        <ModalBody>
          <Row>
            <Col sm='6'>
              <FormGroup>
                <label htmlFor="localidade">Localidade <code>*</code></label>
                <Select
                  id      ="localidade"
                  value   ={ localidade }
                  styles  ={ selectDefault }
                  options ={ optionLocalidade }
                  onChange={ e => setLocalidade( e ) }
                  required
                />
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <label htmlFor="zona">Zona</label>
                <Select
                  id      ="zona"
                  value   ={ zona }
                  styles  ={ selectDefault }
                  options ={ optionZona }
                  onChange={ e => setZona( e ) }
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="numero">Número <code>*</code></label>
                <input
                  id        ="numero"
                  value     ={ numero ? numero : "" }
                  type      ="number"
                  className ="form-control"
                  onChange  ={ e => setNumero( e.target.value ) }
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label>Lados<code>*</code></label>
                <Lista>
                  {
                    lados.map( ( l, index ) => (
                      <ListaItem key={ `lado-${ index }` } className="pt-0 pb-0 justify-content-between">
                        <div>
                          <ListaIcon className="mr-2"><FaBorderAll /></ListaIcon>
                          <span className="mr-2">Lado nº { l.numero } - Rua: { l.logradouro }</span>
                        </div>

                        <ButtonClose
                          title="Excluir lado"
                          onClick={ () => excluirLado( index ) }
                          className="ml-2 text-danger"
                        />
                      </ListaItem>
                    ) )
                  }
                </Lista>
              </FormGroup>
              <Row>
                <Col className="text-right">
                  <Fab
                    className="bg-success text-white"
                    size="medium"
                    aria-label="Cadastrar um novo lado"
                    onClick={ () => abrirModalLado() }
                  >
                    <AddBox />
                  </Fab>
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <ContainerArrow>
            <div>
              <Button type="button" className="warning" onClick={ clearInput }>Limpar</Button>
            </div>
            <div>
              <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </ContainerArrow>
        </ModalFooter>
      </form>
      {/* Modais de ação */}
      <ModalLado 
        lado        ={ {} }
        ruas        ={ props.ruas }
        show        ={ showModalLado }
        handleClose ={ () => setShowModalLado( false ) }
        acao        ={ 'cadastrar' } // cadastrar ou editar
        addLado     ={ addLado }
      />
    </Modal>
  );
}

const mapStateToProps = state => ( {
  municipio_id: state.appConfig.usuario.municipio.id,
  created     : state.quarteirao.created,
  localidades : state.localidade.localidades,
  zonas       : state.zona.zonas,
  ruas        : state.rua.ruas
 } );

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    addQuarteiraoRequest,
    getLocationByCityRequest,
    getZoneByCityRequest,
    getStreetByLocalityRequest,
    showNotifyToast,
    setCreated,
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalAdd );
