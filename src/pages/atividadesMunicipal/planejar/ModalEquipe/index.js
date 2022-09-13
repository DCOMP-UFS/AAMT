import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import $ from 'jquery';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import Modal, { ModalBody, ModalFooter } from '../../../../components/Modal';

// ACTIONS
import { addEquipe } from '../../../../store/Atividade/atividadeActions';

// STYLES
import {
  UlEquipe,
  LiEquipe,
  ContainerCheck,
  DivDescription,
  LiEmpty,
  Arrows,
  UlLocal,
  LiLocal
} from './styles';
import { ContainerArrow } from '../../../../styles/util';
import { Button, FormGroup, selectDefault, Separator } from '../../../../styles/global';

const ModalEquipe = ( { equipes, isOpen, handleClose, ...props } ) => {
  const [ membros, setMembros ]                         = useState( [] );
  const [ membrosSelecionados, setMembrosSelecionados ] = useState( [] );
  const [ internalReload, setInternalReload ]           = useState( false );
  const [ supervisor, setSupervisor ]                   = useState( {} );
  const [ optionSupervisor, setOptionSupervisor ]       = useState( [] );
  const [ message, setMessage ]                         = useState( "" );
  const [ messageMembro, setMessageMembro ]             = useState( "" );
  const [ locais, setLocais ]                           = useState( [] );
  const [ messageLocais, setMessageLocais ]             = useState( "" );

  //É acionado sempre que o modal é aberto abre
  //Limpa os dados deixados quando o modal foi fechado
  useEffect( () => {
    if(isOpen)
      clearInput()

    handleClose()
  }, [ isOpen ] );


  useEffect( () => {
    const m = props.membros.map( m => ( {
      id: m.id,
      nome: m.nome,
      checked: false
    } ) );

    setMembros( m );
  }, [ props.membros ] );

  useEffect( () => {
    setOptionSupervisor(
      membrosSelecionados.map( m => ( {
        value: m.id, label: m.nome
      } ) )
    );
  }, [ membrosSelecionados ] );

  useEffect( () => {
    const l = props.locais
      .filter( loc => loc.flEstrato ? !loc.flEquipe : false )
      .map( loc => ( { ...loc, checked: false } ) );

    setLocais( l );
  }, [ props.locais, props.reload ] );

  function addMembro() {
    let mSelecionado = membros
      .filter( m => m.checked ? m.checked : false )
      .map( m => ( { ...m, checked: false } ) );
    let m = membros.filter( m => m.checked ? !m.checked : true );

    setMembrosSelecionados( [ ...membrosSelecionados, ...mSelecionado ] );
    setMembros( m );
  }

  function removeMembro() {
    let m = membrosSelecionados
      .filter( m => m.checked ? m.checked : false )
      .map( m => {
        if( m.id === supervisor.value )
          setSupervisor( {} );

        return ( { ...m, checked: false } );
      } );
    let mSelecionado = membrosSelecionados.filter( m => m.checked ? !m.checked : true );

    setMembrosSelecionados( mSelecionado );
    setMembros( [ ...membros, ...m ] );
  }

  function handleMembro( index ) {
    let m = membros;

    if( m[ index ].checked ) {
      m[ index ].checked = !m[ index ].checked;
    }else {
      m[ index ].checked = true;
    }

    setMembros( m );
    setInternalReload( !internalReload );
  }

  function handleMembroSelecionado( index ) {
    let m = membrosSelecionados;

    if( m[ index ].checked ) {
      m[ index ].checked = !m[ index ].checked;
    }else {
      m[ index ].checked = true;
    }

    setMembrosSelecionados( m );
    setInternalReload( !internalReload );
  }

  function dbClickMembro( index ) {
    let m = membros.filter( ( m, i ) => i !== index );

    setMembrosSelecionados( [ ...membrosSelecionados, membros[ index ] ] );
    setMembros( m );
  }

  function dbClickMembroSelecionado( index ) {
    let m = membrosSelecionados.filter( ( m, i ) => i !== index );

    setMembros( [ ...membros, membrosSelecionados[ index ] ] );
    setMembrosSelecionados( m );

    if( membrosSelecionados[ index ].id === supervisor.value )
      setSupervisor( {} );
  }

  function handleLocal( index ) {
    let l = locais;

    if( l[ index ].checked ) {
      l[ index ].checked = !l[ index ].checked;
    }else {
      l[ index ].checked = true;
    }

    setLocais( l );
    setInternalReload( !internalReload );
  }

  function clearInput() {
    const m = props.membros.map( m => ( {
      id      : m.id,
      nome    : m.nome,
      checked : false
    } ) );

    setMembros( m );
    setMembrosSelecionados( [] );
    setSupervisor( {} );

    const l = props.locais
      .filter( loc => loc.flEstrato ? !loc.flEquipe : false )
      .map( loc => ( { ...loc, checked: false } ) );

    setLocais( l );
  }

  function handleSubmit( e ) {
    e.preventDefault();
    if( locaisSelecionados() == 0){
      setMessageLocais("Adicione ao menos um local");
      setTimeout(() => setMessageLocais("") , 3000);
    }else if( membrosSelecionados.length === 0 ) {
      setMessageMembro("Adicione ao menos um membro a equipe");
      setTimeout(() => setMessageMembro("") , 3000);
    } else if( !supervisor.value ) {
      setMessage("Escolha o supervisor da equipe");
      setTimeout(() => setMessage("") , 3000);
    } else {
      props.addEquipe(
        membrosSelecionados,
        {
          id: supervisor.value,
          nome: supervisor.label
        },
        locais.filter( l => l.checked )
      );

      clearInput();
      $('#modal-novo-equipe').modal('hide');
    }
  }

  function locaisSelecionados() {
    var numLocaisSelecionados = 0
    locais.forEach( l => {
      if(l.checked) numLocaisSelecionados++
    })
    return numLocaisSelecionados
  }

  return (
    <Modal
      id="modal-novo-equipe"
      title="Planejar Equipe"
      size="lg"
    >
      <form onSubmit={ handleSubmit }>
        <ModalBody>
          <Row>
            <Col>
              <FormGroup>
                <label>Locai(s) de responsabilidade da equipe <code>*</code><span className="text-danger">{ messageLocais }</span></label>
                <ListLocaly
                  locais={ locais }
                  onClick={ handleLocal }
                />
              </FormGroup>
            </Col>
          </Row>
          <Separator />
          <Row>
            <Col sm="5">
              <FormGroup>
                <label>Membro(s) <code>*</code></label>
                <ListMembros
                  membros={ membros }
                  onClick={ handleMembro }
                  onDoubleClick={ dbClickMembro }
                />
              </FormGroup>
            </Col>
            <Col sm="2">
              <Arrows>
                <IconButton
                  title="Adicionar"
                  className="text-success"
                  aria-label="cart"
                  onClick={ addMembro }
                >
                  <FaLongArrowAltRight />
                </IconButton>
                <IconButton
                  title="Remover"
                  className="text-danger"
                  aria-label="cart"
                  onClick={ removeMembro }
                >
                  <FaLongArrowAltLeft />
                </IconButton>
              </Arrows>
            </Col>
            <Col sm="5">
              <FormGroup>
                <label>
                  Supervisor <code>*</code><span className="text-danger">{ message }</span>
                </label>
                <Select
                  id="supervisor"
                  value={ supervisor }
                  styles={ selectDefault }
                  options={ optionSupervisor }
                  onChange={ e => setSupervisor( e ) }
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>
                  Selecionado(s) <code>*</code><span className="text-danger">{ messageMembro }</span>
                </label>
                <ListMembros
                  membros={ membrosSelecionados }
                  onClick={ handleMembroSelecionado }
                  onDoubleClick={ dbClickMembroSelecionado }
                />
              </FormGroup>
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
    </Modal>
  );
}

function ListMembros( props ) {
  const membros = props.membros;
  const handleMembro = props.onClick;
  const dbClickMembro = props.onDoubleClick;
  let li = [];

  if( membros ) {
    li = membros.map( (m, index) => (
      <LiEquipe
        key={ m.id }
        onClick={ () => handleMembro( index ) }
        onDoubleClick={ () => dbClickMembro( index ) }
      >
        <ContainerCheck>
          <Checkbox
            checked={ m.checked ? m.checked : false }
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </ContainerCheck>
        <DivDescription>
          <div>
            <span className="mr-2">
              { m.tipo === "quarteirao" ? `Nº ${ m.nome }` : m.nome }
            </span>
          </div>
        </DivDescription>
      </LiEquipe>
    ));
  }

  if( membros.length === 0) {
    li = [
      <LiEmpty key={ 0 }>
        <h4>Nenhum membro</h4>
      </LiEmpty>
    ]
  }

  return (
    <UlEquipe>
      { li }
    </UlEquipe>
  );
}

function ListLocaly( props ) {
  const locais = props.locais;
  const handleLocal = props.onClick;
  const dbClickLocal = props.onDoubleClick;
  let li = [];

  if( locais ) {
    li = locais.map( (l, index) => (
      <LiLocal
        key={ l.id }
        onClick={ () => handleLocal( index ) }
        onDoubleClick={ () => dbClickLocal( index ) }
      >
        <ContainerCheck>
          <Checkbox
            checked={ l.checked ? l.checked : false }
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </ContainerCheck>
        <DivDescription>
          <div>
            <span className="mr-2">
              {
                l.tipo === "quarteirao" ?
                  `Quarteirão nº ${ l.nome }` :
                l.tipo === "zona" ?
                  `Zona ${ l.nome }` :
                  `Localidade/Bairro ${ l.nome }`
              }
            </span>
          </div>
        </DivDescription>
      </LiLocal>
    ));
  }

  if( locais.length === 0) {
    li = [
      <LiEmpty key={ 0 }>
        <h4>Nenhum local disponivél para equipe</h4>
      </LiEmpty>
    ]
  }

  return (
    <UlLocal>
      { li }
    </UlLocal>
  );
}

const mapStateToProps = state => ( {
  membros : state.usuario.usuarios,
  locais  : state.atividade.locais,
  equipes : state.atividade.equipes,
  reload  : state.atividade.reload
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    addEquipe
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalEquipe );
