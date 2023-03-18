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
import { bloquearMembros } from '../../../../store/Usuario/usuarioActions'
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
  const [ estratos, setEstratos ]                       = useState( [] );
  const [ messageLocais, setMessageLocais ]             = useState( "" );

  //É acionado sempre que o modal é aberto abre
  //Limpa os dados deixados quando o modal foi fechado
  useEffect( () => {
    if(isOpen)
      clearInput()

    handleClose()
  }, [ isOpen ] );


  useEffect( () => {
    montarMembros()
  }, [ props.membros, props.reload_membros ] );

  useEffect( () => {
    setOptionSupervisor(
      membrosSelecionados.map( m => ( {
        value: m.id, label: m.nome
      } ) )
    );
  }, [ membrosSelecionados ] );

  useEffect( () => {
    montarEstratos()
  }, [ props.estratos, props.reload ] );

  function clearInput() {
    montarMembros()
    setMembrosSelecionados( [] );
    setSupervisor( {} );
    
    montarEstratos()
  }

  function montarEstratos() {
    const e = props.estratos
      .map( (est,index) => ( { ...est, checked: false, dataIndex: index } ) )
      .filter( e => !e.flEquipe )

    setEstratos( e );
  }

  function montarMembros() {
    const m = props.membros
      .map( (m,index) => ( {
        id: m.id,
        nome: m.nome,
        atuacoes: m.atuacoes,
        checked: false,
        dataIndex: index,
        flEquipe: m.flEquipe ? true : false
      } ) )
      .filter( membro => membro.atuacoes[0].tipoPerfil != 2 && !membro.flEquipe )

    setMembros( m );
  }

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

  function handleEstrato( index ) {
    let e = estratos;

    if( e[ index ].checked ) {
      e[ index ].checked = !e[ index ].checked;
    }else {
      e[ index ].checked = true;
    }

    e.forEach( (est,i) => {
      if(i != index && e[ i ].checked)
        e[ i ].checked = false
    })

    setEstratos( e );
    setInternalReload( !internalReload );
  }

  function handleSubmit( e ) {
    e.preventDefault();
    if( estratoSelecionado() == 0){
      setMessageLocais("Adicione um estrato");
      setTimeout(() => setMessageLocais("") , 3000);
    }else if( membrosSelecionados.length === 0 ) {
      setMessageMembro("Adicione ao menos um membro a equipe");
      setTimeout(() => setMessageMembro("") , 3000);
    } else if( !supervisor.value ) {
      setMessage("Escolha o supervisor da equipe");
      setTimeout(() => setMessage("") , 3000);
    } else {

      //A função abaixo bloqueia os usuarios selecionados com o objetivo de nao permitir
      //que eles sejam escolhidos para participar em outras equipes
      props.bloquearMembros(membrosSelecionados)

      props.addEquipe(
        membrosSelecionados,
        {
          id: supervisor.value,
          nome: supervisor.label
        },
        // apenas um estrato pode ser selecionado, logo o comando abaixo retorna uma
        //lista com um unico elemento
        estratos.filter( e => e.checked ) 
      );

      setMembrosSelecionados( [] );
      setSupervisor( {} );
      $('#modal-novo-equipe').modal('hide');
    }
  }

  function estratoSelecionado() {
    const e = estratos.find( e => e.checked == true)
    if(e) return 1
    return 0
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
                <label>Estrato sob responsabilidade da equipe <code>*</code><span className="text-danger">{ messageLocais }</span></label>
                <ListEstratosLivres
                  estratos={ estratos }
                  onClick={ handleEstrato }
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
                  onDoubleClick={ () => dbClickMembro }
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

function ListEstratosLivres( props ) {
  let estratos = props.estratos;
  const handleLocal = props.onClick;
  const dbClickLocal = props.onDoubleClick;
  let li = [];

  //retira os estratos que ja foram escolhidos por outras equipes
  estratos = estratos.filter( e => !e.flEquipe ? true : false)
  if( estratos ) {
    li = estratos.map( (e, index) => (
      <LiLocal
        key={ e.dataIndex }
        onClick={ () => handleLocal( index ) }
        onDoubleClick={ () => {} /*dbClickLocal( index )*/ }
      >
        <ContainerCheck>
          <Checkbox
            checked={ e.checked ? e.checked : false }
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </ContainerCheck>
        <DivDescription>
          <div>
            <span className="mr-2">
              {
                `Estrato ${ e.dataIndex + 1 }`
              }
            </span>
          </div>
        </DivDescription>
      </LiLocal>
    ));
  }

  if( estratos.length === 0) {
    li = [
      <LiEmpty key={ 0 }>
        <h4>Nenhum estrato disponivél para equipe</h4>
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
  estratos: state.atividade.estratos,
  locais  : state.atividade.locais,
  equipes : state.atividade.equipes,
  reload  : state.atividade.reload,
  reload_membros: state.usuario.reload,
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    addEquipe,
    bloquearMembros,
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalEquipe );
